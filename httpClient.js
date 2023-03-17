const Builder = require("./Builder")

class HttpClient {
    _createBuilder(method,url) {
        return new Builder(method)
    }

    post(url) {
        return this._createBuilder("post",url)
    }

    get(url) {
        return this._createBuilder("get",url)
    }

    delete(url) {
        return this._createBuilder("delete",url)
    }

    fetch(url) {
        return this._createBuilder("fetch",url)
    }

    put(url) {
        return this._createBuilder("put",url)
    }

}

module.exports = new HttpClient()
