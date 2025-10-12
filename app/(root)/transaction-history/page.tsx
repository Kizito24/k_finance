import HeaderBox from "@/components/HeaderBox";
import { Pagination } from "@/components/Pagination";
import TransactionsTable from "@/components/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import React from "react";

const TransactionHistory = async (props: SearchParamProps) => {
   const searchParams = await props.searchParams; // ✅ must await
  const id = searchParams?.id;
  const page = searchParams?.page;
  
  const currentPage = Number(page as string) || 1;
  
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({
      userId: loggedIn.$id,
    });
  
    if (!accounts) return;
    // if (!loggedIn) redirect("/sign-in");
  
    const accountsData = (await accounts)?.data;
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  
    const account = await getAccount({ appwriteItemId });

    const rowsPerPage = 10;
    const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = account?.transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

    console.log(account?.transactions[0]);

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
        title="Transactions History"
        subtext="See your bank details and transactions"
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white ">{account?.data.name}</h2>
            <p className="text-14 text-blue-25">{account?.data.officialName}</p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white whitespace-nowrap ">
              ●●●● ●●●● ●●●● {account?.data.mask}
            </p>
          </div>
          <div className="transactions-account-balance">
            <p className="text-14">Current Balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(account?.data.currentBalance)}
            </p>
          </div>
        </div>
        <section className="flex w-full flex-col gap-6">
          <TransactionsTable 
          transactions={currentTransactions}
          />
          {totalPages > 1 && (
                        <div className="my-4 w-full">
                          <Pagination totalPages={totalPages} page={currentPage} />
                        </div>
                      )}
        </section>
      </div>
    </div>
  );
};

export default TransactionHistory;
