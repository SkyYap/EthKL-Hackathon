import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDisconnect } from 'wagmi';
import { IRelayPKP } from '@lit-protocol/types';

export default function Wallet() {

  return (
    <div className="container">
      <div className="details-card">
        <p>Ethereum Address: 0x085d2d1da864Af14e83be4F8e20B52a896E458dF </p>
        <p>Solana Address: sqLu45AvF1DrVJf6YJV7oxWPHhUyr2xbct2uz12Z387 </p>
        <p>Bitcoin Address: bc1qhl7g49r3ddlqqc27sj3ggnay7mevmvlruggtj6 </p>
        <p>Ton Address: UQDeV7UCVLmH_MQZFb5Q9YPzZ4Q3q18ufXcdi4Nk9q_F519G </p>
      </div>
      <div className="divider"></div>
    </div>
  );
}
