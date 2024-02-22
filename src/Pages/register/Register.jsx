import React from 'react'
import { useState } from 'react';
import "./register.css";
import Navbar from '../../Components/navbar/Navbar';
import axios from "axios"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {

    const [file, setFile] = useState("");
    const [info, setInfo] = useState({
        username: "",
        email: "",
        country: "",
        city: "",
        phone: "",
        password: "",
        img: ""

    })
    const navigate = useNavigate();

    const handleChange = e => {
        setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleClick = async e => {
        e.preventDefault();
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "upload")
        try {
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dvxyn4laa/image/upload", data);
            const { url } = uploadRes.data;

            const newUser = {
                ...info,
                img: url,
            };
            await axios.post("/auth/register", newUser);
            navigate("/login");

        } catch (err) {
            console.log(err.response.data);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='place-self-center'>
                <div className='flex flex-col items-center justify-center border-8  mt-5 rounded-[20px]  '>
                    <div className=' '>
                        <h1 className='text-4xl text-cyan-800 text-center mb-6 font-extrabold'>Sign Up</h1>
                        <form action=''>
                            <div className='flex flex-col items-center'>
                                <div className='flex flex-row p-[20px]'>
                                    <div className='flex flex-col'>
                                        <div className='relative my-4'>
                                            <img
                                                src={
                                                    file
                                                        ? URL.createObjectURL(file)
                                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                                }
                                                alt=""
                                                className='w-[140px] h-[100px]'
                                            />
                                            <label htmlFor="file">
                                                Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                            </label>
                                            <input
                                                type="file"
                                                id="file"
                                                onChange={(e) => setFile(e.target.files[0])}
                                                style={{ display: "none" }}
                                            />
                                        </div>
                                        <div className='relative my-4'>
                                            <label>Your Email</label>
                                            <input type='email' id='email' onChange={handleChange} placeholder='email' className='block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer' />
                                        </div>
                                        <div className='relative my-4'>
                                            <label>Username</label>
                                            <input type='text' id='username' onChange={handleChange} placeholder='Username' className='block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer' />
                                        </div>
                                        <div className='relative my-4'>
                                            <label>Password</label>
                                            <input type='password' id='password' onChange={handleChange} placeholder='password' className='block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col ml-[250px]'>
                                        <div className='relative my-4'>
                                            <label>Phone</label>
                                            <input type='number' id='phone' onChange={handleChange} placeholder='Phone' className='block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer' />
                                        </div>
                                        <div className='relative my-4'>
                                            <label>Country</label>
                                            <input type='text' id='country' onChange={handleChange} placeholder='country' className='block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer' />
                                        </div>
                                        <div className='relative my-4'>
                                            <label>City</label>
                                            <input type='text' id='city' onChange={handleChange} placeholder='city' className='block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer' />
                                        </div>
                                    </div>
                                </div >
                                <button className='border-black bg-cyan-700 rounded-[5px] p-[10px] w-[90px] mb-5 ' onClick={handleClick}>Submit</button>
                            </div>
                        </form>
                    </div>
                    <span>Already have an account?<Link to={"/login"} className='text-blue-700	'>Sign in</Link></span>
                </div>
            </div>
        </div>
    );
};
export default Register;