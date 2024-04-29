import express from 'express';
import * as userController from '../controllers/user.controller';
import * as validator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('', validator.newUserValidatorRegister, userController.newUserRegister);

// route to login
router.post('/login', validator.loginUser, userController.userLogin);

router.get('/verify',userAuth, userController.verifyUser);


router.put('/forgotPassword',userController.forgotPassword);



export default router;
