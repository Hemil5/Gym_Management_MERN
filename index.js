import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import cors from 'cors';  

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))
  
app.use(cookieParser());
app.use(express.json());
import './DBConn/conn.js';

import {router as GymRoutes} from './Routes/gym.js';
import {router as MembershipRoutes} from './Routes/membership.js';
import {router as MemberRoutes} from './Routes/member.js';

app.use('/auth',GymRoutes);
app.use('/plans',MembershipRoutes);
app.use('/members',MemberRoutes);

app.listen(PORT,()=>{
    console.log("Server is running on Port 4000")
})