import {
  Link2,
  PencilLine,
  Share2,
} from "lucide-react";

const steps = [
  {
    icon: Link2,
    title: "Paste Your URL",
    description:
      "Enter any long URL you want to shorten or convert into a QR code.",
  },
  {
    icon: PencilLine,
    title: "Customize",
    description:
      "Choose your own alias, add password protection, or set an expiration date.",
  },
  {
    icon: Share2,
    title: "Share & Track",
    description:
      "Share your link anywhere and monitor every click through analytics.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-slate-50 py-28">
      <div className="container-custom">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-slate-900">
            How it works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Create and share smarter links in three simple steps.
          </p>

        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {index + 1}
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                  <Icon
                    size={30}
                    className="text-blue-600"
                  />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;