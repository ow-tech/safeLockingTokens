import {ethers, Contract} from 'ethers';
import stakingAbi from "../ABI/stakingAbi.json";
import stakeTokenAbi from "../ABI/stakeTokenAbi.json"


export const connectWallet = async () =>{
    try{
        let [signer, provider,stakingContract,stakeTokenContract,chainId] =[null];
        if (window.ethereum ===null){
            throw new Error('Metamask is not installed');

        }
        const accounts = await window.ethereum.request({
            method:'eth_requestAccounts'
        })

        let chainIdHex = await window.ethereum.request({
            method: 'eth_chainId'
        })
        chainId =parseInt(chainIdHex,16)
        let selectedAccount = accounts[0]
        if(!selectedAccount){
            throw new Error("No ethereum accounts available")
        }

        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = await provider.getSigner()

        const stakingContractAddress ='0x78c9984Da24B219e61B625e85F301b8CF5cb8c36'
        // "0x89302285C515eB3F9c5dEA1921D98d9213813b78"
        // 0x64853c5Ec520b8e740508409A2fFeE55e8DD14A3
        // '0xc31BfA184D56C2b5EA61a42603A5E836A0900348'
        // '0xA9f5cDB0e5a4AAa7e3f89065D570FBA0f6b1fe9D'
        // '0xeeb82a4E715Be456C37660Bf3538bD4B6AebD980'
        const stakeTokenContractAddress ="0xFEBf7Cdf068A2b10F08137E9C3ba34B32b3Cf74A"
        // '0x723577D609095c18516227a1e538472aFd8F480B'

        stakingContract = new Contract(stakingContractAddress, stakingAbi,signer)
        stakeTokenContract = new Contract (stakeTokenContractAddress,stakeTokenAbi,signer)

        return{
            provider,
            selectedAccount,
            stakingContract,
            stakeTokenContract,
            chainId
        }


    }
    catch(error){
        console.log(error);
        throw error
    }
}