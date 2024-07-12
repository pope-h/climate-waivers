import { useState, useEffect, createContext, useContext } from "react";
import Modal from "./Modal";
// import { ethers } from "ethers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const WalletContext = createContext();

export const useWallet = () => {
  return useContext(WalletContext);
};

const Wallet = () => {
  const { isConnected } = useWeb3ModalAccount()
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModal, setIsModal] = useState(true);

  // async function connectWallet() {
  //   if (!connected) {
  //     try {
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const accounts = await provider.send("eth_requestAccounts", []);
  //       const signer = provider.getSigner(accounts[0]);
  //       const _walletAddress = await signer.getAddress();
  //       setConnected(true);
  //       setWalletAddress(_walletAddress);
  //       localStorage.setItem("walletAddress", _walletAddress);
  //       setIsModal(false);
  //     } catch (error) {
  //       console.error("Error connecting wallet:", error);
  //     }
  //   } else {
  //     setConnected(false);
  //     setWalletAddress("");
  //     localStorage.removeItem("walletAddress");
  //     setIsModal(false);
  //   }
  // }

  // useEffect(() => {
  //   const savedAddress = localStorage.getItem("walletAddress");
  //   if (savedAddress) {
  //     connectWallet();
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);


  return (
    <>
      <div
        className="flex flex-row items-center "
        onClick={() => setIsModal(true)}
      >
        {isModal && (
          <Modal closeFn={() => setIsModal(false)}>
            <div className="flex flex-col text-base place-self-center">
              <h2 className="text-xl font-bold text-left">
                Welcome to DisaXta Wallet 👋🏽
              </h2>
              {isConnected ? (
                <p className="w-80 py-3 text-left">
                  Wallet address connected successfully. Jaiye lo jare
                </p>
              ) : (
                <p className="w-80 py-3 text-left">
                  Connect your digital wallet to support disaster relief
                  efforts! Your contribution can make a meaningful impact. Click
                  below to connect your wallet and donate and receive funds
                  securely.
                </p>
              )}
              {/* <button
                className="bg-linear px-4 py-2 rounded-lg text-base mb-2 text-white self-end"
                onClick={connectWallet}
              >
                {connected ? "Disconnect Wallet" : "Connect Wallet"}
              </button> */}
              <w3m-button />
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Wallet;
