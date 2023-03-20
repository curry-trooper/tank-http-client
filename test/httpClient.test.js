const thc = require("../src/httpClient")
const path = require("path");
thc.setBaseUrl("http://localhost:3008")

test('httpClient get and header', (done) => {
    //function query == function searchParams
    thc.get("/test").query({id: 1}).header({token: "token_8899"}).header("useAuth", true).send().then((res) => {
        expect(res).toStrictEqual({code: 200, method: 'GET', data: 'get_test', search: '1',headerToken: "token_8899",useAuth:"true"})
        done()
    })

});
test('httpClient delete', (done) => {
    //function query == function searchParams
    thc.delete("/test").query({id: 1}).send().then((res) => {
        expect(res).toStrictEqual({code: 200, method: 'DELETE', data: 'delete_test', search: '1'})
        done()
    })

});
test('httpClient post', (done) => {
    thc.post("/test").query({id: 1}).data({first: "1", nickname: "wind"}).data({
        name: "tank",
        nickname: "wind body"
    }).send().then((res) => {
        expect(res).toStrictEqual({
            code: 200,
            method: 'POST',
            data: 'post_test',
            search: '1',
            params: {first: '1', nickname: 'wind body', name: 'tank'}
        })
        done()
    })
})
test('httpClient post payload', (done) => {
    thc.post("/test/payload").payload({first: "1th", nickname: "tank-man"}).data({
        name: "tank",
        nickname: "wind body"
    }).send().then((res) => {
        expect(res).toStrictEqual( {
                code: 200,
                method: 'POST',
                data: 'post_test',
                body: {
                    payload: {
                        value: '{"first":"1th","nickname":"tank-man"}',
                        content_type: 'application/json'
                    },
                    name: 'tank',
                    nickname: 'wind body'
                }
            }
        )
        done()
    })
})
test('httpClient put', (done) => {
    thc.put("/test").query({id: 1}).data({first: "1", nickname: "wind"}).data({
        name: "tank",
        nickname: "wind body"
    }).send().then((res) => {
        expect(res).toStrictEqual({
            code: 200,
            method: 'PUT',
            data: 'put_test',
            search: '1',
            params: {first: '1', nickname: 'wind body', name: 'tank'}
        })
        done()
    })
})
test('httpClient patch', (done) => {
    thc.patch("/test").query({id: 1}).data({first: "1", nickname: "wind"}).data({
        name: "tank",
        nickname: "wind body"
    }).send().then((res) => {
        expect(res).toStrictEqual({
            code: 200,
            method: 'PATCH',
            data: 'patch_test',
            search: '1',
            params: {first: '1', nickname: 'wind body', name: 'tank'}
        })
        done()
    })
})
test('httpClient upload', (done) => {
    thc.post("/upload").query({id: 1})
        .file({
            file1: path.join(__dirname, "tank.png"),
            file2: path.join(__dirname, "tank.png")
        })
        .send()
        .then((res) => {
            expect(Object.keys(res.files).length).toBe(2)
            done()
        })
})
test('httpClient uploadBuffer', (done) => {
    thc.post("/upload").query({id: 1})
        .bufferFile({
            file1: path.join(__dirname, "tank.png"),
            file2: path.join(__dirname, "tank.png")
        })
        .send()
        .then((res) => {
            expect(Object.keys(res.files).length).toBe(2)
            done()
        })
})
