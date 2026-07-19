import { useEffect, useState } from "react";

import {
  Link2,
  MousePointerClick,
  Activity,
  Trophy,
} from "lucide-react";

import StatsCard from "./StatsCard";
import { getDashboardStats } from "../../../services/dashboard.service";

function StatsSection() {
  const [stats, setStats] = useState({
    totalLinks: 0,
    totalClicks: 0,
    todayClicks: 0,
    topLink: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
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
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="h-32 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-32 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-32 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-32 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatsCard
        title="Total Links"
        value={stats.totalLinks}
        icon={<Link2 size={22} />}
      />

      <StatsCard
        title="Total Clicks"
        value={stats.totalClicks}
        icon={<MousePointerClick size={22} />}
      />

      <StatsCard
        title="Today's Clicks"
        value={stats.todayClicks}
        icon={<Activity size={22} />}
      />

      <StatsCard
        title="Top Link"
        value={
          stats.topLink
            ? `${stats.topLink.alias} (${stats.topLink.clicks})`
            : "-"
        }
        icon={<Trophy size={22} />}
      />

    </div>
  );
}

export default StatsSection;