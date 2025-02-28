"use client";
import { useWeb3 } from "./context/Web3Context";

const ConnectWallet = () => {
  const { account, connectWallet } = useWeb3();

  return (
    <div>
      {account ? (
        <p>Connected Metamask</p>
      ) : (
        <button onClick={connectWallet} className="px-4 py-2 bg-blue-600 text-white rounded">
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
