const router = require('express').Router();

// const thoughtRoutes = require('./thoughts-routes');
const thoughtsRoutes = require('./thoughts-routes');
const userRoutes = require('./user-routes');

router.use('/user', userRoutes);
// router.use('/thought', thoughtRoutes);
router.use('/thought', thoughtsRoutes);

module.exports = router;