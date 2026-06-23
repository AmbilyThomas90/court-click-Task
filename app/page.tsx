import Sidebar from "@/components/layout/Sidebar";
import OrdersTable from "@/components/orders/OrdersTable";

export default function Home() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ marginLeft: 56, flex: 1, minHeight: "100vh" }}>
        <OrdersTable />
      </main>
    </div>
  );
}
