import React from 'react'

const Footer = () => {
    return (
        <div className='bg-[#212529] text-white h-[20rem] flex justify-center items-center dark:text-[#212529] dark:bg-white'>
            <div className='w-4/5 flex flex-col justify-center'>
                <div className='flex justify-between p-1'>
                    <span className=''>Stories Blog</span>
                    <div className='flex gap-4 '>
                        <span>Fb</span>
                        <span>In</span>
                        <span>Tw</span>
                    </div>
                </div>
                <hr className='w-full self-center' />
                <div className='flex justify-between p-1'>
                    <span className=''>Iraq, Baghdad</span>
                    <span className=''>&copy; 2024, All Rights Reserved</span>
                </div>
            </div>
        </div>
    )
}

export default Footer