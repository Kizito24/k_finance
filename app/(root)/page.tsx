import TotalBalanceBox from "@/components/TotalBalanceBox";
import HeaderBox from "@/components/HeaderBox";
import React from "react";
import RightSidebar from "@/components/RightSidebar";

const Home = () => {
  const loggedIn = {firstName:"Kizito", lastName: "CHZR", email: "kizitochiazor@gmail.com"};

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={8161250.36}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar user={loggedIn} transactions={[]} banks={[{ currentBalance : 657730.24 },{ currentBalance : 531730.24 }]} />
    </section>
  );
};

export default Home;
