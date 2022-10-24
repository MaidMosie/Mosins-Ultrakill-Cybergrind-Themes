const client = require('@actions/artifact').create()
const fs = require('fs')
const glob = require('glob')
async function run() {
    const files = fs.readdirSync('./', { withFileTypes: true })
    const directories = files.filter(dirent => dirent.isDirectory() && !(dirent.name.startsWith('.')) && dirent.name != "node_modules").map(dirent => dirent.name)
    for (const directory of directories) { 
        const files = glob.sync(`${directory}/**/*`, { nodir: true })
        await client.uploadArtifact(directory, files, './') 
    }
}
run()