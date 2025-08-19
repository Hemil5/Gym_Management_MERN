import express from 'express';
import * as MembershipController from '../Controllers/membership.js'
import auth from '../Auth/auth.js'
export const router = express.Router();

router.post('/add-membership',auth,MembershipController.addMembership)
router.get('/get-membership',auth,MembershipController.getmembership)