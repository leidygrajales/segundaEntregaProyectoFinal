

class ContainerMongoDB {

  constructor(model) {
    this.model = model
  }

  async save(obj) {
    try {
      const newDocument = new this.model(obj)
      const result = await newDocument.save()
      return { id: result.id }
    } catch (e) {
      console.log(e)
    }
  }

  async getAll() {
    try {
      const data = await this.model.find({});
      return data
    } catch (e) {
      console.log(e)
    }
  }

  async getById(id) {
    try {
      const obj = await this.model.find({ _id: id })
      if (!obj) {
        return { error: 'elemento no encontrado' }
      }
      return obj
    } catch (e) {
      console.log(e)
    }
  }

  async deleteById(id) {
    try {
      const result_id = await this.model.deleteOne({ _id: id })
      console.log('result_id', result_id)
      return { deleted_id: result_id }
    } catch (e) {
      console.log(e)
    }
  }

  async deleteAll() {
    try {
      const result = await this.model.deleteMany({})
      return { success: true }
    } catch (e) {
      console.log(e)
    }
  }

  async updateById(id, obj) {
    try {
      const result_id = await this.model.updateOne({ _id: id }, obj)
      return { updated_id: result_id }
    } catch (e) {
      console.log(e)
    }
  }

  async getRandom(qty) {
    const data = await this.model.aggregate([{ $sample: { size: qty } }])
    return data || {}
  }
}

export default ContainerMongoDB