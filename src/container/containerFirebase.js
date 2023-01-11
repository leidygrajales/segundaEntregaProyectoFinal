
class ContainerFirebase {

    constructor(collectionName, db) {
        this.db = db
        this.collection = db.collection(collectionName)
    }

    async save(obj) {
        try {
            const timestamp = Date.now()
            const insertedItem = await this.collection.add({ ...obj, timestamp });
            return { ...obj, id: insertedItem.id }
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async getAll() {
        try {
            const result = []
            const snapshot = await this.collection.get();
            snapshot.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
            return result
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async getById(id) {
        try {
            const doc = await this.collection.doc(id).get();
            if (!doc.exists) {
                throw new Error(`Error al listar por id: no se encontró`)
            } else {
                const data = doc.data();
                return { ...data, id }
            }
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async updateById(id, obj) {
        try {
            const updated = await this.collection.doc(id).set(obj);
            return updated
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }

    async deleteById(id) {
        try {
            const item = await this.collection.doc(id).delete();
            return item
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll() {
        try {

            this.collection.listDocuments().then(val => {
                val.map((val) => {
                    val.delete()
                })
            })

        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
}

export default ContainerFirebase