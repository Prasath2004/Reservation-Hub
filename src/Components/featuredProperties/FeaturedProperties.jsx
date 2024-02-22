import React from 'react'
import useFetch from '../../hooks/useFetch'

const FeaturedProperties = () => {

  const { data, loading, error } = useFetch("https://backend-1gn8.onrender.com/api/hotels?featured=true");

  return (
    <div className="w-[100%] max-w-[1024px] flex justify-between gap-[20px]">

      {loading ? ("loading") : (<>
        {data.map((item) => (


          <div className="flex-1 gap-[10px] flex flex-col" key={item._id}>
            <img src={item.photos[0]}
              alt=""
              className="w-[100%] h-[200px]"
            />
            <span className="font-bold	">{item.name}</span>
            <span className="font-light	">{item.city}</span>
            <span className="font-medium	">Starting from ₹{item.cheapestPrice}</span>
            {item.rating && <div className="fpRating">
              <button className='border  bg-[#003580]	 p-[5px] text-white	'>{item.rating}</button>
              <span className='ml-[8px] text-sm	'>Ex
                cellent</span>
            </div>}
          </div>
        ))}
      </>)}
    </div>
  );
};

export default FeaturedProperties