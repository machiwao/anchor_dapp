import { useState, useEffect } from "react";

function App() {
  const [provider, setProvider] = useState(undefined);
  const [walletKey, setWalletKey] = useState(undefined);

  useEffect(() => {
    const provider = getProvider();
    if (provider) setProvider(provider);
    else setProvider(undefined);
  }, []);

  const connectWallet = async () => {
    const { solana } = window as any;

    if (solana) {
      try {
        const response = await solana.connect();
        console.log("wallet account ", response.publicKey.toString());
        setWalletKey(response.publicKey.toString());
      } catch (err) {
        console.log();
      }
    }
  };

  const disconnectWallet = async () => {
    const { solana } = window as any;

    if (walletKey && solana) {
      await solana.disconnect();
      setWalletKey(undefined);
    }
  };

  const getProvider = () => {
    if ("solana" in window) {
      const provider: any = window.solana;
      if (provider.isPhantom) return provider;
    }
  };
  const initialize =async () => {
    
  }
  const add =async () => {
    
  }
  const subtract =async () => {
    
  }
  const multiply =async () => {
    
  }
  const divide =async () => {
    
  }
  return (
    <>
      <button onClick={walletKey ? disconnectWallet : connectWallet}>
        {walletKey ? walletKey : "Connect Wallet"}
      </button>
      {walletKey ? <button>Initialize</button> : <></>}
      {walletKey ? <button>Add</button> : <></>}
      {walletKey ? <button>Subtract</button> : <></>}
      {walletKey ? <button>Multiply</button> : <></>}
      {walletKey ? <button>Divide</button> : <></>}
    </>
  );
}

export default App;