function StatsCard({
  title,
  value,
  subtitle,
  bgColor,
  textColor,
}) {
  return (
    <div
      className={`rounded-3xl ${bgColor} p-6 shadow-sm border border-slate-200`}
    >
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <h2
        className={`mt-3 text-4xl font-bold ${textColor}`}
      >
        {value}
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}

export default StatsCard;