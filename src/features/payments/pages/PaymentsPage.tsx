import { useEffect } from "react";
import PaginatedTable from "../../../components/PaginatedTable/PaginatedTable";
import type { Column } from "../../../components/types";
import { loadPaymentTransactions } from "../services/loadPaymentTransactions";
import { usePaymentStore } from "../hooks/usePaymentStore";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";

const PaymentsPage = () => {
  const transactions = usePaymentStore((s) => s.transactions);
  const setTransactions = usePaymentStore((s) => s.setTransactions);

  const columns: Column<any>[] = [
    {
      header: "No.",
      accessor: "id",
    },
    {
      header: "Course Name",
      accessor: "courseName",
      className: "w-[400px]",
    },
    {
      header: "Amount",
      accessor: "amount",
    },
    {
      header: "Reference Number",
      accessor: "referenceNumber",
    },
    {
      header: "Date",
      accessor: "createdDateTime",
      render: (row) => new Intl.DateTimeFormat("en-US").format(row.date),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadPaymentTransactions();
      if (data) {
        setTransactions(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-full flex flex-col flex-grow">
      <div className="flex items-center gap-4">
        <h3 className="pl-2">Payments</h3>
      </div>
      {transactions ? (
        <div className="mt-4">
          <PaginatedTable columns={columns} data={transactions || []} />
        </div>
      ) : (
        <div className="w-full h-full grid place-items-center text-[var(--text-tertiary)] pb-50">
          <div className="flex flex-col gap-2 items-center justify-center">
            <ArchiveBoxIcon width={100} height={100} />
            <h5>No Transactions Found!</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
