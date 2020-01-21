  
import inventory from './inventory/inventory'


export default app => {
  app.use('/inv', inventory)
  
}
