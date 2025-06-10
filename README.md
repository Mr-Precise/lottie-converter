# Lottie Renderer & Converter

This is a tool to converts .tgs (Telegram sticker) / [lottie](https://airbnb.io/lottie/#/) JSON animations into webp / apng / webm / gif with transparency using Node.js and Puppeteer.

---

## Setup Instructions

### 1. Clone repo and enter the folder

```bash
git clone https://github.com/Mr-Precise/lottie-converter
cd lottie-converter
```
Or download zip
```bash
wget https://github.com/Mr-Precise/lottie-converter/archive/refs/heads/main.zip
unzip main.zip
cd lottie-converter
```

### 2. Install Dependencies
Install webp and ffmpeg  
if on Ubuntu / Debian: `sudo apt install webp ffmpeg`  
Make sure [Node.js](https://nodejs.org/) is installed (v18+ recommended).  
Then run:

```bash
npm i
```
This will install dependencies.

---

## Render a Lottie File

### 3. Prepare Your Lottie JSON Files

Place your `AnimatedSticker.tgs` animation and convert to lottie `.json`  
Run:
```bash
npm run prepare
```
Or place your ready `.json` animation file, for example `AnimatedSticker.lottie.json`

### 4. Run the Renderer

```bash
npm run render AnimatedSticker.lottie.json
```
This renders all frames to .png with transparency in the `frames/` directory

### 5 Convert rendered images and create animation

```bash
npm run gif
npm run apng
npm run webp
npm run webm
npm run mp4
```
The result will be in the `output/` directory.

---
