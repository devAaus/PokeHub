import React from 'react'
import Image from 'next/image'
import pokeball from '@public/pokeball.svg'

const Search = ({ searchInput, handleSearchInput }) => {
      return (
            <form className="relative w-96" >

                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">

                        <Image src={pokeball} alt='pokeball image' height={20} width={20} />
                  </div>
                  <input
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search pokemon name..."
                        required
                        value={searchInput}
                        onChange={handleSearchInput}
                  />
            </form>
      )
}

export default Search