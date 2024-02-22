import { React, useContext, useState, useEffect } from 'react'
import Navbar from '../../Components/navbar/Navbar'
import { DateRange } from 'react-date-range';

import List from '../lists/List'
import Header from '../../Components/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocation } from "@fortawesome/free-solid-svg-icons";
import MailList from '../../Components/mailList/MailList'
import Footer from '../../Components/footer/Footer'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../Components/reserves/Reserve';

const Hotel = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2]

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useFetch(`https://backend-1gn8.onrender.com/api/hotels/find/${id}`)
const navigate=useNavigate();
  const { dates, options } = useContext(SearchContext);
const {user}=useContext(AuthContext);
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  console.log(dates);
   const days =dayDifference(dates[0].endDate, dates[0].startDate);
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  }
 
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const handleClick=()=>{
    if(user){
      setOpenModal(true)
    }
    else{
      navigate("/login")
    }
  }

  return (
    <div>
      <Navbar />
      {loading ? ("loading") :
        (
          <div className="flex items-center flex-col mt-[20px]">
            {open && <div className="sticky top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.426)] z-[999] flex items-center">
              <FontAwesomeIcon icon={faCircleXmark} className="absolute top-[20px] right-[20px] text-lg	text-gray-400	" onClick={() => setOpen(false)} />
              <FontAwesomeIcon icon={faCircleArrowLeft} className='m-[20px] text-5xl	text-gray-400    ' onClick={() => handleMove("l")} />
              <div className="w-[100%] h-[100%] flex justify-center items-center" >
                <img src={data.photos[slideNumber]} alt="" className="w-[80%] h-[80vh] " />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className='m-[20px] text-5xl text-gray-400' onClick={() => handleMove("r")} />
            </div>}
            <div className="w-[100%] max-w-[1024px] flex flex-col gap-[10px] relative">
              <button className="absolute top-[10px] right-0 border bg-cyan-900 text-white	p-[10px 20px] rounded-[5px] w-[150px] font-bold	">Reserve Now!</button>
              <h1 className="text-base	font-extrabold	">{data.name}</h1>
              <div className="text-sm	flex items-center gap-[10px]">
                <FontAwesomeIcon icon={faLocation} />
                <span>{data.address}</span>
              </div>
              <span className="text-cyan-400	font-medium	">
                Excellent Location -{data.distance} from International Airport
              </span>
              <span className="text-lime-500	font-medium">
                Book a stay over ₹{data.cheapestPrice} at this proprty and get a free airport taxi
              </span>
              <div className="flex flex-wrap	justify-between">
                {data.photos?.map((photo, i) => (
                  <div className="w-[33%]">
                    <img onClick={() => handleOpen(i)} src={photo} alt="" className="w-[100%] object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex justify-between gap-[20px] mt-[20px]">
                <div className="flex-3">
                  <h1 className="text-base	font-bold">{data.title}</h1>
                  <p className="text-sm	mt-[20px] ">
                    {data.desc}
                  </p>
                </div>
                <div className="flux bg-cyan-200	w-[40%] p-[20px] flex flex-col gap-[20px]">
                  <h1 className='font-extrabold text-black	'>Perfect for a {days}-night stay!</h1>
                  <span className='font-semibold'>
                    Located in the real heart of Chennai, with excellent location score 9.8!
                  </span>
                  <h2 className='font-light	'>
                    <b>₹{days * data.cheapestPrice * options.room}</b>({days} nights)
                  </h2>
                  <button className=' border bg-cyan-900 text-white	p-[10px 20px] rounded-[5px] w-[150px] font-bold' onClick={handleClick}>Reserve Now</button>
                </div>
              </div>
              <MailList />
              <Footer />
            </div>
          </div>)}
          {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  )
}

export default Hotel
