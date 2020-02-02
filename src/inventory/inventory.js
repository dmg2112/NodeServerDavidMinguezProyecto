  
import express from 'express'
import con from'../bbdd'



const router = express.Router()

router
  .get('/', (req, res, next) => {
    
    con.query("SELECT * FROM discos", function (err, result, fields) {

        if (err) {
           
            res
            .status(404)
            .json(err);
        };
        
        res
        .status(200)
        .json({"estado": "ok",
        "data":result});
      })

  })
  .post('/', (req, res, next) => {
   var body = req.body;
   var query = "INSERT INTO `discos`( `nombre`, `artista`, `genero`,`fecha`) VALUES ";
   console.log(body)
  body.discos.forEach(function(disco,index) {

    if(body.discos[index+1]!=null){
      
      query += "('"+disco.name+"','" + disco.artist+"','" + disco.genre+"','" + disco.date+"'),";
    }else{
      query += "('"+disco.name+"','" + disco.artist+"','" + disco.genre+"','" + disco.date+"')";
    }
    
    console.log(query);
     

      
     
   });
   con.query(query, function (err, result, fields) {
    if (err) {
      res
        .status(200)
        .json({ "estado": "error" })
        
    }else{
      res
      .status(200)
      .json({ "estado": 'ok' })
      
    }

    
  })
})
.put('/', (req, res, next) => {
  var disco = req.body.disco;
  var query = "UPDATE discos SET nombre= '"+disco.name +"',artista='"+disco.artist+"',genero='"+disco.genre+"',fecha='"+disco.date+"' WHERE id = "+disco.id
  console.log(query);
  con.query(query, function (err, result, fields) {
     
    if (err) {
      res
        .status(200)
        .json({ "estado": "error"})
         next
    }else{
      res
      .status(200)
      .json({ "estado": 'ok' })
       next
    }
})
})
.delete('/', (req, res, next) => {
  var disco = req.body.disco;
  
  var query = "";
  if(disco == "all"){
    query = "delete from discos";
  }else{
    query = "delete from discos WHERE id = "+disco
  }
  console.log(query);
  con.query(query, function (err, result, fields) {
     
    if (err) {
      res
        .status(200)
        .json({ "estado": "error"})
         next
    }else{
      res
      .status(200)
      .json({ "estado": 'ok' })
       next
    }
})
})

export default router