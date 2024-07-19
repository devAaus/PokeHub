import React from 'react'

const Sort = ({ handleSort }) => {
      return (
            <div className=" flex items-center justify-center space-x-4 mt-4">
                  <label className="text-white">
                        Sort by:
                  </label>
                  <select onChange={handleSort} className="ml-2 p-2 rounded-md bg-gray-800 text-white">

                        <option value="number-asc">Numerical (Ascending)</option>
                        <option value="number-desc">Numerical (Descending)</option>
                        <option value="name-asc">Alphabetical (A-Z)</option>
                        <option value="name-desc">Alphabetical (Z-A)</option>
                  </select>
            </div>
      )
}

export default Sort