const {Router} = require('express');
const { generateFakeProducts} = require('../utils/data/faker.js');

const productRouter = Router()
const products = generateFakeProducts()

productRouter.get('/products', (req, res) => {
    req.sessionStore.get(req.session.id, (error, sessionData) =>{
        if(error){
            console.log(error);
            throw error;
        }
        console.log(`this is from products call user sessionId is : ${req.session.id}`)
    res.send({msg:"In products route"})
    });
})

productRouter.post('/products', (req, res) => {

    res.send(req.body)
})


productRouter.get('/products/:id', (req, res) => {
    let parsedId = parseInt(req.params.id)
    if (isNaN(parsedId)) return res.status(400).send({ msg: "Bad Request. Invalid ID." });
    console.log(req.params)
    res.json({msg:req.params.id})
})


productRouter.put('/products/:id', (req, res) => {
    const {
        body, params: { id }
    } = req;
})

productRouter.patch('/products/:id', (req, res) => {
    const {
        body, params: { id }
    } = req;
})


productRouter.delete('/products/:id', (req, res) => {
    const { params: { id } } = req;
    res.send({ msg: `Product ${id} deleted` })
})


module.exports = productRouter;