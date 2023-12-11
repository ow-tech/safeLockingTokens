import { useEffect, useContext, useRef } from "react";
import Button from "../Button/Button";
import {ethers} from "ethers"
import Web3Context from "../../context/Web3Context";
import { toast } from "react-hot-toast";
const TokenApproval =() =>{

    const {stakeTokenContract,stakingContract}=useContext(Web3Context);
    const approvedTokenRef = useRef();
    const approveToken=async(e)=>{
        e.preventDefault();
        
        const amount = approvedTokenRef.current.value.trim();
        if(isNaN(amount) || amount<=0){
         console.error("Please enter a valid positive number");
         return;
        }
        const amountToSend = ethers.utils.parseUnits(amount,10).toString();
        
        try{
            
         const transaction = await stakeTokenContract.approve(stakingContract.address,amountToSend)
        
         await toast.promise(transaction.wait(),
       
         {
           loading: "Transaction is pending...",
           success: 'Transaction successful 👌',
           error: 'Transaction failed 🤯'
         });
         approvedTokenRef.current.value = "";
      
         } catch (error) {
           toast.error("Token Approval Failed");
           console.error(error.message)
         }
        }
    
return(
    <div>
        <form onSubmit={approveToken}>
            <label>Token Approval:</label>
            <input type="text" ref={approvedTokenRef}></input>
            <Button onClick={approveToken} type="submit" label="Token Approval" />
        </form>
    </div>
)

}

export default TokenApproval;