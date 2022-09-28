const fs = require('fs-extra')
const path = require('path')
const { zip } = require('zip-a-folder')

const templateName = process.argv[2]

;(async () => {
  try {
    if (templateName) {
      await zipTemplate(templateName)
    } else {
      await zipAllTemplates()
    }

    console.log('done!')
  } catch (e) {
    console.error(e)
  }
})()

async function zipAllTemplates() {
  console.log('zip all components...')

  const componentList = await fs.readdir(resolvePath('./src'))

  console.log(` found ${ componentList.length } components: [${ componentList.join(', ') }]`)

  for (const componentName of componentList) {
    await zipTemplate(componentName)
  }

  console.log('zipped all components!')
}

async function zipTemplate(name) {
  const startDate = Date.now()

  console.log(`\n---- start zipping a component with name=${ name }...`)

  const sourceDir = resolvePath(`./src/${ name }`)
  const targetDir = resolvePath(`./dist/${ name }`)
  const targetFile = resolvePath(`./dist/${ name }/template.zip`)

  await fs.ensureDir(targetDir)

  console.log(`   |- remove old template.zip file in the directory: [${ relativePath(targetDir) }]`)

  if (await fs.exists(targetFile)) {
    await fs.remove(targetFile)
  }

  await zip(sourceDir, targetFile);

  console.log(`   |- zipped a component with name=${ name } in ${ Date.now() - startDate } milliseconds\n`)
}

function resolvePath(p) {
  return path.resolve(__dirname, p)
}

function relativePath(p) {
  return path.relative(__dirname, p)
}
