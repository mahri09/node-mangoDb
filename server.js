const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const { query } = require('express');

const app = express()
const port = 3003;
const connect = 'mongodb+srv://*****:******@cluster0.xn0wt.mongodb.net/myquotes?retryWrites=true&w=majority'

app.use(bodyParser.json())  //middleware to accept JSON data
app.use(express.static('public'))  //tell Express to make this public folder accessible 
// app.set('public engine', 'html')
app.set('views engine', 'index.pug')

//connect to MongoDB through the MongoClient's connect 
MongoClient.connect(connect, { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database!!!')
  const db = client.db('myquotes')
	const quotesCollection = db.collection('quotes') 
  app.use(bodyParser.urlencoded({ extended: true })) //urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object
  
  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray()
    .then(results => {
      res.render("index.pug", {quotes:results});
      //console.log(results)
      //res.writeHead(200)
      //res.sendFile(__dirname + '/index.html')
    })
    .catch(error => console.error(error))
  })
  
  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })

  app.put('/quotes', (req, res)=>{
    // console.log(req.body)
    quotesCollection.findOneAndUpdate(
      { name: 'mahri', quote:'Winner gets ice cream!' },		// shu buldugunu maindekiyle degishtiriyor
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        }
      },
      {
        upsert: true
      }
    )
    .then(result => {
      res.json('Success')
     })
      .catch(error => console.log(error))

  })

  app.delete('/quotes', (req, res) => {
    quotesCollection.deleteOne({ name: 'mahri' }) //shurda yazdigimizi bulup silecek bosh birakirsak en sondan bashlayarak siliyor
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('No quote to delete')
        }
        res.json(`Deleted Darth Vadar's quote`)
      })
      .catch(error => console.error(error))
  })


  
  app.listen(port, () => console.log(`Example app listening on ${port} port!`))
})
.catch(error => console.error(error))



