import express from 'express';
export const router = express.Router();
import * as GymController from '../Controllers/gym.js';

router.post('/register',GymController.register);
router.post('/login',GymController.login);

router.post('/reset-password/sendOtp',GymController.sendOtp);
router.post('/reset-password/checkOtp',GymController.checkOtp);
router.post('/reset-password',GymController.resetPassword)
router.post('/logout',GymController.logout);   