import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import OrdersTable from "@/components/orders/OrdersTable";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Top Header */}
      <Header />

      {/* Main Layout */}
      <div style={{ display: "flex" }}>
        {/* Left Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <main
          style={{
            flex: 1,
            marginLeft: "56px", // same width as sidebar
            padding: "24px",
            minHeight: "calc(100vh - 64px)", // adjust if header height is 64px
          }}
        >
          <OrdersTable />
        </main>
      </div>
    </div>
  );
}