const Donate = (post) => {
  return (
    <>
    <div className="flex flex-col max-md:w-[70vw]">
      <h2 className="text-left mb-2"> Donation</h2>
      <div className="flex flex-row text-[#340178]">
        <div className="border-[1.5px] mx-2 border-gray-400 px-4 py-.1 ">{""}$50</div>
        <div className="border-[1.5px] mx-2 border-gray-400 px-3 py-1">{""}$100</div>
        <div className="border-[1.5px] mx-2 border-gray-400 px-3 py-1">{""}$200</div>
        <div className="border-[1.5px] mx-2 border-gray-400 px-3 py-1">{""}$500</div>
      </div>
      <div className="my-5">
        <input
          id="amount"
          placeholder=" Enter amount"
          type="number"
          className="border-[1.5px] text-black border-gray-400 h-[55px]  focus:outline outline-1 outline-gray-400"
        ></input>{" "}
      </div>
      <button
        className="w-[40%] py-2 bg-linear text-white rounded-lg cursor-pointer z-10"
        type="submit"
      >
        Donate
      </button>
    </div>
    </>
  );
};

export default Donate;
