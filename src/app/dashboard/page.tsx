"use client";

import { useSearchParams } from "next/navigation";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const nullifierHash = searchParams.get("nullifier");

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      {nullifierHash ? (
        <p>Your nullifier hash is: {nullifierHash}</p>
      ) : (
        <p>No nullifier hash found.</p>
      )}
    </div>
  );
};

export default Dashboard;
