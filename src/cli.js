const start = Date.now();

const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const chalk = require('chalk');
const Fdir = require('fdir');

const { resolvePaths, getDirectories, getVueFiles } = require('./utils.js');

const { compileToHTML } = require('./compile-to-html.js');

function showHelp() {
    console.log(`
Usage: vue2html [command] [path] [--options]
Commands:
  vue2html [path]                Convert vue component to html by default.
  vue2html component [path]      Convert vue component to js component.
Options:
  --help, -h                 [boolean] show help
  --version, -v              [boolean] show version
  --config, -c               [string]  use specified config file
  --base                     [string]  public base path (default: /)
  --outDir=[name]            [string]  output directory (default: html_components)
`);
}

console.log(chalk.cyan(`vue2html v${require('../package.json').version}`));
(async () => {
    const { _: components, help, h, version, v, outDir } = argv;

    if (help || h) {
        showHelp();
        return;
    } else if (version || v) {
        return;
    }

    // Get all vue file paths
    const paths = getVueFiles(components);
    // Get all directory paths
    const dirs = getDirectories(components);

    if (dirs.length > 1) {
        dirs.forEach(dir => {
            // Create the builder
            const api = new Fdir()
                .glob('./**/*.vue')
                .withBasePath()
                .crawl(path.join(dir));

            // Get all files in a directory synchronously
            const files = api.sync();

            paths.push(...resolvePaths(files));
        });
    }

    // Start spinner
    await compileToHTML(paths.length === 1 ? paths[0] : paths, {
        writeToFile: true,
        outDir,
        silent: false
    });

    console.log(`Finished compiled in ${(Date.now() - start) / 1000}ms.`);
})();
