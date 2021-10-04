// ----------this are the steps we following in this file----------
// we need credential to connect to the database - i can pull it ffrom fireostore or right click and gettit form my db js file
// connect to the database
const {
    Timestamp
} = require('bson')
const {
    connectDb
} = require('./db')
const CLOTHES_COLLECTION = 'clothes'
// get all products   
exports.getAllProducts = (req, res) => { // instead of request resosnd wwe will use req and res

    const db = connectDb() // this will return the connection to firestore
    db.collection(CLOTHES_COLLECTION).get() // we can also make this a async function but using .then i catch the error right away
        .then(collection => {

            const products = collection.docs.map(doc => {
                let product = doc.data()
                product.id = doc.id
                return product
            })
            res.send(products) // in express we return a response

        })
        .catch(err => res.status(500).send(err))

    //res.send('works')  res.send() by default sends a 200 ok message
}

// get a single product

exports.getProductByID = (req, res) => {
    const db = connectDb()
    const {
        id
    } = req.params



    db.collection(CLOTHES_COLLECTION).doc(id).get()
        .then(doc => {
            let product = doc.data()
            product.id = doc.id
            res.send(product)
        })
        .catch(error => res.status(500).send(error))
}

// create a new product

exports.createProduct = (req, res) => {
    const db = connectDb()
    const newProduct = req.body
    db.collection(CLOTHES_COLLECTION).add(newProduct) // when using .add it generates a document id automatically and returns a reference that has an id
        .then(docRef => {
            let product = req.body
            product.id = docRef.id
            res.send(product)
        })

}


//update a single product
exports.updateProduct = (req, res) => {
    let product = req.body
    const {
        id
    } = req.params

    db.collection(CLOTHES_COLLECTION).doc(id).update(product)
        .then(() => this.getProductByID(req, res))
        .catch(error => res.status(500).send(error))

}




//delete a single product 
exports.deleteProduct = (req, res) => {
    const db = connectDb() 
    const {
        id
    } = req.params

    db.collection(CLOTHES_COLLECTION).doc(id).delete()
        .then(Timestamp => {
            res.status(200).send(`product ${id} nuked at ${Timestamp}`)
        })
        .catch(error => res.status(500).send(error))

}