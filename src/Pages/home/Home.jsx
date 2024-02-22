import React from 'react'
import Navbar from '../../Components/navbar/Navbar'
import Header from '../../Components/header/Header'
import Featured from '../../Components/featured/Featured'
import PropertyList from '../../Components/propertyList/PropertyList'
import FeaturedProperties from '../../Components/featuredProperties/FeaturedProperties'
import MailList from '../../Components/mailList/MailList'
import Footer from '../../Components/footer/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="mt-[50px] flex flex-col items-center gap-[30px]">
        <Featured/>
        <h1 className="w-[1024px] text-xl font-bold	"> Browse on Property Type</h1>
        <PropertyList/>
        <h1 className="w-[1024px] text-xl font-bold	"> Homes guests love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home
