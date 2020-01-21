  
import express from 'express'
import con from'../bbdd'



const router = express.Router()

router
  .get('/', (req, res, next) => {
    con.query("SELECT * FROM discos", function (err, result, fields) {
        if (err) throw err;
        
        res
        .status(200)
        .json( result)
      });

  })
  .post('/', (req, res, next) => {
   var body = req.body;
   var query = "INSERT INTO `discos`( `nombre`, `artista`, `genero`) VALUES ";
  body.discos.forEach(function(disco,index) {
    if(body.discos[index+1]!=null){
      console.log("deberia entrar aqui")
      query += "('"+disco.name+"','" + disco.artist+"','" + disco.genre+"'),";
    }else{
      query += "('"+disco.name+"','" + disco.artist+"','" + disco.genre+"')";
    }
    
     

      
     
   });
   con.query(query, function (err, result, fields) {
    if (err) {
      res
        .status(200)
        .json({ "resultado": "error en insercion" })
         next
    }else{
      res
      .status(200)
      .json({ "data": 'insertado correctamente' })
       next
    }

    
  })
})
export default router