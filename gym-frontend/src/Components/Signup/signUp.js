import React, { useState } from 'react'
import './signUp.css';
import Modal from '../Modal/modal';
import ForgotPassword from '../ForgotPassword/forgotPassword';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
const SignUp = () => {

    const [forgotPassword, setForgotPassword] = useState(false);
    const [inputField, setInputField] = useState({ gymName: "", email: "", userName: "", password: "", profilePic: "https://th.bing.com/th/id/OIP.h4NU8Jb9tA2gJLi3veRj-wHaEl?rs=1&pid=ImgDetMain" })
    const [loaderImage, setImageLoader] = useState(false);

    const handleClose = () => {
        setForgotPassword(prev => !prev);
    }

    const handleOnchange = (event, name) => {
        setInputField({ ...inputField, [name]: event.target.value })
    }

    const uploadImage = async (event) => {
        setImageLoader(true)
        // console.log("Image Uploading");
        const files = event.target.files;
        const data = new FormData();
        data.append('file', files[0]);

        // dgpqqordf
        data.append('upload_preset', 'gym-management');

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dgpqqordf/image/upload",
                data
            );
            // console.log(response);
            const imageUrl = response.data.url;
            setInputField({ ...inputField, ['profilePic']: imageUrl });
            setImageLoader(false)
        } catch (err) {
            console.log(err);
            setImageLoader(false)
        }

    }

    const handleRegister = async () => {
        await axios.post('http://localhost:4000/auth/register', inputField)
            .then((resp) => {
                const successMsg = resp.data.message;
                toast.success(successMsg);
            })
            .catch((err) => { 
                const errorMessage = err.response.data.error;
                toast.error(errorMessage);
            });
        
        setInputField({ gymName: "", email: "", userName: "", password: "", profilePic: "https://th.bing.com/th/id/OIP.h4NU8Jb9tA2gJLi3veRj-wHaEl?rs=1&pid=ImgDetMain" })
    }


    return (
        <div className='customSignup w-1/3 p-10 mt-20 ml-20 bg-gray-50 bg-opacity-50 h-[365px] overflow-y-auto'>

            <div className='font-sans mb-10 text-white text-center text-3xl '>Register Your Gym</div>

            <input type='text' value={inputField.gymName} onChange={(event) => { handleOnchange(event, "gymName") }} className='w-full mb-10 p-2 rounded-lg' placeholder='Enter Gym Name' />

            <input type='text' value={inputField.email} onChange={(event) => { handleOnchange(event, "email") }} className='w-full mb-10 p-2 rounded-lg' placeholder='Enter Email' />

            <input type='text' value={inputField.userName} onChange={(event) => { handleOnchange(event, "userName") }} className='w-full mb-10 p-2 rounded-lg' placeholder='Enter UserName' />

            <input type='password' value={inputField.password} onChange={(event) => { handleOnchange(event, "password") }} className='w-full mb-10 p-2 rounded-lg' placeholder='Enter password' />

            <input type='file' onChange={(e) => { uploadImage(e) }} className='w-full mb-10 p-2 rounded-lg' />
            {
                loaderImage && <Stack sx={{ width: '250px', color: 'grey.500' }} spacing={2}>
                    <LinearProgress color="primary" />
                </Stack>
            }
            <img src={inputField.profilePic} className='mb-10 h-[200px] w-[250px]' />


            <div className='p-2 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer' onClick={() => handleRegister()}>Register</div>

            <div className='p-2 w-[80%] mt-5 border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer' onClick={() => handleClose()}>Forgot Password</div>

            {forgotPassword && <Modal header="Forgot Password" handleClose={handleClose} content={<ForgotPassword handleClose={handleClose}/>} />}
            <ToastContainer />
        </div>
    ) 
}

export default SignUp