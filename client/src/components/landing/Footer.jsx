function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">

      <div className="container-custom flex flex-col items-center justify-between gap-6 py-10 md:flex-row">

        <div>

          <h3 className="text-2xl font-bold text-slate-900">
            MemLink
          </h3>

          <p className="mt-2 text-slate-500">
            Smart Link Management Platform
          </p>

        </div>

        <div className="flex gap-8 text-slate-600">

          <a href="#hero">Product</a>

          <a href="#features">Features</a>

          <a href="#faq">FAQ</a>

        </div>

        <p className="text-sm text-slate-500">
          © 2026 MemLink. All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;