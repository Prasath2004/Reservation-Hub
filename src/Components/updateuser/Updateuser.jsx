import React, { useContext } from 'react'
import './updateUser.css'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import axios from "axios"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { updateUser } from '../../context/AuthContext'

const Updateuser = () => {
    const { user, dispatch } = useContext(AuthContext);
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({
        username: user.username,
        email: user.email,
        country: user.country,
        city: user.city,
        phone: user.phone,
        password: user.password,
        img: user.img

    })
    const navigate = useNavigate();

    const handleChange = e => {
        setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };





    const handleClick = async e => {
        e.preventDefault();
        const iid = user._id;
        //const data = new FormData()
        //data.append("file", file)
        //data.append("upload_preset", "upload")
        try {
            // const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dvxyn4laa/image/upload", data);
            // const { url } = uploadRes.data;
            setInfo((prevInfo) => ({ ...prevInfo }));
            // const newUser = {
            //     ...info,
            //     // img: url,
            // };

            await axios.put(`https://backend-1gn8.onrender.com/api/users/userUpdate`, { user: info, id: iid });

            // updateUser(dispatch, info);
            navigate("/profile");
            updateLocal();
        } catch (err) {
            console.log(err.response.data);
        }

    }
    const updateLocal = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const updateduser = {
            ...storedUser,
            username: info.username,
            email: info.email,
            country: info.country,
            city: info.city,
            phone: info.phone,
            password: info.password,
            img: info.img
        }
        localStorage.setItem('user', JSON.stringify(updateduser));

    }

    return (

        <div>
            <Navbar />
            <div className='place-self-center'>
                <div className='flex flex-col items-center justify-center border-8  mt-5 rounded-[20px]  '>
                    <div className=' '>
                        <h1 className='text-4xl text-cyan-800 text-center mb-6 font-extrabold'>Update page </h1>
                        <form action=''>
                            <div className='flex flex-col items-center'>
                                <div className='flex flex-row p-[20px]'>
                                    <div className='flex flex-col'>

                                        <div className='relative my-4'>
                                            <label>Your Email</label>
                                            <input type='email' id='email' onChange={handleChange} value={info.email} className='block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer' />
                                        </div>
                                        <div className='relative my-4'>
                                            <label>Username</label>
                                            <input type='text' id='username' onChange={handleChange} value={info.username} className='block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer' />
                                        </div>
                                        <div className='relative my-4'>
                                            <label>Password</label>
                                            <input type='password' id='password' onChange={handleChange} value={info.password} className='block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col ml-[250px]'>
                                        <div className='relative my-4'>
                                            <label>Phone</label>
                                            <input type='number' id='phone' onChange={handleChange} value={info.phone} className='block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer' />
                                        </div>
                                        <div className='relative my-4'>
                                            <label>Country</label>
                                            <input type='text' id='country' onChange={handleChange} value={info.country} className='block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer' />
                                        </div>
                                        <div className='relative my-4'>
                                            <label>City</label>
                                            <input type='text' id='city' onChange={handleChange} value={info.city} className='block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer' />
                                        </div>
                                    </div>
                                </div >
                                <button className='border-black bg-cyan-700 rounded-[5px] p-[10px] w-[90px] mb-5 ' onClick={handleClick} >Update</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            <Footer />

        </div>
    )
}

export default Updateuser