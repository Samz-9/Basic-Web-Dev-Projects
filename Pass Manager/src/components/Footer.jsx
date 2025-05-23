import React from 'react'

const Footer = () => {
  return (
    <footer className=' bg-gradient-to-b text-center from-[#F9D8A4] to-[#F2B8A0] p-2'>
            <div className="m-auto flex justify-center items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 24 24" fill="white" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/mail-unlock-01-solid-standard.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#000000">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.93229 2C2.31283 2 1 3.31283 1 4.93229V16.6615C1 18.2809 2.31283 19.5938 3.93229 19.5938H11.0031C11.5429 19.5938 11.9805 19.1561 11.9805 18.6163C11.9805 18.0765 11.5429 17.6389 11.0031 17.6389H3.93229C3.39247 17.6389 2.95486 17.2013 2.95486 16.6615V7.21804L10.5497 11.0154C11.3064 11.3938 12.1971 11.3938 12.9538 11.0154L20.5486 7.21804V9.11486C20.5486 9.65468 20.9862 10.0923 21.526 10.0923C22.0659 10.0923 22.5035 9.65468 22.5035 9.11486V4.93229C22.5035 3.31283 21.1906 2 19.5712 2H3.93229ZM17.0015 13.7969C17.0015 13.1065 17.5611 12.5469 18.2515 12.5469C18.7132 12.5469 19.1174 12.7968 19.3347 13.1724C19.5421 13.531 20.0009 13.6535 20.3594 13.4461C20.718 13.2387 20.8405 12.7799 20.6331 12.4213C20.1587 11.6013 19.2703 11.0469 18.2515 11.0469C16.7327 11.0469 15.5015 12.2781 15.5015 13.7969V14.5469H14.7515C14.3373 14.5469 14.0015 14.8827 14.0015 15.2969V20.7969C14.0015 21.2111 14.3373 21.5469 14.7515 21.5469H21.7515C22.1657 21.5469 22.5015 21.2111 22.5015 20.7969V15.2969C22.5015 14.8827 22.1657 14.5469 21.7515 14.5469H17.0015V13.7969Z" fill="#FF6F61"></path>
                </svg>
                <div className='font-bold font-serif text-base text-white'>
                    <span className= 'text-[#e3f8c2]'>&lt;Pass</span>
                    <span className='text-[#FF6F61]'> Manager/&gt;</span>
                </div>
            </div>
            <div className='m-auto text-sm text-gray-700'>Created By Ken</div>
    </footer>
  )
}

export default Footer