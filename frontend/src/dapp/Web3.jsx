// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the license at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import { useState } from "react";

import { GraphQLProvider } from "./GraphQL";
import { Donates } from "./Donates";
import { Network } from "./Network";
import configFile from "./config.json";
//import "./App.css";
import { Balance } from "./Balance";
import {Input, Box, InputGroup, InputLeftAddon, Stack, SimpleGrid} from "@chakra-ui/react"


const config = configFile;

const injected = injectedModule();
init({
    wallets: [injected],
    chains: Object.entries(config).map(([k, v], i) => ({id: k, token: v.token, label: v.label, rpcUrl: v.rpcUrl})),
    appMetadata: {
        name: "DisaXta Wallet",
        icon: "<svg><svg/>",
        description: "Donate for effective disaster response and relief",
        recommendedInjectedWallets: [
            { name: "MetaMask", url: "https://metamask.io" },
        ],
    },
});

const Web3 = () => {
    const [dappAddress, setDappAddress] = useState("0xc9fb5A552619011Cf79659d5C862Bb7655b97E8C");

    return (
        <SimpleGrid columns={1} marginLeft={'25%'} marginRight={'25%'}>  
        <Network />
        <GraphQLProvider>
            <Stack>
                <Box alignItems='baseline' marginLeft='2' mt='0'>
                    
                <InputGroup size='xs'>
                <InputLeftAddon>
                    Dapp Address
                </InputLeftAddon> 
                <Input 
                    width='auto'
                    size='xs'
                    className="address-textbox"
                    type="text"
                    value={dappAddress}
                    onChange={(e) => setDappAddress(e.target.value)}
                />
                </ InputGroup >
                <br /><br />
                </Box>
            </Stack>
                <br />
                    <Balance />
                    <br /> <br />
                    <Donates dappAddress={dappAddress} />
                    <br /> <br />
            </GraphQLProvider>
        </SimpleGrid>
    );
};

export default Web3;