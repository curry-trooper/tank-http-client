const express = require('express')

const app = express()
app.use(express.json())
app.listen(3008)
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.json({code:200,method:res.method,data:"get_test",search:req.query["id"]})
})
app.post('/', function (req, res) {
    res.json({code:200,method:res.method,data:"post_test",search:req.query["id"],params:req.body})
})
app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})
app.get('/', function (req, res) {
    res.send('root')
})
app.get('/about', function (req, res) {
    res.send('about')
})

