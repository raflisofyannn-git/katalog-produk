import type { OrderStatus } from "@/types/order";

interface Props {
  status: OrderStatus;
}

export default function OrderStatusBadge({
  status,
}: Props) {
  const styles: Record<OrderStatus, string> = {
    Pending:
      "bg-yellow-100 text-yellow-700",

    Ordered:
      "bg-blue-100 text-blue-700",

    Arrived:
      "bg-purple-100 text-purple-700",

    Completed:
      "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}