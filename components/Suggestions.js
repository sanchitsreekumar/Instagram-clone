import {data}  from '../profile';

// console.log(data.slice(0,5))

function Suggestions() {
    return (
        <div className='mt-4 ml-10'>
            <div className='flex justify-between text-sm mb-5'>
                <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
                <button className='text-gray-600 font-semibold'>See all</button>
            </div>
            {data.slice(0,5).map((data)=>(
                <div key={data.id} className="flex items-center justify-between mt-3">
                    <img 
                    className='w-10 h-10 rounded-full border p-[2px]'
                    src={data.src} alt="" />
                    <div className='flex-1 ml-4'>
                        <h2 className='font-semibold text-sm'>{data.username}</h2>
                        <h3 className='text-xs text-gray-400'>{data.email}</h3>
                    </div>
                    <button className='text-blue-400 text-xs font-bold'>Follow</button>
                </div>
            ))}
        </div>
    )
}

export default Suggestions
