const path = require('path');
const fs = require('fs');

const { WebCache, VersionResolveError } = require('./WebCache');

class LocalWebCache extends WebCache {
    constructor(options = {}) {
        super();

        this.path = options.path || './.wwebjs_cache/';
        this.strict = options.strict || false;
    }

    async resolve(version) {
        const filePath = path.join(this.path, `${version}.html`);

        try {
            return fs.readFileSync(filePath, 'utf-8');
        } catch (err) {
            if (this.strict) throw new VersionResolveError(`No se pudo cargar la versión ${version} desde la caché`);
            return null;
        }
    }

    async persist(indexHtml) {
        const matchResult = indexHtml.match(/manifest-([\d\\.]+)\.json/);
        const version = matchResult ? matchResult[1] : null;
        if (!version) return;

        const filePath = path.join(this.path, `${version}.html`);
        fs.mkdirSync(this.path, { recursive: true });
        fs.writeFileSync(filePath, indexHtml);
    }
}

module.exports = LocalWebCache;
