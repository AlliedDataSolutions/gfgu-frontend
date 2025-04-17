import useTransaction from "../../common/hooks/useTransaction";
import TransactionTable from "../../common/components/TransactionTable";
import { useState } from "react";

export const AdminPayment = () => {
  const [skip, setSkip] = useState(0);
  const [take, _] = useState(10);
  const {
    data: transactions,
    count,
    loading,
    error,
  } = useTransaction("/admin/transaction", skip, take);

  const handlePageChange = (skip: number, _: number) => {
    setSkip(skip);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <TransactionTable
        transactions={transactions}
        count={count}
        onPageChange={handlePageChange}
        take={take}
      />
    </div>
  );
};
