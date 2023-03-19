const Builder = require("./Builder")

class HttpClient {
    /**
     *
     * @type {{baseUrl: string}}
     * @private
     */
    _options = {
        baseUrl: ""
    }

    /**
     *
     * @param method
     * @param url
     * @return {Builder}
     * @private
     */
    _createBuilder(method, url) {
        return new Builder(method, url, this._options)
    }

    /**
     *
     * @param url
     */
    setBaseUrl(url) {
        this._options.baseUrl = url
    }

    /**
     *
     * @param url
     * @return {Builder}
     */
    post(url) {
        return this._createBuilder("post", url)
    }

    /**
     *
     * @param url
     * @return {Builder}
     */
    get(url) {
        return this._createBuilder("get", url)
    }

    /**
     *
     * @param url
     * @return {Builder}
     */
    delete(url) {
        return this._createBuilder("delete", url)
    }

    /**
     *
     * @param url
     * @return {Builder}
     */
    patch(url) {
        return this._createBuilder("patch", url)
    }

    /**
     *
     * @param url
     * @return {Builder}
     */
    put(url) {
        return this._createBuilder("put", url)
    }

}

module.exports = new HttpClient()
