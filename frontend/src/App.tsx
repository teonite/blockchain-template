import './App.css';

import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';

import GreeterArtifact from '../../artifacts/contracts/Greeter.sol/Greeter.json';
import { Greeter } from '../../typechain';
import logo from './logo.svg';

function App() {
  const [message, setMessage] = useState('');
  const [inputGreeting, setInputGreeting] = useState('');
  const [greeter, setGreeter] = useState<Greeter>();

  useEffect(() => {
    const doAsync = async () => {
      // initialize wallet connection
      const web3Modal = new Web3Modal({ providerOptions: {} });
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      setGreeter(
        new ethers.Contract(
          // '0x5fbdb2315678afecb367f032d93f642f64180aa3',
          '0xef29a00A3E6F32F896972C168ec8f6fE9Ffb1a16',
          GreeterArtifact.abi,
          signer
        ) as Greeter
      );
    };
    doAsync();
  }, []);

  useEffect(() => {
    const doAsync = async () => {
      if (!(greeter && (await greeter.deployed()))) return;
      console.log('Greeter is deployed at ', greeter.address);
      setMessage(await greeter.greet());
    };
    doAsync();
  }, [greeter]);

  const handleSetGreeting = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!(greeter && (await greeter.deployed())))
      throw Error('Greeter not ready');
    const tx = await greeter.setGreeting(inputGreeting);
    console.log('setGreeting tx', tx);
    await tx.wait();
    const _message = await greeter.greet();
    console.log('New greeting mined, result: ', _message);
    setMessage(_message);
    setInputGreeting('');
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
  );
}

export default App;
