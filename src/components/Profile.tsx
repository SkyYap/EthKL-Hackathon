import { SendTransaction } from "../app/contract-interaction/sendTransaction";
import { SwitchChain } from "../app/contract-interaction/switchNetwork";
import { Balance } from "../app/contract-interaction/balance";
import { WriteContract } from "../app/contract-interaction/writeContract";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function Profile() {
    const { address, connector, isConnected } = useAccount();
    const { connect, connectors, error } = useConnect();
    const { disconnect } = useDisconnect();
  
    if (isConnected) {
      return (
        <div className="main">
          <div className="title">Connected to World ID</div>
          <div>{address}</div>
          <button className="card" onClick={disconnect as any}>
            Disconnect
          </button>
          {/* <SendTransaction /> */}
          <Balance />
          {/* <WriteContract /> */}
          <SwitchChain />
        </div>
      );
    } else {
      return (
        <div className="main">
          {connectors.map((connector) => {
            return (
              <button className="card" key={connector.id} onClick={() => connect({ connector })}>
                {connector.name}
              </button>
            );
          })}
          {error && <div>{error.message}</div>}
        </div>
      );
    }
  }