import React, { useState } from 'react'

const pallavi = () => {

  const [earth, setEarth] = useState('e1')
  return (
    <div>
       
      <form class="max-w-sm mx-auto">
        <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
        <select onChange={(e)=>setEarth(e.target.value)} id="countries" className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="e1">Choose Home {}</option>
          <option value="e1">Earth At 144p</option>
          <option value="e2">Earth At 320p</option>
          <option value="e3">Earth At 720p</option>
          <option value="home">Earth At 1080p</option>
        </select>

        <img src={`/images/${earth}.jpg`}></img>
      </form>
      

    </div>
  )
}

export default pallavi