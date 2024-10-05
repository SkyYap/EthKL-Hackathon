"use client"

import { SimpleNavigationMenu } from "@/components/nav";
import { Profile } from "@/components/Profile";
import React, { useState } from "react";

const Deposit = () => {
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");

  const handleDeposit = () => {
    console.log(`Depositing: ${depositAmount}`);
    setDepositAmount("");
  };

  const handleWithdraw = () => {
    console.log(`Withdrawing: ${withdrawAmount}`);
    setWithdrawAmount("");
  };

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
          <button
            onClick={handleDeposit}
            className="mt-4 px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 w-full"
          >
            Deposit
          </button>
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
          <button
            onClick={handleWithdraw}
            className="mt-4 px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 w-full"
          >
            Withdraw
          </button>
        </div>
      </div>
      <div>
        <Profile/>
      </div>
    </div>
  );
};

export default Deposit;
