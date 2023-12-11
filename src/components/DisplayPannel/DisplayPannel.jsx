import {useState,useEffect, useContext} from 'react'
import Web3Context from '../../context/Web3Context';
import {ethers} from 'ethers';
import EarnedReward from './EarnedReward';
import StakedTokens from './StakedTokens';

const DisplayPannel =() =>{

    return(
        <div>
            <StakedTokens/>
            <EarnedReward/>
        </div>
    )

}

export default DisplayPannel;