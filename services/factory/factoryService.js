 
class Factory {
    constructor(Model){
       this.model = Model
    }

  create(data){
    const model = new model.create(data)
     try {
         if (data) {
             return req.status(201).json(data)
         } 
     } catch (error) {
        return req.status(403).json(error)
     }
  }

  findOne( id ){
        const model = new model.findById(id)
     try {
         if (id) {
             return req.status(201).json(id)
         } 
     } catch (error) {
        return req.status(403).json(error)
     }
  }

  findAll(){
    const model = new model.find()
     try {
         if (model) {
             return req.status(201).json(model)
         } 
     } catch (error) {
        return req.status(403).json(error)
     }
  }

  update(id,data){
           const model = new model.update(id,data)
     try {
         if (data) {
             return req.status(201).json(data)
         } 
     } catch (error) {
        return req.status(403).json(error)
     }
  }

  delete(id){
           const model = new model.DeleteById(id)
     try {
         if (id) {
             return req.status(201).json(id)
         } 
     } catch (error) {
        return req.status(403).json(error)
     }
  }
}

module.exports = Factory