import express from 'express'

import config from './config'

let _server

const server = {
  start () {
    const app = express()

    const bodyParser = require('body-parser')

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

    config(app)
    var mysql = require('mysql');
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "pruebasnode"
    });
    con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
    // Rutas
    app.get('/', (req, res, next) => {

      
      
   
        con.query("SELECT * FROM discos", function (err, result, fields) {
          if (err) throw err;
          
          res
          .status(200)
          .json( result)
        });
     


      
        
    })

    app.post('/', (req, res, next) => {
      var query = "INSERT INTO `discos`( `nombre`, `artista`, `genero`) VALUES ('"+req.body.name+"','" + req.body.artist+"','" + req.body.genre+"')";
     
      con.query(query, function (err, result, fields) {
        if (err) throw err;
        res
        .status(200)
        .json({ data: 'insertado correctamente' })
         next
       
      });
      
    })

    app.put('/', (req, res, next) => {
      res
        .status(200)
        .json({ data: 'metodo put' })
    })

    app.delete('/', (req, res, next) => {
      res
        .status(200)
        .json({ data: 'metodo delete' })
    })

    _server = app.listen(app.locals.config.PORT, () => {
      const address = _server.address()
      const host = address.address === '::'
        ? 'localhost'
        : address

      const port = app.locals.config.PORT
      if (process.env.NODE_ENV !== 'test') {
        console.log(`Server opened listen on http://${host}:${port}`)
      }
    })
  },
  close () {
    _server.close()
  }
}

export default server

if (!module.parent) {
  server.start()
}
