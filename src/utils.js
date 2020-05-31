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

module.exports = {
    isVueFile,
    getComponentName,
    parseStrToFunc
};
