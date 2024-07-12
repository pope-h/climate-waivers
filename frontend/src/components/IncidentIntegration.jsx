import React, { useState } from "react";
import { Dialog, TextField, Text, Button, Flex } from "@radix-ui/themes";
// import { isSupportedChain } from "../utility";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getClimateContract } from "../constants/contract";
import { getProvider } from "../constants/providers";
import { toast } from "react-toastify";
import { ethers } from 'ethers'

const IncidentIntegration = () => {
    const [dataUrl, setDataUrl] = useState('')
    const [targetAmount, setTargetAmount] = useState(0)
    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();


    async function handleReport() {
        // if (!isSupportedChain(chainId)) return console.error("Wrong network");
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();
        const contract = getClimateContract(signer);
    
        try {
          const transaction = await contract.reportIncident(
            dataUrl,
            ethers.parseUnits(targetAmount, 18)
          );
          const receipt = await transaction.wait();
    
          if (receipt.status) {
            return toast.success("Incident report successful!", {
              position: "top-center",
            });
            
          } else {
            toast.error("Incident report  failed!", {
              position: "top-center",
            });
          }
        } catch (error) {
          toast.error("Incident report failed", {
            position: "top-center",
          });
          console.log(error);
        } finally {
          setDataUrl("")
          setTargetAmount(0)
        }
      }

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button> ... </Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Report Incident</Dialog.Title>
          <Dialog.Description size="2" mb="4">
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Incident URL
              </Text>
            <input type="text" placeholder="URL" className="border rounded-lg text-gray-400 py-2 w-[100%] outline-none px-4" onChange={(e) => setDataUrl(e.target.value)}/>
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Donation Target
              </Text>
              <input type="text" placeholder="Enter target amount" className="border rounded-lg text-gray-400 py-2 w-[100%] outline-none px-4" onChange={(e) => setTargetAmount(e.target.value)}/>
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleReport}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default IncidentIntegration;
