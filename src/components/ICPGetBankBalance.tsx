// import './App.css';
// import motokoLogo from './assets/motoko_moving.png';
// import motokoShadowLogo from './assets/motoko_shadow.png';
// import reactLogo from './assets/react.svg';
// import viteLogo from './assets/vite.svg';
import { useQueryCall } from '@ic-reactor/react';

function App() {
  // Call getBankBalance from the contract
  const { data: bankBalance, call: refetchBankBalance } = useQueryCall({
    functionName: 'getBankBalance',
    onSuccess: (result) => {
      console.log('Bank balance fetched successfully:', result);
    },
    onError: (error) => {
      console.error('Error fetching bank balance:', error);
    },
  });

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a
          href="https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/"
          target="_blank"
        >
        </a>
      </div>
      <h1>Vite + React + Solidity Bank</h1>
      <div className="card">
        <button onClick={refetchBankBalance}>
          Bank Balance is {bankBalance?.toString() ?? 'loading...'}
        </button>
        <p>
          Edit <code>backend/Bank.sol</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite, React, and Solidity logos to learn more
      </p>
    </div>
  );
}

export default App;
