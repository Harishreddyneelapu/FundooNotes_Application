import express from 'express';
import * as userController from '../controllers/user.controller';
import * as validator from '../validators/user.validator';
import { resetAuth, userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


router.post('', validator.newUserValidatorRegister, userController.newUserRegister);


router.post('/login', validator.loginUser, userController.userLogin);


router.post('/forgotPassword',validator.forgotPassword,userController.forgotPassword);

router.put('/resetPassword',validator.resetPasswordValidator, resetAuth, userController.resetPassword);

export default router;
