import StatsCard from "./StatsCard";

function StatsSection() {
  const stats = [
    {
      title: "Total Links",
      value: "0",
      subtitle: "Links created",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Total Clicks",
      value: "0",
      subtitle: "Across all links",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "QR Codes",
      value: "0",
      subtitle: "Generated",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Active Links",
      value: "0",
      subtitle: "Currently active",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold">
        Overview
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            {...stat}
          />
        ))}
      </div>
    </section>
  );
}

export default StatsSection;