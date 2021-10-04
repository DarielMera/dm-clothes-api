// wil handle incoming request and resposnses
//take a request and response for a single endpoint....
//first we import express

const { response } = require('express')
const express = require('express') // this is the old way to do import that sak show us will work any server
const {getAllProducts, getProductByID, createProduct, updateProduct, deleteProduct} = require('./src/products')



const app = express() //we are creating an instance ofr our express by conventionw we call our expess app -- app
// we telling express open up a port and listen for request coming in 
// we can number our port any number
app.use(express.json())
//app.get('/products' (req, res) = getAllProducts(req, res)) //do not forget the / at the beninging of the endpoint , has to start with /
// instead of writing req , res in both places we have a shorcut
app.get('/products', getAllProducts) // this line of code is the same as the following 
app.patch('/products:id', updateProduct)
app.delete('/products/:id', deleteProduct)
app.get('/products/:id', getProductByID)
app.post('/products', createProduct)
/* 
getAllProducts =(req, res) => { // instead of request resosnd wwe will use req and res
res.send('works')
*/



// i have to quick the node server to refreshq


app.listen(3000, ()=> { // this 3 lines of code i all i need to create an ecpress api


    console.log('listening on http://localhost:3000/') 
    
})

// at this point we do not have any request
// queick trick if i hold the command link i can click the address and will open it in browser
// it will not give me anything because i don't have / as an endpoint but i do have a /hello


// Nodemon is a program that runs node and restart the server
// npm install nodemon --save-dev -> is a dependency that will not run in the server but that developers will need in the developement mode
// buty in this case we will install it globally - we can usit in any project but the downsiode is that if someone else tryies to use on hithub then they will need nodeman, it won't just work for them
// npm i -g nodeman this should install it locally in my computer not in my depencdencies someitne i have to use 
// is watching for js files and json
// if ti does not start use npx nodemon

