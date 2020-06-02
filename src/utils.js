const path = require('path');

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

module.exports = {
    isVueFile,
    getComponentName,
    parseStrToFunc,
    convertSlash,
    resolvePaths,
    getDirectories,
    getVueFiles
};
