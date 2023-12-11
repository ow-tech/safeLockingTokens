import { useState, useEffect, useContext } from "react";
import Web3Context from "../../context/Web3Context";
import { ethers } from "ethers";

const StakedTokens = () => {
  const { stakingContract, selectedAccount } = useContext(Web3Context);
  const [stakedAmount, setStakedAmount] =useState('0');

  
  useEffect(() => {
    console.log('stakingContract :', stakingContract.address)
    const fetchStakedBalance = async () => {
      try {
        const amountStaked = await stakingContract.staked(selectedAccount);        
        const amountStakedEth = ethers.utils.formatUnits(amountStaked.toString(),18)
        setStakedAmount(amountStakedEth)
        // console.log("amountStaked", amountStakedEth);
      } catch (error) {
        console.error("Error fetching StakedBalance Data :", error.message);
      }
    };
    stakingContract && fetchStakedBalance();
  }, [stakingContract, selectedAccount]);

  return (
    <p>Staked Amount: {stakedAmount}</p>
  )
};

export default StakedTokens;
