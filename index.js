const fs = require('fs')
const canvas = require('canvas')
const path = require('path')
const dot = require('dot')
const { registerFont, createCanvas } = require('canvas')

const camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

const FontDir = path.join(__dirname, 'fonts')
const fonts = fs.readdirSync(FontDir)
const templates = fs.readdirSync('./template').map(v => {
	const filename = v
	const filePath = path.join('template', v)
	const compiled = dot.template(fs.readFileSync(filePath).toString(), {
		...dot.templateSettings,
		strip: false
	})
	return {
		filename, compiled
	}
})

for(let FontFile of fonts) {
	console.log(`=> Processing ${FontFile}`)
	const FontFamily = path.parse(FontFile).name
	const ShortPackageName = camelize(FontFamily)
	const PackageName = `@canvas-fonts/${ShortPackageName}`
	const URLName = encodeURI(ShortPackageName)
	const FontPreview = `https://github.com/retrohacker/canvas-fonts/raw/master/previews/${URLName}.png`
	const fontDefinition = { FontFile, FontFamily, ShortPackageName, PackageName, FontPreview }
	const PackageDir = path.join(__dirname, 'packages', ShortPackageName)
	fs.mkdirSync(PackageDir, { recursive: true })
	fs.copyFileSync(
		path.join(FontDir, FontFile),
		path.join(PackageDir, FontFile)
	)
	for (let Template of templates) {
		fs.writeFileSync(
			path.join(PackageDir, Template.filename),
			Template.compiled(fontDefinition)
		)
	}
	const PreviewDir = path.join(__dirname, 'previews')
	registerFont(path.join(__dirname, 'fonts', FontFile), { family: FontFamily })
	const canvas = createCanvas(400, 48)
	const ctx = canvas.getContext('2d')
	ctx.font = `24px "${FontFamily}"`
	ctx.fillText(FontFamily, 5, 30)
	fs.mkdirSync(PreviewDir, { recursive: true })
	fs.writeFileSync(path.join(PreviewDir, `${URLName}.png`), canvas.toBuffer())
}