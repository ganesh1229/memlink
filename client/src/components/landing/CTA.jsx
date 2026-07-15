import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="bg-slate-50 py-28">

      <div className="container-custom">

        <div className="rounded-[40px] bg-blue-600 px-12 py-20 text-center text-white shadow-xl">

          <h2 className="text-5xl font-bold">
            Ready to simplify your links?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            Join MemLink and start creating smarter links in seconds.
          </p>

          <Link
            to="/auth?mode=register"
            className="mt-10 inline-block rounded-2xl bg-white px-8 py-4 font-semibold text-blue-600 transition hover:scale-105"
          >
            Get Started
          </Link>

        </div>

      </div>

    </section>
  );
}

export default CTA;