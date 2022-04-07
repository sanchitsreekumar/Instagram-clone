import { useSession } from 'next-auth/react';
import {data} from '../profile';
import Story from './Story';

function Stories() {

    const {data: session} = useSession();

    return (
        <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm
        overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>

            {session && (
                <div className="relative">
                <Story img={session.user.image}
                username={session.user.username}/>
                <div className='absolute bottom-4 -right-1 text-xs w-5 h-5 bg-blue-500 
                         rounded-full flex items-center justify-center text-white 
                         hover:scale-110 tranisiton transform duration-200 ease-out
                         cursor-pointer origin-center'>+</div>
                </div>
            )}

            
            {data.map((data)=>(
                <Story 
                    key={data.id}
                    img={data.src}
                    username={data.username}
                />
            ))}

        </div>
    )
}

export default Stories
