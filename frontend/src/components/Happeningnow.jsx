import Postcomponent from './Postcomponent'


const Happeningnow = () => {
  return (
    <div className='text-xl text-center border-b-2   pt-1 md:pt-5 '>
        <h2 className='pb-1 md:pb-3 text-lg md:text-xl border-gray-500 border-b-2 font-semibold '>Happening Now</h2>
        <Postcomponent  category="happening"/>
    </div>
  )
}

export default Happeningnow