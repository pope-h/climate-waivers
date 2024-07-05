import Postcomponent from "./Postcomponent";

const Community = () => {
  return (
    <div className="text-2xl text-center  pt-1 md:pt-5 ">
      <h2 className="pb-1 md:pb-3 text-lg md:text-xl border-gray-500 border-b-2 font-semibold  ">
        Community
      </h2>
      {/* <div className='pb-1 md:pb-3 text-lg md:text-xl border-b-2 font-semibold'/> */}
      <Postcomponent category="community" />
    </div>
  );
};

export default Community;
