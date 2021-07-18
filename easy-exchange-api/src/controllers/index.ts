import express from 'express';

const router: express.Router = express.Router();

router.use('/currencie', require('./currencie.controller'));
router.use('/converter', require('./converter.controller'));

module.exports = router;