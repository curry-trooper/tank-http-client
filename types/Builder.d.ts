/// <reference types="node" />
export = Builder;
declare class Builder {
    constructor(method: any, url: any, options: any);
    _base_options: {
        baseUrl: string;
    };
    _method: string;
    _url: URL;
    _data: {};
    _options: {
        multipart: boolean;
        json: boolean;
        compressed: boolean;
        follow_max: number;
        rejectUnauthorized: boolean;
        headers: {};
        parse: boolean;
    };
    _headers: {};
    /**
     * @param queryData {{}}
     * @return {Builder}
     */
    searchParams(queryData: {}): Builder;
    /**
     *
     * @param queryData {{}}
     * @return {Builder}
     */
    query(queryData: {}): Builder;
    /**
     * set params
     * @param data {{string:*}}
     * @return {Builder}
     */
    data(data: {
        string: any;
    }): Builder;
    /**
     * set request to application/json
     * @param enable
     * @return {Builder}
     */
    applicationJson(enable?: boolean): Builder;
    /**
     * payload
     * @param data {{}}
     * @return {Builder}
     */
    payload(data: {}): Builder;
    /**
     * upload file/files
     * @param key {string|{}}
     * @param filename? {string}
     * @return {Builder}
     */
    file(key: string | {}, filename?: string): Builder;
    /**
     * upload buffer file
     * @param key {string|{}}
     * @param filename? {string}
     * @return {Builder}
     */
    bufferFile(key: string | {}, filename?: string): Builder;
    /**
     * set header |headers
     * @param key {string|{}}
     * @param value? {string}
     */
    header(key: string | {}, value: any): Builder;
    _isJSON(obj: any): boolean;
    /**
     *
     * @return { Promise<*>}
     */
    send(): Promise<any>;
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
     * @param agent {*}
     */
    setAgent(agent: any): Builder;
    /**
     * @param timeout {number} ms
     */
    setOpenTimeout(timeout: number): Builder;
    /**
     * @param timeout {number} ms
     */
    setReadTimeout(timeout: number): Builder;
    /**
     * @param timeout {number} ms
     */
    setResponseTimeout(timeout: number): Builder;
    setCompressed(enable?: boolean): Builder;
    setFollowMax(max?: number): Builder;
    setVerifySSLCertificate(enable?: boolean): Builder;
    setMultipart(enable?: boolean): Builder;
    /**
     *
     * @example setProxy('http://user:pass@proxy.server.com:3128')
     * @param proxy
     * @return {Builder}
     */
    setProxy(proxy?: string): Builder;
    /**
     *
     * @param type {'auto'|'basic'|'digest'}
     * @return {Builder}
     */
    setAuth(type?: 'auto' | 'basic' | 'digest'): Builder;
    /**
     *   Content-Length len
     * @param len
     * @return {Builder}
     */
    setStreamLength(len?: number): Builder;
    /**
     * @param localAddress {string}
     * @return {Builder}
     */
    setLocalAddress(localAddress: string): Builder;
    /**
     * @param uri_modifier
     */
    setUriModifier(uri_modifier?: any): void;
    /**
     *
     * @param enable {boolean}
     * @return {Builder}
     */
    responseDecodeUTF8(enable?: boolean): Builder;
    /**
     * auto parse to xml/json default enable
     * @param enable
     * @return {Builder}
     */
    responseAutoParse(enable?: boolean): Builder;
    /**
     * response write to file at after parse and  decode
     * @param filepath {string}
     * @return {Builder}
     */
    responseOutput(filepath: string): Builder;
    /**
     *
     * @param options {{pfx?:string,key?:string,passphrase?:string,cert?:string,ca?:[],ciphers?:string,rejectUnauthorized?:boolean,secureProtocol?:string,family?:string}}
     * @return {Builder}
     */
    setHttpsOptions(options?: {
        pfx?: string;
        key?: string;
        passphrase?: string;
        cert?: string;
        ca?: [];
        ciphers?: string;
        rejectUnauthorized?: boolean;
        secureProtocol?: string;
        family?: string;
    }): Builder;
}
import { URL } from "url";
