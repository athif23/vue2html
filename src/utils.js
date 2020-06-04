const path = require('path');
const fs = require('fs-extra');

function isVueFile(path = '') {
    const re = /(.vue)+/;
    return re.test(path);
}

function getComponentName(path) {
    const re = /(\w+)(.vue+)/;
    return re.exec(path)[1];
}

function parseStrToFunc(code) {
    /* eslint-disable no-new-func */
    return new Function(code);
    /* eslint-enable no-new-func */
}

function convertSlash(path) {
    const isExtendedLengthPath = /^\\\\\?\\/.test(path);
    const hasNonAscii = /[^\u0000-\u0080]+/.test(path); // eslint-disable-line no-control-regex

    if (isExtendedLengthPath || hasNonAscii) {
        return path;
    }

    return path.replace(/\\/g, '/');
}

function getVueFiles(paths) {
    paths = paths.filter(p => {
        return path.extname(p) === '.vue';
    });
    return resolvePaths(paths);
}

function getDirectories(paths) {
    const dirs = [];
    paths.forEach(p => {
        if (path.extname(p) !== '.vue') {
            dirs.push(p);
        }
    });
    return resolvePaths(dirs);
}

function resolvePaths(paths) {
    paths = paths.map(p => {
        if (p[0] === '\\' || p[0] === '/') {
            p = p.slice(1);
        }

        return convertSlash(path.join(p));
    });
    return paths;
}

function isStringAndEmpty(val) {
    return typeof val === 'string' && val === '';
}

function normalizeBoolean(bool = '') {
    const b = bool.toLowerCase ? bool.toLowerCase() : bool;
    switch (b) {
        case 'true':
            return true;
        case 'false':
            return false;
        case true:
        case false:
            return b;
        default:
            return b;
    }
}

async function copyFirstComponent(components = []) {
    if (components.length === 0) {
        return components;
    }

    const firstC = components.shift();

    const firstCDir = path.dirname(firstC.resolvePath);
    const copyPath = path.join(firstCDir, '__copy__' + firstC.name + '.vue');
    await fs.copyFile(firstC.resolvePath, copyPath, err => {
        if (err) {
            throw err;
        }
    });

    firstC.path = convertSlash(
        path.join(path.dirname(firstC.path), '__copy__' + firstC.name + '.vue')
    );
    firstC.resolvePath = copyPath;

    components.unshift(firstC);

    return [components, convertSlash(copyPath)];
}

export {
    isVueFile,
    getComponentName,
    parseStrToFunc,
    convertSlash,
    resolvePaths,
    getDirectories,
    getVueFiles,
    isStringAndEmpty,
    normalizeBoolean,
    copyFirstComponent
};
