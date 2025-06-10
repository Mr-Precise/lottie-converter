import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const lottieJsonPath = process.argv[2];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('about:blank');
    await page.addScriptTag({
        path: path.resolve('node_modules', 'lottie-web', 'build', 'player', 'lottie.min.js')
    });

    const lottieData = JSON.parse(fs.readFileSync(lottieJsonPath, 'utf8'));

    await page.evaluate(async (animationData) => {
        window.animationData = animationData;
    }, lottieData);

    await page.evaluate(async () => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        window.anim = lottie.loadAnimation({
            container,
            renderer: 'canvas',
            loop: false,
            autoplay: false,
            animationData: window.animationData
        });

        await new Promise(resolve => window.anim.addEventListener('DOMLoaded', resolve));
    });

    // -1 frame / needs to be fix
    const totalFrames = await page.evaluate(() => Math.floor(window.anim.getDuration(true)) -1);

    for (let i = 0; i <= totalFrames; i++) {
        await page.evaluate((frame) => {
            window.anim.goToAndStop(frame, true);
        }, i);

        const dataUrl = await page.evaluate(() => {
            const canvas = document.querySelector('canvas');
            return canvas.toDataURL('image/png');
        });

        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
        const fileName = path.join("frames", `frame_${String(i).padStart(4, '0')}.png`);
        fs.writeFileSync(fileName, Buffer.from(base64Data, 'base64'));
        console.log(`Saved ${fileName}`);
    }

    await browser.close();
})();
