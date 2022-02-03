import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import logo from './logo.svg'
import './App.css'
import { Greeter } from '../../typechain'
import GreeterArtifact from  '../../artifacts/contracts/Greeter.sol/Greeter.json'

function App() {
  const [message, setMessage] = useState("");
  const [inputGreeting, setInputGreeting] = useState("");

  // TODO: use web3modal to initialize provider
  window.ethereum.enable();
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer = provider.getSigner(0);
  let greeter = new ethers.Contract('0x5fbdb2315678afecb367f032d93f642f64180aa3', GreeterArtifact["abi"], signer) as Greeter;

  useEffect(() => {
    const doAsync = async () => {
      if (!await greeter.deployed()) return;
      console.log("Greeter is deployed at ", greeter.address);
      setMessage(await greeter.greet());
    };
    doAsync();
  }, [greeter]);

  const handleSetGreeting = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!await greeter.deployed()) throw Error("Greeter not deployed");
      greeter.setGreeting
      const tx = await greeter.setGreeting(inputGreeting);
      console.log("setGreeting tx", tx);
      await tx.wait();
      const _message = await greeter.greet();
      console.log("New greeting mined, result: ", _message);
      setMessage(_message);
      setInputGreeting("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{message}</p>
        <input
          value={inputGreeting}
          onChange={(e) => setInputGreeting(e.target.value)}
        ></input>
        <p>
          <button onClick={(e) => handleSetGreeting(e)}>Set greeting</button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
