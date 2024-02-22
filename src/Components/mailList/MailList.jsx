import React from 'react'

const MailList = () => {
    return (
        <div className='w-[100%] mt-[50px] bg-[#003580] text-white flex flex-col items-center gap-[20px] p-[50px]'>
            <div className="text-xl	font-bold">Save Time!,Save Money!</div>
            <span className="mailDesc">We will send the best offers and deals to your Email</span>
            <input type="email" className="text-black w-[300px] h-[30px] p-[10px] mr-[10px]" placeholder='Enter your email' />
            <button className='rounded p-[5x] w-[200px] border b border-slate-300 bg-[#0071c2] h-[50px] text-white font-bold'>Subscribe</button>
        </div>
    )
}

export default MailList