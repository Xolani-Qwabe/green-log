const Router = require('express');
const passport = require('passport');

const authRouter = Router();


authRouter.post('/auth', passport.authenticate("local"), (req, res) => {
    console.log(`Logged in User with userId : ${req.user._id}`)
    return res.status(200).send({ msg: "ok" });
});


authRouter.get('/auth/status',(req,res)=>{
    req.session.cookie
    return req.user 
    ? res.status(200).send(req.user.id) : res.status(401).send({msg:"Not Authenticated"})
});

authRouter.get('auth/logout', (req, res) => {
    if (!req.user) return res.sendStatus(401);
    req.logout(); // no callback needed
    req.session.destroy((err) => {
        if (err) return res.sendStatus(400); // handle session destruction error
        res.clearCookie('connect.sid'); // clear the session cookie
        res.sendStatus(200); // successfully logged out
    });
});



module.exports = authRouter ;