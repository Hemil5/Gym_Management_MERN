import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
const EditMemberDetail = ({ setShowEditModal, id }) => {
    const [loaderImage, setImageLoader] = useState(false);

    const [editForm, setEditForm] = useState({
        name: "",
        mobileNo: "",
        address: "",
        profilePic: ""
    });

    // const [data, setData] = useState({ name: "", mobileNo: "", address: "", profilePic: "" })

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await axios.get(`http://localhost:4000/members/get-member/${id}`, { withCredentials: true })
            .then((response) => {
                const member = response.data.member;
                setEditForm({
                    name: member.name,
                    mobileNo: member.mobileNo,
                    address: member.address,
                    profilePic: member.profilePic
                });
            }).catch((err) => {
                console.log(err);
                toast.error("Something Went Wrong");
            });
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(
                `http://localhost:4000/members/update-member-details/${id}`,
                {
                    name: editForm.name,
                    mobileNo: editForm.mobileNo,
                    address: editForm.address,
                    profilePic: editForm.profilePic
                },
                { withCredentials: true }
            )
                .then((res) => {
                    toast.success("Member Updated",{autoClose:2000});
                    setTimeout(()=>{
                        window.location.reload()
                        setShowEditModal(false)
                    },2000)
                })
                .catch((err) => {
                    toast.error(err.response.data.error);
                    console.log(err);
                });

            // fetchData(); // Refresh data after edit
        } catch (error) {
            toast.error("Update Failed");
            console.error(error);
        }
    };

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
            console.log(response.data.url)
            const imageUrl = response.data.url;
            setEditForm({ ...editForm, ['profilePic']: imageUrl })
            setImageLoader(false)

        } catch (err) {
            console.log(err)
            setImageLoader(false)
        }
    }


    return (
        <div className='w-full h-[100vh] fixed bg-black bg-opacity-50 text-black top-0 left-0 flex justify-center'>
            <div className='w-1/2 fixed bottom-10 bg-white rounded-lg h-fit mt-32 p-5'>
                <div className='flex justify-between'>
                    <div className='text-4xl font-semibold'>Edit Member Details</div>
                </div>
                <div className='flex'>
                    <div className='w-1/4 h-fit mx-quto mt-7'>
                        <img src={editForm?.profilePic} className='ml-[50px] w-[550px] h-[150px]' />
                        {
                            loaderImage && <Stack sx={{ width: '250px', color: 'grey.500', mt: 2 }} spacing={2}>
                                <LinearProgress color="primary" />
                            </Stack>
                        }
                        <input type='file' className='mt-8 ml-0' onChange={(e) => uploadImage(e)} />
                    </div>

                    <div className='ml-[120px] w-3/4'>
                        <div className="mt-7">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                className="w-full border rounded p-2"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block text-gray-700">Mobile No</label>
                            <input
                                type="text"
                                value={editForm.mobileNo}
                                onChange={(e) => setEditForm({ ...editForm, mobileNo: e.target.value })}
                                className="w-full border rounded p-2" />
                        </div>

                        <div className="mb-3">
                            <label className="block text-gray-700">Address</label>
                            <input
                                type="text"
                                value={editForm.address}
                                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                                className="w-full border rounded p-2" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        onClick={() => setShowEditModal(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-900">
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveEdit}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Save
                    </button>
                </div>
            </div>
        </div >
    )
}

export default EditMemberDetail
