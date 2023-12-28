import React from 'react'
import Image from 'next/image'
import logo from '@public/pokeplus.png'
import head from '@public/pika.png'

const Logo = () => {
      return (
            <div className="relative w-full m-auto">
                  <Image src={logo} height={250} width={250} alt="logo image" className=" m-auto py-6" />

                  <div className="absolute top-1/2 left-1/2 transform -translate-x-[5rem] -translate-y-[4rem]">
                        <Image src={head} height={150} width={150} alt="head image" />
                  </div>
            </div>
      )
}

export default Logo