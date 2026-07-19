import { useEffect, useState } from "react";

import AnalyticsCard from "../../components/dashboard/analytics/AnalyticsCard";
import BrowserChart from "../../components/dashboard/analytics/BrowserChart";
import DeviceChart from "../../components/dashboard/analytics/DeviceChart";
import ReferrerTable from "../../components/dashboard/analytics/ReferrerTable";
import TopLinks from "../../components/dashboard/analytics/TopLinks";

import { getAnalytics } from "../../services/analytics.service";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await getAnalytics();
      setAnalytics(response.data);
    }catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } 
    finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold">
        Analytics
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <AnalyticsCard
        title="Total Links"
        value={analytics.overview.totalLinks}
        type="links"
      />

      <AnalyticsCard
        title="Total Clicks"
        value={analytics.overview.totalClicks}
        type="clicks"
      />

      <AnalyticsCard
        title="Today's Clicks"
        value={analytics.overview.todayClicks}
        type="today"
      />

      <AnalyticsCard
        title="Unique Visitors"
        value={analytics.overview.uniqueVisitors}
        type="visitors"
      />

      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        <TopLinks
          links={analytics.topLinks}
        />

        <ReferrerTable
          referrers={analytics.referrers}
        />

      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        <BrowserChart
          data={analytics.browsers}
        />

        <DeviceChart
          data={analytics.devices}
        />

      </div>

    </div>
  );
}

export default Analytics;