const thc = require("../src/httpClient")
thc.setBaseUrl("http://localhost:3008")

test('httpClient get', (done) => {
    thc.get("/").searchParams({id: "test_query"}).send().then((res) => {
        console.log(res)
        done()
    })
});
test('httpClient post', (done) => {
    thc.post("/").searchParams({id: "test_query"}).data({first: "1", nickname: "wind"}).data({
        name: "tank",
        nickname: "wind body"
    }).send().then((res) => {
        console.log(res)
        done()
    })
})
