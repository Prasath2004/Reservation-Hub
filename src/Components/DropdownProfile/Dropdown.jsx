import React, { useContext } from 'react'
import "./dropDown.css"
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Dropdown = ({ setOpenProfile }) => {

    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
        navigate("/")
        setOpenProfile(false);

    };
    const handleProfile = async (e) => {
        e.preventDefault();
        navigate("/profile")
        setOpenProfile(false)
    };
    const handleBookings = async (e) => {
        e.preventDefault();
        navigate("/mybookings")
        setOpenProfile(false)
    };

    return (
        <div className='flex flex-col dropDownProfile'>
            <ul className='flex flex-col gap-4 '>
                <li onClick={handleProfile} className='pointer'>Profile</li>
                <li onClick={handleBookings} className='pointer'>My Bookings</li>
                <li onClick={handleClick} className='pointer'>Logout</li>
            </ul>
        </div>
    )
}

export default Dropdown