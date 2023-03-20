const express = require('express')

const formidable = require('formidable');
const app = express()
app.use(express.json())

app.listen(3008)
// respond with "hello world" when a GET request is made to the homepage
app.get('/test', function (req, res) {
    res.json({code: 200, method: req.method, data: "get_test", search: req.query["id"],headerToken:req.header("token"),useAuth:req.header("useAuth")})
})
app.post('/test', function (req, res) {
    res.json({code: 200, method: req.method, data: "post_test", search: req.query["id"], params: req.body})
})


app.put('/test', function (req, res) {
    res.json({code: 200, method: req.method, data: "put_test", search: req.query["id"], params: req.body})
})
app.patch('/test', function (req, res) {
    res.json({code: 200, method: req.method, data: "patch_test", search: req.query["id"], params: req.body})
})


app.delete('/test', function (req, res) {
    res.json({code: 200, method: req.method, data: "delete_test", search: req.query["id"]})
})
app.post('/upload', function (req, res,next) {
    const form = formidable({multiples: true});

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        res.json({fields, files});
    });
})
app.post('/test/payload', function (req, res) {
    res.json({code: 200, method: req.method, data: "post_test",body:req.body})
})
