const needle = require('needle');
const {URL} = require("node:url")
const fs = require("fs");
const path = require("path");
const mineTypes = require("mime-types");

class Builder {
    _base_options = {baseUrl: ""}
    _method = "get"
    _url = ""
    _data = {}
    _options = {
        multipart: false,
        json: true,
        compressed: true,
        follow_max: 5,
        rejectUnauthorized: false,
        headers: {},
        parse: true
    }
    _headers = {}

    constructor(method, url, options) {
        this._method = method
        this._base_options = Object.assign(this._base_options, options)
        this._url = new URL(this._url, this._base_options.baseUrl)
    }

    /**
     * @param data
     * @return {Builder}
     */
    searchParams(data) {
        Object.keys(data).forEach(key => {
            this._url.searchParams.set(key, data[key])
        })
        return this
    }

    /**
     * set params
     * @param data {{string:*}}
     * @return {Builder}
     */
    data(data) {
        this._data = Object.assign(this._data, data)
        return this
    }

    /**
     * set request to application/json
     * @param enable
     * @return {Builder}
     */
    applicationJson(enable = true) {
        this._options.json = enable
        return this
    }

    /**
     * payload
     * @param data {{}}
     * @return {Builder}
     */
    payload(data) {
        this._data.payload = {
            value: JSON.stringify(data),
            content_type: 'application/json'
        }
        return this
    }

    /**
     * upload file
     * @param filename
     * @return {Builder}
     */
    file(filename) {
        if (!fs.existsSync(filename)) {
            throw new Error("not found file by :" + filename)
        }
        this.setMultipart()
        this._data = Object.assign(...this._data, ...{
            filename: filename,
            content_type: mineTypes.lookup(filename)
        })
        return this
    }

    /**
     * upload buffer file
     * @param filename
     * @return {Builder}
     */
    bufferFile(filename) {
        if (!fs.existsSync(filename)) {
            throw new Error("not found file by :" + filename)
        }
        this.setMultipart()

        this._data = Object.assign(this._data, {
            buffer: fs.readFileSync(filename),
            filename: path.parse(filename).name,
            content_type: mineTypes.lookup(filename)
        })
        return this
    }

    /**
     * set header |headers
     * @param key {string|{}}
     * @param value? {string}
     */
    header(key, value) {
        if (this._isJSON(key)) {
            Object.keys(key).forEach(k => {
                this._headers[k] = key[value]
            })

        } else {
            this._headers[key] = value
        }
        return this
    }

    _isJSON(obj) {
        if (typeof obj == 'object' && obj) {
            return true;
        } else {
            return false;
        }
    }

    /**
     *
     * @return { Promise<T>}
     */
    async send() {
        try {
            const res = await needle(this._method, this._url.toString(), this._data, Object.assign({headers: this._headers}, this._options));
            return new Promise((resolve, reject) => {
                resolve(res.body)
            })
        } catch (err) {
            return new Promise((resolve, reject) => {
                reject(err)
            })
        }

    }


    /**
     *
     * @example
     * const { HttpsProxyAgent } = require('hpagent');
     * setAgent(new HttpsProxyAgent({
     *     keepAlive: true,
     *     keepAliveMsecs: 1000,
     *     maxSockets: 256,
     *     maxFreeSockets: 256,
     *     scheduling: 'lifo',
     *     proxy: 'https://localhost:8080'
     *   }))
     * @param agent {Agent|*}
     */
    setAgent(agent) {
        this._options.agent = agent
        return this
    }

    /**
     * @param timeout {number} ms
     */
    setOpenTimeout(timeout) {
        this._options.open_timeout = timeout
        return this
    }

    /**
     * @param timeout {number} ms
     */
    setReadTimeout(timeout) {
        this._options.read_timeout = timeout
        return this
    }

    /**
     * @param timeout {number} ms
     */
    setResponseTimeout(timeout) {
        this._options.response_timeout = timeout
        return this
    }

    setCompressed(enable = true) {
        this._options.compressed = enable
        return this
    }

    setFollowMax(max = 5) {
        this._options.follow_max = max
        return this
    }

    setVerifySSLCertificate(enable = false) {
        this._options.rejectUnauthorized = enable
        return this
    }

    setMultipart(enable = true) {
        this._options.multipart = enable
        return this
    }

    /**
     *
     * @example setProxy('http://user:pass@proxy.server.com:3128')
     * @param proxy
     * @return {Builder}
     */
    setProxy(proxy = '') {
        this._options.proxy = proxy
        return this
    }

    /**
     *
     * @param type {string:'auto'|'basic'|'digest'}
     * @return {Builder}
     */
    setAuth(type = 'basic') {
        this._options.auth = type
        return this
    }

    /**
     *   Content-Length len
     * @param len
     * @return {Builder}
     */
    setStreamLength(len = 0) {
        this._options.stream_length = len
        return this
    }

    /**
     * @param localAddress {string}
     * @return {Builder}
     */
    setLocalAddress(localAddress) {
        this._options.localAddress = localAddress
        return this
    }

    /**
     * @param uri_modifier
     */
    setUriModifier(uri_modifier = null) {
        this._options.uri_modifier = uri_modifier
    }

    /**
     *
     * @param enable {boolean}
     * @return {Builder}
     */
    responseDecodeUTF8(enable = true) {
        this._options.decode_response = enable
        return this
    }

    /**
     * auto parse to xml/json default enable
     * @param enable
     * @return {Builder}
     */
    responseAutoParse(enable = true) {
        this._options.parse_response = enable
        return this
    }

    /**
     * response write to file at after parse and  decode
     * @param filepath {string}
     * @return {Builder}
     */
    responseOutput(filepath) {
        this._options.output = filepath
        return this
    }

    /**
     *
     * @param options {{pfx?:string,key?:string,passphrase?:string,cert?:string,ca?:[],ciphers?:string,rejectUnauthorized?:boolean,secureProtocol?:string,family?:string}}
     * @return {Builder}
     */
    setHttpsOptions(options = {}) {
        Object.assign(this._options, options)
        return this
    }
}

module.exports = Builder
