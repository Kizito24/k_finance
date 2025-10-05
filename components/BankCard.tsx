import Link from "next/link";
import React from "react";

const BankCard = ({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) => {
  return (
    <div className="flex flex-col">
      <Link href="/" className="bank-card">
      <div className="bank-card_content">
        <h1 className="text-16 font-semibold text-white">
            {account.name || "Tamara DNYFA"}
        </h1>
        <p className="font-ibm-plex-serif font-black text-white"></p>
      </div>
      </Link>
    </div>
  );
};

export default BankCard;
