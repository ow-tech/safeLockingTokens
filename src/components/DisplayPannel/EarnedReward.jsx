import {useState,useEffect, useContext} from 'react'
import Web3Context from '../../context/Web3Context';
import {ethers} from 'ethers';

const EarnedReward =() =>{

    const { stakingContract, selectedAccount } = useContext(Web3Context);
    const [rewardAmount, setRewardAmount] =useState('0');
  
    
    useEffect(() => {
      const fetchReward = async () => {
        try {
          const amountReward = await stakingContract.staked(selectedAccount);        
          const amountRewardEth = ethers.utils.formatUnits(amountReward.toString(),18)
          setRewardAmount(amountRewardEth)
          // console.log("amountStaked", amountStakedEth);
        } catch (error) {
          console.error("Error fetching Reward Data :", error.message);
        }
      };
      stakingContract && fetchReward();
    }, [stakingContract, selectedAccount]);
  
    return (
      <p>Reward Amount: {rewardAmount}</p>
    )

}

export default EarnedReward;