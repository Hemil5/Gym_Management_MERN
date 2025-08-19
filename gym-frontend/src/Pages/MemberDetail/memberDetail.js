import React, { useState, useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import Switch from 'react-switch';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const MemberDetail = () => {
    const [status, setStatus] = useState("Pending");
    const [renew, setRenew] = useState(false);
    const [membership, setMembership] = useState([]);
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const [planMember, setPlanMember] = useState("");
    const { id } = useParams();

    useEffect(() => {
        fetchData();
        fetchMembership();
    }, [])

    const fetchMembership = async () => {
        await axios.get('http://localhost:4000/plans/get-membership', { withCredentials: true })
            .then((res) => {
                if (res.data.memberShip.length === 0) {
                    toast.error('There no membership added yet')
                } else {
                    setMembership(res.data.memberShip);
                    setPlanMember(res.data.memberShip[0]._id)
                    // toast.success(res.data.membership.length + " Membership Fetched")
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const fetchData = async () => {
        await axios.get(`http://localhost:4000/members/get-member/${id}`, { withCredentials: true })
            .then((response) => {
                console.log(response);
                setData(response.data.member)
                setStatus(response.data.member.status)
                // toast.success('Fetched Data');
            }).catch((err) => {
                console.log(err);
                toast.error("Something Went Wrong");
            });
    }

    const handleSwitchBtn = async () => {
        let newStatus = status === "Active" ? "Pending" : "Active"
        await axios.post(`http://localhost:4000/members/change-status/${id}`, { status: newStatus },
            { withCredentials: true })
            .then((res) => {
                // toast.success("Status Changed");
            })
            .catch((err) => {
                toast.error("Status not Updated");
                console.log(err);
            });
        setStatus(newStatus)
    }

    const isDateInPast = (inputDate) => {
        const today = new Date(); // Get the current date
        const givenDate = new Date(inputDate); // Convert the input to a Date object

        return givenDate < today; // Check if the given date is before today
    };

    const handleOnChangeSelect = (event) => {
        let value = event.target.value;
        setPlanMember(value);
    }
    const handleRenewSaveBtn = async () => {
        await axios.put(`http://localhost:4000/members/update-member-plan/${id}`, { membership: planMember },
            { withCredentials: true })
            .then((response) => {
                setData(response.data.member);
                toast.success(response.data.message);
            })
            .catch((err) => {
                toast.error("Plan Not Updated");
                console.log(err);
            });
    }

    return (
        <div className='w-3/4 text-black p-3'>
            <div onClick={() => { navigate(-1) }} className='border-2 w-fit text-xl font-sans text-white p-2 rounded-xl bg-slate-900 cursor-pointer'>
                <ArrowBackIcon /> Go Back
            </div>
            <div className='mt-10 p-2'>
                <div className=' h-[60%] flex'>
                    <div className='w-1/3  mx-auto'>
                        <img src={data?.profilePic} className='w-full  mx-auto' />
                    </div>
                    <div className='w-2/3 relative bottom-14 text-xl p-2'>
                        <div className='mt-1 mb-1 text-2xl font-semibold'>Name : {data?.name}</div>

                        <div className='mt-1 mb-1 text-2xl font-semibold'>Mobile : +91 {data?.mobileNo} </div>

                        <div className='mt-1 mb-1 text-2xl font-semibold'>Address : {data?.address} </div>


                        <div className='mt-1 mb-1 text-2xl font-semibold'>Joined Date : {data?.lastPayment.slice(0, 10).split('-').reverse().join('-')}</div>

                        <div className='mt-1 mb-1 text-2xl font-semibold'>Next Bill Date : {data?.nextBillDate.slice(0, 10).split('-').reverse().join('-')}</div>

                        <div className='mt-1 mb-2 flex gap-4 text-2xl font-semibold'> Status : <Switch onColor='#6366F1' checked={status === "Active"} onChange={() => { handleSwitchBtn() }} /></div>

                        {isDateInPast(data?.nextBillDate) && <div onClick={() => { setRenew(prev => !prev) }} className={`mt-1 rounded-lg p-3 border-2 border-slate-900 text-center ${renew && status === "Active" ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white' : null}  w-full md:w-1/2 cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}>Renew</div>}

                        {isDateInPast(data?.nextBillDate) && 
                            renew && status === "Active" ? (
                                <div className="rounded-lg p-2 mt-5 h-fit bg-slate-50 w-[100%]">
                                    <div className="w-full">
                                        <div className="fixed w-[45%] bottom-15">
                                            <div>Membership</div>

                                            <select value={planMember} onChange={handleOnChangeSelect} className="w-full border-2 p-2 rounded-lg">
                                                {membership.map((item, index) => {
                                                    return (
                                                        <option value={item?._id}>{item?.months} Months Membership </option>
                                                    )
                                                })}
                                            </select>

                                            <div onClick={handleRenewSaveBtn} className="mt-3 rounded-lg p-3 border-2 border-slate-900 text-center w-1/2 cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Save</div>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }

                    </div>
                </div>


            </div>
            <ToastContainer />
        </div>
    )
}

export default MemberDetail