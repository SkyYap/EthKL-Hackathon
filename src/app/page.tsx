"use client";

import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import { verify } from "./actions/verify";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
  const action = process.env.NEXT_PUBLIC_WLD_ACTION;

  if (!app_id) {
    throw new Error("app_id is not set in environment variables!");
  }
  if (!action) {
    throw new Error("action is not set in environment variables!");
  }

  const { setOpen } = useIDKit();
  const [isConnected, setIsConnected] = useState(false);
  const [nullifierHash, setNullifierHash] = useState<string | null>(null);

  const onSuccess = (result: ISuccessResult) => {
    setNullifierHash(result.nullifier_hash);
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setNullifierHash(null); 
  };

  const handleProof = async (result: ISuccessResult) => {
    console.log(
      "Proof received from IDKit, sending to backend:\n",
      JSON.stringify(result)
    );
    const data = await verify(result);
    if (data.success) {
      console.log("Successful response from backend:\n", JSON.stringify(data)); // Log the response from our backend for visibility
    } else {
      throw new Error(`Verification failed: ${data.detail}`);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center align-middle h-screen">
        <p className="text-2xl mb-5">World ID Cloud Template</p>

        {isConnected ? (
          <div className="flex flex-col items-center">
            <p className="text-lg mb-2">Your nullifier hash:</p>
            <p className="font-bold">{nullifierHash}</p>
            <button
              className="border border-red-500 rounded-md my-2"
              onClick={handleDisconnect}
            >
              <div className="mx-3 my-1 text-red-500">Disconnect</div>
            </button>
          </div>
        ) : (
          <div>
            <IDKitWidget
              action={action}
              app_id={app_id}
              onSuccess={onSuccess}
              handleVerify={handleProof}
              verification_level={VerificationLevel.Device}
            />
            <button
              className="border border-black rounded-md my-2"
              onClick={() => setOpen(true)}
            >
              <div className="mx-3 my-1">Verify with World ID</div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
