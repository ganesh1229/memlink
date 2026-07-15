import { Link } from "react-router-dom";
import CreateCard from "./hero-card/CreateCard";

function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-slate-50 pt-36"
    >
      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-cyan-50"></div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6">

        <div className="grid w-full items-center gap-20 lg:grid-cols-5">

          {/* LEFT */}

          <div className="lg:col-span-2">

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Smart Link Management
            </span>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">

              Every Link.

              <br />

              Smarter.

            </h1>

            <p className="mt-8 text-xl leading-9 text-slate-600">

              Create memorable short links,

              generate QR codes,

              protect sensitive content,

              and understand every click—

              all from one beautiful workspace.

            </p>

            <div className="mt-12 flex gap-5">

              <Link
                to="/auth?mode=register"
                className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
              >
                Get Started
              </Link>

              <Link
                to="/auth?mode=login"
                className="rounded-2xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
              >
                Login
              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div className="lg:col-span-3">

            <CreateCard />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;