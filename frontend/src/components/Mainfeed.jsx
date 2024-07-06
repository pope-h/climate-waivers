import Postcomponent from './Postcomponent'

const Mainfeed = () => {
  return (
    <div className='text-2xl text-center pt-1 md:pt-5 '>
      {/* <h2 className='text-left p-2 border-gray-500  font-semibold '>Home</h2> */}
      <div className='pb-1 md:pb-3 text-lg md:text-xl border-b-2 border-gray-600 font-semibold'>Home</div>
      <Postcomponent />
    </div>
  )
}

export default Mainfeed