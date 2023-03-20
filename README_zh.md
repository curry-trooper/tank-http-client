* [English](README.md) | 中文

## tank-http-client

* [x] tank-http-client.js 是一个基于 needle.js的 http 客户端
* [x] 只支持node环境，浏览器不可运行
* [x] 支持链式调用
* [x] [单元测试](./test/httpClient.test.js)

![img.png](img.png)

* [x] 文档

## 安装

```shell
npm install tank-http-client.js
```

## 导入

```javascript
//导入
const thc = require("tank-http-client.js")
```

## 基本示例

```javascript

//设置基础URL地址 
thc.setBaseUrl("http://localhost:3008")
//get 请求 链式调用
thc.get("/test")
    .query({id: 1})
    .send()
    .then((res) => {
        console.log(res)
    }).catch(err => {
    console.error(err)
});
//输出 ->{code: 200, method: 'GET', data: 'get_test', search: '1'}
//await  链式调用
async () => {
    const res = await thc.get("/test")
        .query({id: 1})
        .send()
    console.log(res)
}
//输出 ->{code: 200, method: 'GET', data: 'get_test', search: '1'}
```

## 更多示例

### 设置 header

```javascript

//use header
thc.get("/test").query({id: 1}).header({token: "token_8899"}).header("useAuth", true).send().then((res) => {
    //res:{code: 200, method: 'GET', data: 'get_test', search: '1',headerToken: "token_8899",useAuth:"true"}
})

//expressjs 
app.get('/test', function (req, res) {
    res.json({
        code: 200,
        method: req.method,
        data: "get_test",
        search: req.query["id"],
        headerToken: req.header("token"),
        useAuth: req.header("useAuth")
    })
})
```

### delete

```javascript
//delete
thc.delete("/test").query({id: 1}).send().then((res) => {
    //res: {code: 200, method: 'DELETE', data: 'delete_test', search: '1'}
})
```

### post，put，patch

```javascript
//post support put patch 
// thc.put("/test").xxx.send()
// thc.patch("/test").xxx.send()
thc.post("/test")
    .query({id: 1}).data({first: "1", nickname: "wind"}).data({
    name: "tank",
    nickname: "wind body"
}).send().then((res) => {
    // res:{
    //     code: 200,
    //     method: 'POST',
    //     data: 'post_test',
    //     search: '1',
    //     params: {first: '1', nickname: 'wind body', name: 'tank'}
    // }
})
```

### 文件上传

```javascript
//upload
thc.post("/upload").query({id: 1})
    .file({
        file1: path.join(__dirname, "tank.png"),
        file2: path.join(__dirname, "tank.png")
    })
    .send()
    .then((res) => {

    })

//upload by buffer
thc.post("/upload").query({id: 1})
    .bufferFile({
        file1: path.join(__dirname, "tank.png"),
        file2: path.join(__dirname, "tank.png")
    })
    .send()
    .then((res) => {

    })

```

## apis

### HttpClient

```typescript
declare class HttpClient {
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
```

### Builder

```typescript
declare class Builder {
  constructor(method: any, url: any, options: any);

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
```
