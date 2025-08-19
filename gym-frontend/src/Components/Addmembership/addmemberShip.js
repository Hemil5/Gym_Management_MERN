import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
const AddmemberShip = ({ handleClose }) => {

    const [inputField, setInputField] = useState({ months: "", price: "" });
    const [membership, setMembership] = useState([]);

    const handleOnChange = (event, name) => {
        setInputField({ ...inputField, [name]: event.target.value })
    }

    const fetchMembership = async () => {
        await axios.get('http://localhost:4000/plans/get-membership', { withCredentials: true })
            .then((res) => {
                if (res.data.memberShip.length === 0) {
                    toast.error('There no membership added yet')
                } else {
                    setMembership(res.data.memberShip);
                    // toast.success(res.data.membership.length + " Membership Fetched")
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    let count = false
    useEffect(() => {
        if (count === false) {
            fetchMembership()
        }
        count = true;
    }, [setMembership])

    const handleAddmembership = async () => {
        await axios.post('http://localhost:4000/plans/add-membership', inputField, { withCredentials: true })
            .then((res) => {
                setMembership((prevMembership) => [...prevMembership, res.data.newMembership]);
                toast.success('Membership Added Successfully!');
                setInputField({ months: "", price: "" });
                // handleClose();
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.error);
            });
    }

    const handleDeleteMembership = async (id) => {

        try {
            await axios.post('http://localhost:4000/plans/delete-membership', { id }, { withCredentials: true });
            setMembership((prevMembership) => prevMembership.filter(item => item._id !== id));
            toast.success('Membership deleted successfully!');
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete membership.');
        } 
    };

    return (
        <div className='text-black'>
            <div className='flex flex-wrap gap-5 items-center justify-center'>

                {membership.length != 0 &&
                    membership.map((item, index) => {
                        return (
                            <div className='text-lg bg-slate-900 text-white border-2 pl-2 pr-2 flex-col gap-3 justify-between pt-1 pb-1 rounded-xl font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 cursor-pointer' key={index} 
                            onDoubleClick={() => handleDeleteMembership(item._id)}>
                                <div>{item.months} Months Membership</div>
                                <div>Rs {item.price}</div>
                            </div>
                        );
                    })
                }
            </div>

            <hr className='mt-10 mb-10' />
            <div className='flex gap-10 mb-10'>

                <input value={inputField.months} onChange={(event) => handleOnChange(event, "months")} className='border-2 rounded-lg text-lg w-1/3 h-1/2 p-2' type='number' placeholder="Add No. of Months" />

                <input value={inputField.price} onChange={(event) => handleOnChange(event, "price")} className='border-2 rounded-lg text-lg w-1/3 h-1/2 p-2' type='number' placeholder="Add Price" />

                <div onClick={() => { handleAddmembership() }} className='text-lg border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'> Add +</div>

            </div>
            <ToastContainer />
        </div >
    )
}

export default AddmemberShip