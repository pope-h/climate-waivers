import Communityselector from './Communityselector'
import Popularaccounts from './Popularaccounts'

const Rightsidebar = () => {
  return (
    <div className=' border-l-[1px] border-gray-500 hidden md:block pt-5 '>
        {/* Search btn */}
        <div className='  md:pl-6 '>
            <input className='bg-white bg-opacity-25 p-1 md:p-2 outline-[1px] w-[90%] focus:border-none focus:outline-none border-graydark rounded-full text-graydark ' type="text" placeholder='🔍Search' />
        </div>
        <Communityselector />
        <Popularaccounts />
    </div>
  )
}

export default Rightsidebar