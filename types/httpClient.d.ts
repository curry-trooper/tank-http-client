declare const _exports: HttpClient;
export = _exports;
declare class HttpClient {
    /**
     *
     * @type {{baseUrl: string}}
     * @private
     */
    private _options;
    /**
     *
     * @param method
     * @param url
     * @return {Builder}
     * @private
     */
    private _createBuilder;
    /**
     *
     * @param url
     */
    setBaseUrl(url: any): void;
    /**
     *
     * @param url
     * @return {Builder}
     */
    post(url: any): Builder;
    /**
     *
     * @param url
     * @return {Builder}
     */
    get(url: any): Builder;
    /**
     *
     * @param url
     * @return {Builder}
     */
    delete(url: any): Builder;
    /**
     *
     * @param url
     * @return {Builder}
     */
    patch(url: any): Builder;
    /**
     *
     * @param url
     * @return {Builder}
     */
    put(url: any): Builder;
}
import Builder = require("./Builder");
