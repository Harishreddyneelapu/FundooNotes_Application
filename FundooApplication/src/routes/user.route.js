import express from 'express';
import * as userController from '../controllers/user.controller';
import * as validator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


router.post('', validator.newUserValidatorRegister, userController.newUserRegister);


router.post('/login', validator.loginUser, userController.userLogin);

router.get('/verify',userAuth, userController.verifyUser);

export default router;
