import React, { useEffect } from 'react'
import "./profile.css"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useState } from 'react'
import axios from "axios"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
const Profile = () => {
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);
    const handleDelete = async () => {
        const iid = user._id;
      
        axios.delete(`https://backend-1gn8.onrender.com/api/users/delete/${iid}`);
        window.alert("Deleted successfully!");
      
            dispatch({ type: "LOGOUT" });
            navigate("/")
          
    }

    return (
        <div className='total'>
            <Navbar />
            <div className="container">
                <br />
                <div className="content">

                    <table className='table'>
                        <tr>
                            <th className='tablee'>Personal Details <br />
                                you can check your details and you can edit it here! <br />

                                <br />
                                <Link to={'/updateUser'}>
                                    <button className='button' >Edit</button>
                                </Link>
                                <br /><br />

                                <button className='button' onClick={handleDelete}>Delete Account</button>

                            </th>

                            <th><img src={user.img} alt='profilephoto' className="w-[120px] h-[130px] rounded-[50%]" /><br />Profile Picture</th>

                        </tr>
                        <tr>
                            <td>User Name</td>
                            <td>{user.username}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>{user.phone}</td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>{user.country}</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>{user.city}</td>
                        </tr>


                    </table>

                </div>
            </div>

            <br />





            <div className='footer'>
                <Footer />
            </div>
        </div>

    )
}

export default Profile