const { Router } = require('express');
const controller = require('../controllers/authController');
const { loginAuth, jwtAuth } = require('./middlewares/routeAuth');
const validateRegister = require('./middlewares/validateRegister');

const router = Router();

router.get('/user', jwtAuth, controller.getUserId);
router.post('/register', validateRegister, controller.registerUser);
router.post('/login', loginAuth, controller.loginUser);
router.post('/logout', jwtAuth, controller.logoutUser);

module.exports = router;
