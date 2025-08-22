import React, { useState, useEffect } from 'react'
import axios from 'axios';

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';

const Addmembers = ({ handleClose }) => {

  const [inputField, setInputField] = useState({ name: "", mobileNo: "", address: "", membership: "", profilePic: "https://th.bing.com/th/id/OIP.gj6t3grz5no6UZ03uIluiwHaHa?rs=1&pid=ImgDetMain", joiningDate: "" })
  const [loaderImage, setImageLoader] = useState(false);
  const [membershipList, setMembershipList] = useState([]);
  const [errors, setErrors] = useState({ mobileNo: "" }); // Store validation errors

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value })
  }
  // console.log(inputField)

  const uploadImage = async (event) => {
    setImageLoader(true)
    console.log("Image Uploading")
    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);

    // dgpqqordf
    data.append('upload_preset', 'gym-management');

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dgpqqordf/image/upload", data);
      console.log(response)
      const imageUrl = response.data.url;
      setInputField({ ...inputField, ['profilePic']: imageUrl })
      setImageLoader(false)

    } catch (err) {
      console.log(err)
      setImageLoader(false)

    }
  }

  const fetchMembership = async () => {
    await axios.get('http://localhost:4000/plans/get-membership', { withCredentials: true }).then((response) => {
      console.log(response.data.memberShip)
      if (response.data.memberShip.length === 0) {
        setTimeout(() => {
          handleClose();
        }, 1000)
        return toast.error("No any Membership added yet", {
          className: "text-lg"
        });
      } else {
        setMembershipList(response.data.memberShip)
        setInputField({
          ...inputField,
          membership: response.data.memberShip[0]._id, // Set the first membership
        });
      }
      console.log(inputField)
    }).catch(err => {
      console.log(err);
      // toast.error("Something Wrong Happedned")
    })
  }

  // useEffect(() => {
  //   // console.log(inputField)
  //   fetchMembership();
  // }, [])


  useEffect(() => {
    let isMounted = true; 

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/plans/get-membership', { withCredentials: true });
        if (!isMounted) return;

        if (response.data.memberShip.length === 0) {
          toast.error("No any Membership added yet", {
            className: "text-lg",
            autoClose:1000 
          });
          setTimeout(() => {
            handleClose();
          }, 1000);
        } else {
          setMembershipList(response.data.memberShip);
          setInputField(prev => ({
            ...prev,
            membership: response.data.memberShip[0]._id,
          }));
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);


  const handleOnChangeSelect = (event) => {
    let value = event.target.value;
    setInputField({ ...inputField, membership: value })

  };

  const handleRegisterButton = async () => {
    await axios.post('http://localhost:4000/members/register-member', inputField, { withCredentials: true })
      .then((res) => {
        toast.success("Added Successfully", { autoClose: 500 });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        toast.error(err.response.data.error);
      });
  }
  return (
    <div className='text-black'>
      <div className='grid gap-5 grid-cols-2 text-lg'>

        <input value={inputField.name} onChange={(event) => { handleOnChange(event, "name") }} placeholder='Name of the Joinee' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />

        <input value={inputField.mobileNo} onChange={(event) => { handleOnChange(event, "mobileNo") }} placeholder='Mobile No.' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />

        <input value={inputField.address} onChange={(event) => { handleOnChange(event, "address") }} placeholder='Address' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />

        <input value={inputField.joiningDate} onChange={(event) => { handleOnChange(event, "joiningDate") }} type='date' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />

        <select onChange={handleOnChangeSelect} className='border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray'>

          {
            membershipList.length != 0 &&
            membershipList.map((item, index) => {
              return (
                <option key={index} value={item._id}>{item.months} Months Membership</option>
              );
            })
          }

        </select>

        <input type='file' onChange={(e) => uploadImage(e)} />


        <div className='w-[150px] h-[150px]'>
          <img src={inputField.profilePic} className='rounded-full' />
          {
            loaderImage && <Stack sx={{ width: '150px', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="primary" />
            </Stack>
          }
        </div>


        <div onClick={() => handleRegisterButton()} className='p-3 border-2 w-28 text-lg h-14 text-center bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>Register</div>

      </div>
      <ToastContainer />
    </div>
  )
}

export default Addmembers 