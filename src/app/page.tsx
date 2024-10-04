"use client";

import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import { verify } from "./actions/verify";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { SimpleNavigationMenu } from "@/components/nav";
import { Chart } from "@/components/chart";
import Wallet from "@/components/wallet";

export default function Home() {
  const router = useRouter();
  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
  const action = process.env.NEXT_PUBLIC_WLD_ACTION;
  const searchParams = useSearchParams(); // Use the useSearchParams hook
  const referralName = searchParams.get('referral'); // Get the referral name

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
        {isConnected ? (
          <div className="flex flex-col items-center">
            <SimpleNavigationMenu/>
            <Chart/>
            <Wallet/>
            {/* <p className="text-lg mb-2">Your nullifier hash:</p>
            <p className="font-bold">{nullifierHash}</p> */}
            <button
              className="border border-red-500 rounded-md my-2"
              onClick={handleDisconnect}
            >
              <div className="mx-3 my-1 text-red-500">Logout</div>
            </button>

          </div>
        ) : (
          <div>
            <div
          className='
          md:rounded-bl-none rounded-bl-xl border-l
          items-center justify-center flex flex-1 flex-col p-6 sm:p-8 '
          >
            <div className='flex flex-col items-center'>
              <p className='font-medium text-2xl'>You are referred by {referralName || 'Guest'}</p>
              <p className='text-lg mt-2'>Verify your identity to claim your RM5.</p>
              <p className='text-sm text-muted-foreground mt-2'>
              Connect and verify with World ID.
              </p>
            </div>
            <div className='mt-5 flex flex-col'>
              <IDKitWidget
                app_id={app_id}
                action={action}
                onSuccess={onSuccess}
                handleVerify={handleProof}
                // signal={address}
                verification_level={VerificationLevel.Device}
              >
                {({ open }) => (
                  <Button
                    // ref={buttonRef}
                    className='w-[290px] sm:w-[320px] '
                    onClick={open}
                  >Verify with World ID</Button>
                )}
              </IDKitWidget>
              {
                (
                  <>
                    <div className='relative py-4'>
                      <Separator
                        className='
                          mt-6 absolute inset-0 flex items-center
                        '
                      />
                      <div className='
                       relative flex justify-center text-xs uppercase
                      '>
                        <p className='
                          bg-background px-2 text-muted-foreground
                        '>
                          or
                        </p>
                      </div>
                    </div>
                    <Button
                    onClick={() => setOpen(true)}
                    variant="outline" className='
                    w-[290px] sm:w-[320px] 
                    rounded-lg'>
                      Verify with Wallet & World ID
                    </Button>
                  </>
                )
              }
              <Link
                href="https://apps.apple.com/no/app/world-app-worldcoin-wallet/id1560859847"
                target='_blank'
                rel='noopener noreferrer'
              >
                <p className='
                  text-muted-foreground text-xs mt-4 text-center
                '>
                  Get the WorldID App -&gt;
                </p>
              </Link>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
