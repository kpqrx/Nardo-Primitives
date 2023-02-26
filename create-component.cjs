const readline = require('readline')
const fs = require('fs')
const path = require('path')
const prettier = require('prettier')

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const getComponentName = () => {
  return new Promise((resolve) =>
    readlineInterface.question('Enter the component name: ', (name) => {
      readlineInterface.close()
      resolve(name)
    })
  )
}

const getFileTemplates = (componentName) => [
  {
    fileName: `${componentName}.tsx`,
    template: `
      import React from 'react'
      import { ${componentName}Props } from './${componentName}.types'
      
      function ${componentName}(props: ${componentName}Props) {
        const { children, ...restProps } = props
      
        return <div {...restProps}>{children}</div>
      }
      
      const ${componentName}Namespace = Object.assign(${componentName}, {})
      
      export default ${componentName}Namespace  
    `,
  },
  {
    fileName: `${componentName}.children.tsx`,
    template: `
      import React from 'react'
    `,
  },
  {
    fileName: `${componentName}.types.ts`,
    template: `
      export interface ${componentName}Props extends React.PropsWithChildren {}
    `,
  },
  {
    fileName: `${componentName}.stories.tsx`,
    template: `
      import React from 'react'
      import type { Meta, StoryFn } from '@storybook/react'

      import ${componentName} from './${componentName}'

      const meta: Meta<typeof ${componentName}> = {
        title: '${componentName}',
        component: ${componentName},
      }

      export default meta

      export const Default: StoryFn = () => {
        return <${componentName}>${componentName}</${componentName}>
      }
    `,
  },
]

const createFileStructure = (componentName, fileTemplates) => {
  console.log(
    `\nCreating the file structure for ${componentName} component...\n`
  )

  const componentPath = path.resolve('src', 'components', componentName)

  fs.mkdir(componentPath, (err) => {
    if (!err) {
      return
    }
    console.error('Error occurred while creating component directory:', err)
  })

  for (const { fileName, template } of fileTemplates) {
    const filePath = path.resolve(componentPath, fileName)
    fs.writeFile(filePath, prettier.format(template), (err) => {
      if (!err) {
        return
      }
      console.log(
        `Error occurred while creating component file ${fileName}: `,
        err
      )
    })
    console.log(`File ${fileName} has been created.`)
  }

  console.log(
    `\nThe component structure for ${componentName} has been created successfully and is located at ${componentPath}.`
  )
}

const init = async () => {
  const componentName = await getComponentName()
  const fileTemplates = getFileTemplates(componentName)

  createFileStructure(componentName, fileTemplates)
}

init()
