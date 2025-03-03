const Router = require('express');

const cartRouter = Router();

cartRouter.get('/api/cart',(req,res)=>{
    if(!req.session.user)  return res.status(401).send({msg:"Not Authenticated"})
    return res.send(req.session.cart ?? [])
})

cartRouter.post('/api/cart',(req,res)=>{
    if(!req.session.user) return res.status(401).send({msg:"User not authenticated"})
    const {body:item} = req;
    const{cart} = req.session;
    if(cart){
        cart.push(item); 
    }
    else{
        req.session.cart = [item];
    }
    return res.status(201).send(req.session.cart);
})


module.exports = cartRouter;