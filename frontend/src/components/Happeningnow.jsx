import Postcomponent from './Postcomponent'


const Happeningnow = () => {
  return (
    <div className='text-2xl text-center border-b-2   pt-1 md:pt-5 '>
        <h2 className='text-left  border-b-2  p-2  font-semibold '>Happening Now</h2>
        <Postcomponent  category="happening"/>
    </div>
  )
}

export default Happeningnow