  
import express from 'express'

import config from './config'
import router from './router'

let _server

const server = {
  start () {
    const bodyParser = require('body-parser')
    const app = express()

    config(app)
    router(app)

    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    )
    
    app.use(bodyParser.json())
    
        config(app)
       


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
