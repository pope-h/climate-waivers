import React from "react";

const Funds = () => {
  const dataInfo = [
    {
      id: 1,
      image: 'https://img.freepik.com/free-photo/happy-woman-with-short-hair_1308-171290.jpg?size=626&ext=jpg&ga=GA1.1.663094344.1720174275&semt=sph',
      name: 'Haitians'
    },
    {
      id: 2,
      image: 'https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?size=626&ext=jpg&ga=GA1.2.663094344.1720174275&semt=sph',
      name: 'Evans'
    },
    {
      id: 3,
      image: 'https://img.freepik.com/free-vector/animated-female-face-with-brown-hair_1308-171070.jpg?size=626&ext=jpg&ga=GA1.2.663094344.1720174275&semt=sph',
      name: 'Gabriela'
    },
    {
      id: 4,
      image: 'https://img.freepik.com/free-vector/hand-drawn-people-with-dreadlocks-illustration_23-2149752847.jpg?size=626&ext=jpg&ga=GA1.2.663094344.1720174275&semt=sph',
      name: 'SoS Global'
    },
    {
      id: 5,
      image: 'https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833546.jpg?size=626&ext=jpg&ga=GA1.2.663094344.1720174275&semt=sph',
      name: 'Childfare'
    }
  ]

  return (
    <main className="p-8">
      <h2 className="text-[25px] font-[700] my-4">Donation History</h2>
      <section className="bg-gradient-to-r from-[#340178] to-[#450F67] via-[#4C0D74] rounded-lg py-2 px-6 mb-8">
        <h3 className="text-[21px] my-4 font-[700]">Beneficiaries</h3>
        <div className="flex">
          {dataInfo.map((info) =>(<div key={info.id} className="px-4">
            <img
              src={info.image}
              alt=""
              className="w-[60px] h-[60px] rounded-full"
            />
            <p className="text-center mt-2 text-[15px]">{info.name}</p>
          </div>))}
        </div>
      </section>
      <section className="bg-gradient-to-r from-[#340178] to-[#450F67] via-[#4C0D74] rounded-lg py-2 px-6">
        <h3 className="text-[21px] my-4 font-[700]">Recent Transactions</h3>
        <table className="w-[100%]"> 
          <thead>
            <tr>
              <td className="text-white py-6">Photos</td>
              <td className="text-white">Username</td>
              <td className="text-white">Date</td>
              <td className="text-white">Status</td>
              <td className="text-white">Amount</td>
              <td className="text-white">Action</td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="text-white"><img src="https://img.freepik.com/free-photo/portrait-beautiful-girl-yellow-coat-with-backpack_1142-55171.jpg?t=st=1720751388~exp=1720754988~hmac=0b252e2053a1ec9bb9c49320b3d4944483e2542fe676d0b6430fdb983298f61b&w=1380" alt="" 
              className="w-[40px] h-[40px] rounded-lg" /></td>
              <td className="text-white">Desmond</td>
              <td className="text-white">2024</td>
              <td className="text-white">Pending</td>
              <td className="text-white">20DSX</td>
              <td className="text-white">Details</td>
            </tr>

  
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Funds;
