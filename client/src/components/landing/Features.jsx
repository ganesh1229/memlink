import {
  Link2,
  ShieldCheck,
  BarChart3,
  QrCode,
} from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Custom Short Links",
    description:
      "Create clean, memorable links with your own custom aliases.",
  },
  {
    icon: QrCode,
    title: "Instant QR Codes",
    description:
      "Generate QR codes for every link and share them anywhere.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Sharing",
    description:
      "Protect links using passwords and expiration dates.",
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    description:
      "Track clicks and understand how your links perform.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="bg-white py-28"
    >
      <div className="container-custom">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-slate-900">
            Everything you need
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            MemLink gives you everything required to
            create, manage and share smarter links.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                  <Icon
                    size={28}
                    className="text-blue-600"
                  />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Features;