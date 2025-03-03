const {Router} = require('express');
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const authRouter = require('./authRoutes')


const router = Router();

router.use(productRoutes);
router.use(userRoutes);
router.use(authRouter)

module.exports = router;