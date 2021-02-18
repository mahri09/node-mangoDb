const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3003;

// app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true })) //urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object

app.set('public engine', 'html')


app.get('/', (req, res)=> {
  res.send('index') //or render()
})

app.post('/', function (req, res) {
  res.send('index')
  console.log(req.body)

})


app.listen(port, () => console.log(`Example app listening on ${port} port!`))