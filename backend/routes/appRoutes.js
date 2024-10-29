const { Router } = require('express');
const controller = require('../controllers/appController');
const { jwtAuth } = require('./middlewares/routeAuth');
const { upload } = require('../configs/cloudinaryConfig');

const router = Router();

router.get('/profile', jwtAuth, controller.getUserProfile);
router.put('/profile/image', jwtAuth, upload.single('file'), controller.updateProfileImage);
router.put('/profile/bio', jwtAuth, controller.updateProfileBio);

router.get('/recent-chat', jwtAuth, controller.getRecentMessagedUsers);
router.get('/search', jwtAuth, controller.getSearch);

router.get('/user/:id', jwtAuth, controller.getUsername)
router.get('/message', jwtAuth, controller.getChatMessages);
router.post('/message', jwtAuth, controller.createMessage);

module.exports = router;
