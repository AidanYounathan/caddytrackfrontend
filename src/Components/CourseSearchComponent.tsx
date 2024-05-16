import { TextInput, Button } from 'flowbite-react'
import React from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { useState } from "react";


const CourseSearchComponent = () => {

  const [favClassName, setFavClassName] = useState<string>("-translate-x-full");
  const handleFavDrawerClick = () => {
    if (favClassName !== "-translate-x-full") {
      setFavClassName("-translate-x-full");
    } else {
      setFavClassName("");
    }
  }

  const [openModal, setOpenModal] = useState(true);
  return (
    <>
      <div className="bg-white opacity-95 rounded-xl py-5 sm:mx-[2%] md:mx-[5%] lg:mx-[10%] mt-4 flex justify-center">
   
        <div className='w-4/5 md:w-3/5 lg:w-2/5 '>
          <button type="button" className=" underline " onClick={handleFavDrawerClick}>Favorites</button>
          <h1 className="text-3xl text-center pb-4 tracking-wide">Find A Course</h1>
          <div className='flex justify-center'>
            <TextInput type="search" className='w-full' rightIcon={RiSearchLine} placeholder="Enter Location" required />
          </div>
        </div>
     

      </div>













      {/* Start Drawer */}
      <div id="drawer-navigation" className={`fixed top-0 bg-[rgba(238,238,238,0.9)] left-0 z-40 w-full lg:w-[420px] h-screen p-4 overflow-y-auto transition-transform dark:bg-gray-800 ${favClassName}`}>
        <p id="drawer-navigation-label" className=" text-[2.8rem] font-bold">Bookmarked</p>
        <button onClick={handleFavDrawerClick} type="button" className=" bg-transparent  hover:text-gray-500 absolute top-6 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg aria-hidden="true" className="w-[50px] h-[50px] grid" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path></svg>
        </button>
        <div className="py-4 overflow-y-auto ">
          {/* <div id="getFavoritesDiv">
            {favorites.map((pokemonName: string, index: number) => (
              <div key={index} className="flex justify-between flex-row">
                <p className=" text-black  text-[32px] w-full rounded-l-lg px-2 cursor-pointer" onClick={() => setUserInput(pokemonName)}>
                  <span>{`${CapitalFirstLetter(pokemonName)}`}</span>
                </p>
                <button className=" text-[32px]  hover:text-gray-500 px-5 h-full" onClick={() => handleFavoriteClick(pokemonName)}  >
                  {"X"}
                </button>
              </div>
            ))}
          </div> */}
        </div>
      </div>
      {/* End Drawer */}
    </>
  )
}

export default CourseSearchComponent