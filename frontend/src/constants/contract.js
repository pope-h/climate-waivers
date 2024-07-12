import { ethers } from "ethers";
import abi from './abi.json'
import tokenAbi from './tokenABI.json'

export const getClimateContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        abi,
        providerOrSigner
    );

export const getTokenContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_TOKEN_ADDRESS,
        tokenAbi,
        providerOrSigner
    );