import React from 'react'

const Sort = ({ handleSort }) => {
      return (
            <div className="flex items-center justify-center space-x-4 mt-4">
                  <label className="text-white">
                        Sort by:
                  </label>

                  <select onChange={(e) => handleSort(e.target.value)} className="ml-2 p-2 rounded-md bg-gray-800 text-white">

                        <option value="numerical">Numerical (Ascending)</option>
                        <option value="numericalDesc">Numerical (Descending)</option>
                        <option value="alphabetical">Alphabetical (A-Z)</option>
                        <option value="reverseAlphabetical">Alphabetical (Z-A)</option>

                  </select>

            </div>
      )
}

export default Sort