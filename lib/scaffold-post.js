const fs = require('fs/promises')
// get the post title
// turn that into the filename
// prompt for description or leave blank
// generate the frontmatter

// have a default location for the file (allow overwriting, relative to project root)
// make the file (if it doesn't exist) - if it does exist notify and collect new name or create with num addition?

let fileNameAction = name => `${name.replace(' ', '-').toLowerCase()}.mdx`
const supportedArguments = [
  {
    flag: 'n',
    full: 'name',
    action: fileNameAction,
  },
]

let argMap = {}

process.argv.slice(2).reduce((argMap, arg) => {
  let isFlag = arg.startsWith('-') || arg.startsWith('--')
  let finder = isFlag
    ? ({ flag }) => flag === argName
    : ({ full }) => full === argName
  let argInfo = supportedArguments.find(finder)
  argMap[argInfo.full]

  return argMap
}, {})

const processedArgs = process.argv.slice(2).map((arg, i, arr) => {
  let isFlag = arg.startsWith('-') || arg.startsWith('--')
  if (isFlag) {
    let argName = isFlag ? arg.substring(1) : arg.substring(2)
    let finder = isFlag
      ? ({ flag }) => flag === argName
      : ({ full }) => full === argName
    let argInfo = supportedArguments.find(finder)
    let value = arr[i + 1]
    return argInfo.action(value)
  }
})

const main = async () => {
  let postName = process.argv[2]

  const frontmatter = `---
title: ${postName}
description: TBD
---
    `
  await fs.writeFile(`./posts/${fileName}`, frontmatter)
}

main()
