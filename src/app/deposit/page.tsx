"use client";

import { FormEvent, useState } from 'react';
import { useWaitForTransactionReceipt, useWriteContract, BaseError } from 'wagmi';
import { parseAbi } from 'viem';
import { ethers } from 'ethers';
import { parseEther } from 'ethers';
import { SimpleNavigationMenu } from '@/components/nav';
import { Profile } from '@/components/Profile';

export default function DepositWithdrawFunds() {
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState<string>(''); // State for withdrawal

  // Initialize the write contract hook for deposit
  const { data: depositHash, error: depositError, isPending: isDepositPending, writeContract: depositContract } = useWriteContract();

  // Initialize the write contract hook for withdrawal
  const { data: withdrawHash, error: withdrawError, isPending: isWithdrawPending, writeContract: withdrawContract } = useWriteContract();

  // Deposit Function
  async function deposit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    depositContract({
      address: '0x7cAc6ECaA934999ad40a9666d017f186788CDe6E',
      abi: parseAbi(['function depositMoney() payable']),  // Parse ABI for depositMoney
      functionName: 'depositMoney',
      value: parseEther(depositAmount),  // Set value for deposit
    });

    setDepositAmount('');  // Clear input after submission
  }

  // Withdraw Function
  async function withdraw(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    withdrawContract({
      address: '0x7cAc6ECaA934999ad40a9666d017f186788CDe6E',
      abi: parseAbi(['function withdrawMoney(uint256 amount)']),  // ABI for withdrawMoney
      functionName: 'withdrawMoney',
      args: [parseEther(withdrawAmount)],  // Pass withdrawal amount as argument
    });

    setWithdrawAmount('');  // Clear input after submission
  }

  // Wait for deposit confirmation
  const { isLoading: isConfirmingDeposit, isSuccess: isDepositConfirmed } =
    useWaitForTransactionReceipt({
      hash: depositHash,
    });

  // Wait for withdrawal confirmation
  const { isLoading: isConfirmingWithdraw, isSuccess: isWithdrawConfirmed } =
    useWaitForTransactionReceipt({
      hash: withdrawHash,
    });

  return (
    <div className="flex flex-col items-center justify-center h-screen container mx-auto p-4">
      <SimpleNavigationMenu />
      <div className="w-full max-w-4xl flex justify-between mt-8">
        {/* Deposit Column */}
        <div className="w-1/2 p-4 border-r border-gray-300">
          <h1 className="text-2xl font-bold mb-4">Deposit Funds</h1>
          <div className="mt-4">
            <label htmlFor="depositAmount" className="block text-lg">
              Amount to Deposit:
            </label>
            <input
              id="depositAmount"
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="mt-2 border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter deposit amount"
            />
          </div>
          <form onSubmit={deposit}>
            <button disabled={isDepositPending} type="submit" className="mt-4 px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 w-full">
              {isDepositPending ? 'Processing...' : 'Deposit'}
            </button>
          </form>
        </div>

        {/* Withdrawal Column */}
        <div className="w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-4">Withdraw Funds</h1>
          <div className="mt-4">
            <label htmlFor="withdrawAmount" className="block text-lg">
              Amount to Withdraw:
            </label>
            <input
              id="withdrawAmount"
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="mt-2 border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter withdrawal amount"
            />
          </div>
          <form onSubmit={withdraw}>
            <button disabled={isWithdrawPending} type="submit" className="mt-4 px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 w-full">
              {isWithdrawPending ? 'Processing...' : 'Withdraw'}
            </button>
          </form>
        </div>
      </div>

      {/* Display transaction details and errors */}
      <div className="mt-8">
        {depositHash && <div>Deposit Transaction Hash: {depositHash}</div>}
        {isConfirmingDeposit && 'Waiting for deposit confirmation...'}
        {isDepositConfirmed && 'Deposit transaction confirmed!'}
        {depositError && <div>Error: {(depositError as BaseError).shortMessage || depositError.message}</div>}

        {withdrawHash && <div>Withdraw Transaction Hash: {withdrawHash}</div>}
        {isConfirmingWithdraw && 'Waiting for withdrawal confirmation...'}
        {isWithdrawConfirmed && 'Withdrawal transaction confirmed!'}
        {withdrawError && <div>Error: {(withdrawError as BaseError).shortMessage || withdrawError.message}</div>}
      </div>

      <div style={{ display: 'none' }}>
        <Profile />
      </div>
    </div>
  );
}
