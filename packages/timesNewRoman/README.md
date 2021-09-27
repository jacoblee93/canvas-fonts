@canvas-fonts/times-new-roman
====

Times New Roman package for [canvas](https://npmjs.org/package/canvas)

## Usage

```js
const { registerFont, createCanvas } = require('canvas');
registerFont(require("@canvas-fonts/times-new-roman"), { family: "Times New Roman" });
const canvas = createCanvas(400, 48);
const ctx = canvas.getContext('2d');
ctx.font = `24px "Times New Roman"`;
ctx.fillText("Times New Roman", 5, 30);
const png = canvas.toBuffer();
```

Will create this image:

![preview](https://github.com/retrohacker/canvas-fonts/raw/master/previews/timesNewRoman.png)

## Creating your own Fonts

This font is part of the canvas-fonts collection. To use your own fonts, simply:

1. Create a new [npm package](https://docs.npmjs.com/creating-node-js-modules)
2. Add your font file to the same directory as the `package.json` created in step 1.
3. Add the following `index.js` file in that same directory:

```js
// Replace "MyAwesomeFont.ttf" with the filename of your font!
module.exports = require('path').join(__dirname, "MyAwesomeFont.ttf")
```

4. Publish to npm!