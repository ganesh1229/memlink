import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Can I create custom aliases?",
    answer:
      "Yes. You can create memorable custom aliases as long as they're available.",
  },
  {
    question: "Can I password protect my links?",
    answer:
      "Yes. Add an optional password so only authorized users can access your links.",
  },
  {
    question: "Can links expire automatically?",
    answer:
      "Yes. Set an expiration date and MemLink will disable the link automatically.",
  },
  {
    question: "Does MemLink provide analytics?",
    answer:
      "Yes. Track clicks, devices, browsers and other useful insights.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-white py-28">
      <div className="container-custom max-w-4xl">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-slate-600">
            Everything you need to know about MemLink.
          </p>

        </div>

        <div className="mt-14 space-y-5">

          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-3xl border border-slate-200"
            >

              <button
                onClick={() =>
                  setOpen(open === index ? -1 : index)
                }
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >

                <span className="font-semibold text-slate-900">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition ${
                    open === index ? "rotate-180" : ""
                  }`}
                />

              </button>

              {open === index && (
                <div className="border-t border-slate-200 px-6 py-5 text-slate-600">
                  {faq.answer}
                </div>
              )}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default FAQ;