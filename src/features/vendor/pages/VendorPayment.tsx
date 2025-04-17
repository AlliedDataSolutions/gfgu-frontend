import useTransaction from "../../common/hooks/useTransaction";
import TransactionTable from "../../common/components/TransactionTable";
import { useState } from "react";

export function VendorPayment() {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const {
    data: transactions,
    count,
    loading,
    error,
  } = useTransaction("/payment/vendor-transaction", skip, take);

  const handlePageChange = (skip: number, take: number) => {
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
      <h1 className="text-2xl font-bold mb-4">Vendor Payment</h1>
      <TransactionTable transactions={transactions} count={count} onPageChange={handlePageChange} take={take} />
    </div>
  );
}
