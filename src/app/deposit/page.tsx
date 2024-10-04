"use client"

import { SimpleNavigationMenu } from "@/components/nav";
import React, { useState } from "react";

const Deposit = () => {
  const [amount, setAmount] = useState<string>("");

  const handleDeposit = () => {
    console.log(`Depositing: ${amount}`);
    setAmount("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen container mx-auto p-4">
      <SimpleNavigationMenu />
      <h1 className="text-2xl font-bold mb-4">Deposit Funds</h1>
      <div className="mt-4">
        <label htmlFor="amount" className="block text-lg">
          Amount to Deposit:
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-2 border border-gray-300 rounded-md p-2"
          placeholder="Enter amount"
        />
      </div>
      <button
        onClick={handleDeposit}
        className="mt-4 px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
      >
        Deposit
      </button>
    </div>
  );
};

export default Deposit;
