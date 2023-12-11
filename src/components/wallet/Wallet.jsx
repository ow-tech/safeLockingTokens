import React, { useState, useEffect } from "react";
import { connectWallet } from "../../utils/connectWallet";
import Web3Context from "../../context/Web3Context";
import Button from "../Button/Button";

import DisplayPannel from "../DisplayPannel/DisplayPannel";
import TokenApproval from "../StakeToken/TokenApproval";
import StakeAmount from "../stakeToken/StakeAmount";
import {StakingProvider} from "../../context/StakingContext";
function Wallet() {
  const [state, setState] = useState({
    provider: null,
    selectedAccount: null,
    stakingContract: null,
    stakeTokenContract: null,
    chainId: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleWallet = async () => {
    try {
      setIsLoading(true);
      const {
        provider,
        selectedAccount,
        stakingContract,
        stakeTokenContract,
        chainId,
      } = await connectWallet();

      setState({
        provider,
        selectedAccount,
        stakingContract,
        stakeTokenContract,
        chainId,
      });
    } catch (error) {
      console.log("Error Connecting to Wallet: ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {}, [state]);

  const connectLabel = state.selectedAccount
    ? state.selectedAccount
    : "Connect Wallet";

  const buttonStyle = {
    position: "absolute",
    top: "100px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "linear-gradient(to right, #512DA8, #311B92)",
  };
  return (
    <>
      <Web3Context.Provider value={state}>
        {isLoading && <p>Loading...</p>}
        <Button
          onClick={handleWallet}
          label={connectLabel}
          style={state.selectedAccount ? buttonStyle : null}
        />
        {state.selectedAccount && state.selectedAccount ? (
          <>
            <DisplayPannel />
            <StakingProvider>
              <TokenApproval />
              <StakeAmount />
            </StakingProvider>
          </>
        ) : null}
      </Web3Context.Provider>
    </>
  );
}

export default Wallet;
