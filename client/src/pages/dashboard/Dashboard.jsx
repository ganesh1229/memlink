import StatsSection from "../../components/dashboard/overview/StatsSection";
import QuickActions from "../../components/dashboard/overview/QuickActions";
import RecentLinks from "../../components/dashboard/overview/RecentLinks";

function Dashboard() {
  return (
    <div className="space-y-10">

      <StatsSection />

      <QuickActions />

      <RecentLinks />

    </div>
  );
}

export default Dashboard;