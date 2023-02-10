const readline = require('readline')
const fs = require('fs')
const path = require('path')

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const getComponentName = () => {
  return new Promise((resolve) =>
    readlineInterface.question('Enter the component name: ', (name) => {
      readlineInterface.close()
      resolve(name)
    })
  )
}

const getFileNames = (componentName) => [
  `${componentName}.tsx`,
  `${componentName}.children.tsx`,
  `${componentName}.types.ts`,
  `${componentName}.stories.tsx`
]

const createFileStructure = (componentName, fileNames) => {
  console.log(`\nCreating the file structure for ${componentName} component...\n`)

  const componentPath = path.resolve('src', 'components', componentName)

  fs.mkdir(componentPath, (err) => {
    if (!err) {
      return
    }
    console.error('Error occurred while creating component directory:', err)
  })

  for (const fileName of fileNames) {
    const filePath = path.resolve(componentPath, fileName)
    fs.writeFile(filePath, '', (err) => {
      if (!err) {
        return
      }
      console.log(`Error occurred while creating component file ${fileName}: `, err)
    })
    console.log(`File ${fileName} has been created.`)
  }

  console.log(
    `\nThe component structure for ${componentName} has been created successfully and is located at ${componentPath}.`
  )
}

const init = async () => {
  const componentName = await getComponentName()
  const fileNames = getFileNames(componentName)

  createFileStructure(componentName, fileNames)
}

init()
