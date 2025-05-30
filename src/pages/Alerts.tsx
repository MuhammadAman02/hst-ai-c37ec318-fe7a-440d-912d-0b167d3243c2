import { Layout } from "@/components/Layout";
import { AlertsPanel } from "@/components/AlertsPanel";

const Alerts = () => {
  console.log("Alerts page rendered");
  
  return (
    <Layout title="Risk Alerts" subtitle="Monitor and manage risk alerts">
      <div className="max-w-4xl">
        <AlertsPanel />
      </div>
    </Layout>
  );
};

export default Alerts;