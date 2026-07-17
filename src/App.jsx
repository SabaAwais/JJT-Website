import React, { useState } from "react";
import { Heart,  Users,  Building2,  GraduationCap,  ChevronRight,  CreditCard,  Smartphone,  Landmark,
  Check,  ShieldCheck,  ScrollText,  HandHeart,  RefreshCcw,  Users2,  Scale,  Sparkles,} from "lucide-react";
import logo from "./assets/jjt-logo.png";
import pic1 from "./assets/pic1.png";
import pic2 from "./assets/pic2.png";
import pic3 from "./assets/pic3.png";

// --- Rough data (would come from CMS/CRM in the real build) ---
const CAMPAIGNS = [
  {
    id: "orphan",
    title: "Orphan Care",
    blurb: "Support orphaned children with care and opportunities.",
    monthly: 7000,
    yearly: 84000,
    raised: 612000,
    goal: 1000000,
    image: pic1,
  },
  {
    id: "educate",
    title: "Educate a Child",
    blurb: "Fund one child's full education for a year.",
    monthly: 2000,
    yearly: 24000,
    raised: 340000,
    goal: 500000,
    image: pic2,
  },
  {
    id: "classroom",
    title: "Sponsor a Classroom",
    blurb: "Build a classroom for 40 out-of-school children.",
    monthly: 80000,
    yearly: 960000,
    raised: 480000,
    goal: 960000,
    image: pic3,
  },
];

const STATS = [
  { label: "Volunteers", value: "220+", icon: Users },
  { label: "Partners", value: "18", icon: Building2 },
  { label: "Students Supported", value: "2,300+", icon: GraduationCap },
];

const VALUES = [
  { label: "Integrity", icon: ShieldCheck },
  { label: "Accountability", icon: ScrollText },
  { label: "Respectful", icon: HandHeart },
  { label: "Resilience", icon: RefreshCcw },
  { label: "Collaboration", icon: Users2 },
  { label: "Equality", icon: Scale },
  { label: "Diversity", icon: Sparkles },
];

const donorTypes = ["Individual", "Corporate", "Sponsor", "Partner", "Alumni"];

function ProgressBar({ raised, goal }) {
  const pct = Math.min(100, Math.round((raised / goal) * 100));
  return (
    <div>
      <div className="flex justify-between text-xs text-neutral-500 mb-1">
        <span>Rs. {raised.toLocaleString()} raised</span>
        <span>
          {pct}% of Rs. {goal.toLocaleString()}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-neutral-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-teal-600 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// --- Donation flow (the actual deliverable) ---
function DonateFlow() {
  const [step, setStep] = useState(1);
  const [campaignId, setCampaignId] = useState(CAMPAIGNS[0].id);
  const [frequency, setFrequency] = useState("monthly");
  const [amount, setAmount] = useState(CAMPAIGNS[0].monthly);
  const [method, setMethod] = useState("card");
  const [donor, setDonor] = useState({ name: "", email: "", phone: "", type: "" });
  const [showDonorType, setShowDonorType] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const campaign = CAMPAIGNS.find((c) => c.id === campaignId);
  const steps = ["Campaign", "Your details", "Payment", "Done"];

  function handlePay(e) {
    e.preventDefault();
    setSubmitting(true);
    // Mock processing delay — this is where a real gateway call (JazzCash/EasyPaisa/Stripe) would go
    setTimeout(() => {
      setSubmitting(false);
      setStep(4);
    }, 1200);
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl border border-neutral-200 shadow-sm relative">
      {showDonorType && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Select Donor Type</h3>
            <div className="space-y-2">
              {donorTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setDonor({ ...donor, type });
                    setShowDonorType(false);
                    setStep(2);
                  }}
                  className="w-full text-left border rounded-lg px-4 py-3 hover:bg-teal-50"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step indicator */}
      <div className="flex items-center gap-2 px-6 pt-6">
        {steps.map((label, i) => {
          const n = i + 1;
          const active = step === n;
          const done = step > n;
          return (
            <React.Fragment key={label}>
              <div className="flex items-center gap-2">
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium
                  ${done ? "bg-teal-600 text-white" : active ? "bg-teal-100 text-teal-700 ring-2 ring-teal-600" : "bg-neutral-100 text-neutral-400"}`}
                >
                  {done ? <Check size={14} /> : n}
                </div>
                <span className={`text-xs hidden sm:block ${active ? "text-neutral-900 font-medium" : "text-neutral-400"}`}>
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-neutral-200" />}
            </React.Fragment>
          );
        })}
      </div>

      <div className="p-6">
        {/* Step 1: choose campaign + amount */}
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-neutral-900">Choose what you're supporting</h3>
            <div className="space-y-2">
              {CAMPAIGNS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setCampaignId(c.id);
                    setAmount(frequency === "monthly" ? c.monthly : c.yearly);
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition
                    ${campaignId === c.id ? "border-teal-600 bg-teal-50" : "border-neutral-200 hover:border-neutral-300"}`}
                >
                  <div className="font-medium text-neutral-900">{c.title}</div>
                  <div className="text-sm text-neutral-500">{c.blurb}</div>
                </button>
              ))}
            </div>

            <div>
              <div className="flex gap-2 mb-3">
                {["monthly", "yearly"].map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setFrequency(f);
                      setAmount(f === "monthly" ? campaign.monthly : campaign.yearly);
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm border
                      ${frequency === f ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-300 text-neutral-600"}`}
                  >
                    {f === "monthly" ? "Monthly" : "Yearly"}
                  </button>
                ))}
              </div>
              <label className="text-sm text-neutral-600">Amount (PKR)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              onClick={() => setShowDonorType(true)}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2.5 font-medium flex items-center justify-center gap-1"
            >
              Continue <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2: donor details */}
        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep(3);
            }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-neutral-900">Your details</h3>
            <div className="text-sm text-neutral-500">
              Donor Type: <span className="ml-2 font-medium text-neutral-900">{donor.type}</span>
            </div>
            <div>
              <label className="text-sm text-neutral-600">Full name</label>
              <input
                required
                value={donor.name}
                onChange={(e) => setDonor({ ...donor, name: e.target.value })}
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm text-neutral-600">Email</label>
              <input
                required
                type="email"
                value={donor.email}
                onChange={(e) => setDonor({ ...donor, email: e.target.value })}
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm text-neutral-600">Phone</label>
              <input
                required
                value={donor.phone}
                onChange={(e) => setDonor({ ...donor, phone: e.target.value })}
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="03XX-XXXXXXX"
              />
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setStep(1)} className="flex-1 rounded-lg border border-neutral-300 py-2.5 text-neutral-600">
                Back
              </button>
              <button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2.5 font-medium">
                Continue
              </button>
            </div>
          </form>
        )}

        {/* Step 3: payment method */}
        {step === 3 && (
          <form onSubmit={handlePay} className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900">Payment method</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "card", label: "Card", icon: CreditCard },
                { id: "jazzcash", label: "JazzCash/Easypaisa", icon: Smartphone },
                { id: "bank", label: "Bank Transfer", icon: Landmark },
              ].map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg border text-xs
                    ${method === m.id ? "border-teal-600 bg-teal-50 text-teal-700" : "border-neutral-200 text-neutral-500"}`}
                >
                  <m.icon size={18} />
                  {m.label}
                </button>
              ))}
            </div>

            {method === "card" && (
              <div className="space-y-3">
                <input placeholder="Card number" className="w-full rounded-lg border border-neutral-300 px-3 py-2" required />
                <div className="flex gap-3">
                  <input placeholder="MM/YY" className="w-1/2 rounded-lg border border-neutral-300 px-3 py-2" required />
                  <input placeholder="CVC" className="w-1/2 rounded-lg border border-neutral-300 px-3 py-2" required />
                </div>
              </div>
            )}
            {method === "jazzcash" && (
              <input placeholder="Mobile number" className="w-full rounded-lg border border-neutral-300 px-3 py-2" required />
            )}
            {method === "bank" && (
              <div className="text-sm bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-neutral-600">
                Samba Bank Ltd · Junior Jinnah Trust <br />
                A/C# 2000848908 · IBAN PK27SAMB0000002000848908 <br />
                Upload your transfer receipt on the next screen after sending.
              </div>
            )}

            <div className="bg-neutral-50 rounded-lg p-3 text-sm flex justify-between">
              <span className="text-neutral-500">You're donating</span>
              <span className="font-semibold text-neutral-900">
                Rs. {amount.toLocaleString()} ({frequency})
              </span>
            </div>

            <div className="flex gap-2">
              <button type="button" onClick={() => setStep(2)} className="flex-1 rounded-lg border border-neutral-300 py-2.5 text-neutral-600">
                Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white rounded-lg py-2.5 font-medium"
              >
                {submitting ? "Processing..." : `Donate Rs. ${amount.toLocaleString()}`}
              </button>
            </div>
          </form>
        )}

        {/* Step 4: confirmation */}
        {step === 4 && (
          <div className="text-center py-6 space-y-3">
            <div className="mx-auto h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
              <Check className="text-teal-700" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Thank you, {donor.name.split(" ")[0] || "friend"}!</h3>
            <p className="text-sm text-neutral-500">
              Your {frequency} donation of Rs. {amount.toLocaleString()} to {campaign.title} has been recorded. A
              receipt has been sent to {donor.email || "your email"}.
            </p>
            <button
              onClick={() => {
                setStep(1);
                setDonor({ name: "", email: "", phone: "", type: "" });
              }}
              className="text-teal-700 text-sm font-medium"
            >
              Make another donation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Nav bar, shared across pages ---
function NavBar({ page, goTo, goToDonate }) {
  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={() => goTo("home")} className="flex items-center">
          <img src={logo} alt="Junior Jinnah Trust" className="h-16 w-auto" />
        </button>
        <nav className="hidden md:flex gap-20 text-large text-neutral-700">
          <button
            onClick={() => goTo("about")}
            className={`hover:text-teal-700 ${page === "about" ? "text-teal-700 font-medium" : ""}`}
          >
            About
          </button>
          <button onClick={() => goTo("home")} className="hover:text-teal-700">
            What We Do
          </button>
          <button onClick={() => goTo("home")} className="hover:text-teal-700">
            News
          </button>
          <button onClick={() => goTo("home")} className="hover:text-teal-700">
            Get Involved
          </button>
        </nav>
        <button onClick={goToDonate} className="bg-teal-600 text-white text-sm px-4 py-2 rounded-lg font-medium">
          Donate Now
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-8 text-center text-sm text-neutral-500">
      Junior Jinnah Trust · Registered under Trust Act 1882 · Islamabad, Pakistan
    </footer>
  );
}

// --- About page: hero styled like the donate/home hero, + Values grid below ---
function AboutPage({ goToDonate }) {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div>
          <p className="text-teal-700 text-sm font-medium mb-2">Who we are</p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-neutral-900">
            Quality education for underserved communities across Pakistan.
          </h1>
          <p className="mt-4 text-neutral-600">
            Founded in 2014, Junior Jinnah Trust is a non-profit providing quality education to
            underserved populations, including orphans, child laborers, street children, and the
            underprivileged in Pakistan. With 20 campuses in Islamabad and Rawalpindi, JJT has
            graduated over 1,000 students and currently supports 1,750 — with 1,054 new students
            enrolled in 2023 alone. Beyond education, JJT supports communities with ration packs,
            cooked food, medical camps, water filtration, emergency response, uniform kits,
            employment opportunities, and other welfare initiatives.
          </p>
        </div>
      </section>

      {/* Values & Guiding Principles */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold mb-2">Our Values and Guiding Principles</h2>
        <p className="text-neutral-500 text-sm mb-6">
          Junior Jinnah Trust follows certain values and guiding principles in all its interventions and dealings.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {VALUES.map((v) => (
            <div key={v.label} className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
              <v.icon className="mx-auto mb-2 text-teal-600" size={22} />
              <div className="font-medium text-neutral-900 text-sm">{v.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// --- Home page: hero, campaigns, donate flow ---
function HomePage() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-teal-700 text-sm font-medium mb-3">Quality education for all</p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-neutral-900">
            Raising generations that bring positive change.
          </h1>
          <p className="mt-4 text-neutral-600">
            Since 2014, JJT has supported orphans, out-of-school children, and underprivileged
            communities across Pakistan with education, food, and humanitarian support.
          </p>
          <a href="#donate" className="inline-block mt-6 bg-teal-600 text-white px-5 py-2.5 rounded-lg font-medium">
            Support a child today
          </a>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-[#f5b400] rounded-xl p-5 text-center shadow-sm">
              <s.icon className="mx-auto mb-2 text-white" size={24} />
              <div className="font-bold text-white text-xl">{s.value}</div>
              <div className="text-sm text-white">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Campaigns */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold mb-5">Our Campaigns</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {CAMPAIGNS.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <img src={c.image} alt={c.title} className="w-full h-56 object-cover" />
              <div className="p-5 space-y-3">
                <h3 className="font-semibold text-neutral-900 text-lg">{c.title}</h3>
                <p className="text-sm text-neutral-500">{c.blurb}</p>
                <ProgressBar raised={c.raised} goal={c.goal} />
                <div className="text-sm text-neutral-600">
                  Rs. {c.monthly.toLocaleString()}/month
                  <br />
                  Rs. {c.yearly.toLocaleString()}/year
                </div>
                <a href="#donate" className="text-teal-700 text-sm font-medium inline-flex items-center gap-1">
                  Donate to this <ChevronRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Donate flow — the core deliverable */}
      <section id="donate" className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Donate Now</h2>
          <p className="text-neutral-500 mt-1">Pick a cause, enter your details, and pay online — no bank visit needed.</p>
        </div>
        <DonateFlow />
      </section>
    </div>
  );
}

export default function JJTSite() {
  const [page, setPage] = useState("home");

  // Used by nav links that just switch page (no scroll needed)
  function goTo(p) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // "Donate Now" needs to work from ANY page — including About, which has no #donate
  // section of its own. So: switch to home first, then scroll to #donate once it's mounted.
  function goToDonate() {
    if (page !== "home") {
      setPage("home");
      // wait a tick for HomePage (and its #donate section) to render, then scroll
      setTimeout(() => {
        document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <NavBar page={page} goTo={goTo} goToDonate={goToDonate} />
      {page === "about" ? <AboutPage goToDonate={goToDonate} /> : <HomePage />}
      <Footer />
    </div>
  );
}
