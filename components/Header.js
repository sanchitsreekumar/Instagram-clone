import Image from 'next/image'
import React from 'react'
import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
} from "@heroicons/react/outline";
import {HomeIcon} from '@heroicons/react/solid'
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import {modalState} from '../atoms/modalAtoms';
import {useRecoilState} from 'recoil'



function Header() {

    const {data : session} = useSession();
    const router = useRouter() //next js Router;

    const [modalOpen, setModalOpen] = useRecoilState(modalState);

    return (
        <div className='shadow-sm border-b bg-white sticky top-0 z-50'>
            <div className='flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto'>
                {/* Left */}
                <div 
                onClick={()=> router.push('/')}
                className='relative hidden lg:inline-grid w-24 cursor-pointer' >
                    {/* this image component is from Next js */}
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                        layout="fill"
                        objectFit='contain'
                    /> 
                </div>
                <div 
                 onClick={()=> router.push('/')}
                className='relative w-10 lg:hidden flex-shrink-0 cursor-pointer'>
                     <Image
                     src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-Emblem.png"
                        layout="fill"
                        objectFit='contain'
                    /> 
                </div>

                {/* Middle - search field*/}
                <div className='max-w-xs'>
                    <div className='relative mt-1 p-3 rounded-md'>
                        <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                            <SearchIcon
                                className="h-5 w-5 text-gray-500"
                            />
                        </div>
                        <input className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black' 
                        type="text" 
                        placeholder='Search' />
                    </div>
                </div>

                {/* Right */}
                <div className='flex items-center justify-end space-x-4'>
                    <HomeIcon
                     onClick={()=> router.push('/')}
                    className='navBtn'/>
                    <MenuIcon className='h-6 md:hidden cursor-pointer'/>

                   {session ? (
                       <>
                         <div className='relative navBtn'>
                         <PaperAirplaneIcon className="navBtn rotate-45"/>
                         <div className='absolute -top-2 -right-2 text-xs w-5 h-5 bg-red-500 
                         rounded-full flex items-center justify-center animate-pulse text-white'>3</div>
                         </div> 
     
                         <PlusCircleIcon onClick={()=> setModalOpen(true)} className="navBtn"/>
                         <UserGroupIcon className='navBtn'/>
                         <HeartIcon className='navBtn'/>
     
                         <img 
                         onClick={signOut}
                         className='h-10 w-10 rounded-full cursor-pointer'
                         src={session?.user?.image}/>
                         </>
                   ):(
                        <button onClick={signIn}>Sign in</button>
                   )}
                   

                </div>
                

            </div>

        </div>
    )
}

export default Header
