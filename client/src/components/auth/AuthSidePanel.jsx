import { Link2, QrCode, ShieldCheck, BarChart3 } from "lucide-react";

function AuthSidePanel() {
  const features = [
    {
      icon: Link2,
      title: "Custom Short Links",
      description: "Create memorable and shareable links."
    },
    {
      icon: QrCode,
      title: "QR Generation",
      description: "Generate QR codes instantly."
    },
    {
      icon: ShieldCheck,
      title: "Secure Sharing",
      description: "Password protection & expiration."
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Track every click with insights."
    },
  ];

  return (
    <div className="hidden lg:flex flex-col justify-center rounded-[32px] bg-gradient-to-br from-blue-600 to-blue-700 p-10 text-white">

      <div>

        <h2 className="text-5xl font-bold leading-tight">
          MemLink
        </h2>

        <p className="mt-6 text-lg leading-8 text-blue-100">
          A smarter way to create, protect and manage
          your links from one beautiful dashboard.
        </p>

      </div>

      <div className="mt-12 grid gap-4">

        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="flex items-start gap-4 rounded-2xl bg-white/10 p-4"
            >
              <div className="rounded-xl bg-white/20 p-3">
                <Icon size={22} />
              </div>

              <div>

                <h3 className="font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-1 text-sm text-blue-100">
                  {feature.description}
                </p>

              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}

export default AuthSidePanel;