import {
  Link2,
  MousePointerClick,
  Users,
  Activity,
} from "lucide-react";

const icons = {
  links: <Link2 size={24} />,
  clicks: <MousePointerClick size={24} />,
  visitors: <Users size={24} />,
  today: <Activity size={24} />,
};

function AnalyticsCard({
  title,
  value,
  type,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>
        </div>

        <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
          {icons[type]}
        </div>

      </div>

    </div>
  );
}

export default AnalyticsCard;