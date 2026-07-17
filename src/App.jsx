import React, { useState } from "react";
import {
  Heart,
  Users,
  Building2,
  GraduationCap,
  ChevronRight,
  CreditCard,
  Smartphone,
  Check,
  ShieldCheck,
  ScrollText,
  HandHeart,
  RefreshCcw,
  Users2,
  Scale,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

import logo from "./assets/jjt-logo.png";
import pic1 from "./assets/pic1.png";
import pic2 from "./assets/pic2.png";
import pic3 from "./assets/pic3.png";

/* ---------------- DATA ---------------- */

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

const donorTypes = [
  "Individual",
  "Corporate",
  "Sponsor",
  "Partner",
  "Alumni",
];

const PROGRAMS = [
  "CHILD DEVELOPMENT CENTERS (CDC) PROJECT – BURMA ISB (2016)",
  "MONTESSORI & PRIMARY SCHOOLS PROJECT – BURMA ISB (2017)",
  "MONTESSORI & PRIMARY SCHOOLS PROJECT – DHERI RWP (2018)",
];

const BUILDINGS = [
  "PURPOSE BUILT SCHOOL PROJECT – BURMA ISB (2019)",
];

/* ---------------- Progress Bar ---------------- */

function ProgressBar({ raised, goal }) {
  const pct = Math.min(100, Math.round((raised / goal) * 100));

  return (
    <div>
      <div className="flex justify-between text-xs text-neutral-500 mb-1">
        <span>Rs. {raised.toLocaleString()} raised</span>
        <span>{pct}%</span>
      </div>

      <div className="h-2 rounded-full bg-neutral-200 overflow-hidden">
        <div
          className="bg-teal-600 h-full"
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
                { id: "jazzcash", label: "JazzCash/Easypaisa", icon: Smartphone }
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (destination) => {
    goTo(destination);
    setMobileOpen(false);
  };

  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-50">

      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        <button
          onClick={() => handleNav("home")}
          className="flex items-center"
        >
          <img
            src={logo}
            alt="Junior Jinnah Trust"
            className="h-16"
          />
        </button>

        <nav className="hidden md:flex gap-14 text-lg">

          <button
            onClick={() => handleNav("home")}
            className={page==="home"?"text-teal-700 font-semibold":"hover:text-teal-700"}
          >
            Home
          </button>

          <button
            onClick={() => handleNav("what")}
            className={page==="what"?"text-teal-700 font-semibold":"hover:text-teal-700"}
          >
            What We Do
          </button>

          <button
            onClick={() => handleNav("home")}
            className={page==="home"?"text-teal-700 font-semibold":"hover:text-teal-700"}
          >
            Home
          </button>

        </nav>

        <div className="flex gap-3 items-center">

          <button
            onClick={goToDonate}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg"
          >
            Donate Now
          </button>

          <button
            onClick={()=>setMobileOpen(!mobileOpen)}
            className="md:hidden"
          >
            {mobileOpen ? <X/> : <Menu/>}
          </button>

        </div>

      </div>

      {mobileOpen && (
        <div className="md:hidden border-t">

          <button
            onClick={()=>handleNav("home")}
            className="block w-full text-left px-6 py-4"
          >
            Home
          </button>

          <button
            onClick={()=>handleNav("what")}
            className="block w-full text-left px-6 py-4"
          >
            What We Do
          </button>

          <button
            onClick={()=>handleNav("home")}
            className="block w-full text-left px-6 py-4"
          >
            Home
          </button>

        </div>
      )}

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

// --- Home page: hero styled like the donate/home hero, + Values grid below ---
function HomePage({ goToDonate }) {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div>
          <p className="text-teal-700 text-sm font-medium mb-2">About Us</p>
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
function WhatWeDoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-14 space-y-16">

      <section>

        <p className="text-teal-700 font-medium">
          What We Do
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Building Futures Through Education
        </h1>

        <p className="mt-5 text-neutral-600 max-w-3xl">
          Junior Jinnah Trust provides quality education,
          orphan support and welfare projects across Pakistan.
        </p>

      </section>

      <section>

        <h2 className="text-2xl font-bold mb-6">
          Our Centres Within Pakistan
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl border p-6">

            <h3 className="font-bold text-lg mb-4">
              Islamabad Zone
            </h3>

            <ul className="space-y-2 text-neutral-600">

              <li>• Burma Town</li>
              <li>• Khanna Daak</li>
              <li>• Pindoriyan</li>
              <li>• Jhang Syedan</li>
              <li>• Bhara Kahu</li>
              <li>• G-8</li>
              <li>• Jabba Taili</li>
              <li>• Waheedabad</li>
              <li>• Sohan Garden</li>
              <li>• Shareefabad</li>

            </ul>

          </div>

          <div className="bg-white rounded-xl border p-6">

            <h3 className="font-bold text-lg mb-4">
              Rawalpindi Zone
            </h3>

            <ul className="space-y-2 text-neutral-600">

              <li>• Dheri Hassanabad</li>
              <li>• Gujar Khan</li>

            </ul>

          </div>

        </div>

      </section>  

      <section>

        <h2 className="text-2xl font-bold mb-6">
          Orphan Support Programs
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {PROGRAMS.map(program=>(
            <div
              key={program}
              className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <div className="bg-teal-100 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <Heart className="text-teal-600"/>
              </div>

              <h3 className="font-semibold">
                {program}
              </h3>
            </div>
          ))}

        </div>

      </section>

      <section>

        <h2 className="text-2xl font-bold mb-6">
          Purpose Built School Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {BUILDINGS.map(project=>(
            <div
              key={project}
              className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <div className="bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <Building2 className="text-yellow-600"/>
              </div>

              <h3 className="font-semibold">
                {project}
              </h3>

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

      {/* ---------------- HERO ---------------- */}

      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">

        <div>

          <p className="text-teal-700 font-medium mb-3">
            Quality Education For All
          </p>

          <h1 className="text-5xl font-bold leading-tight text-neutral-900">
            Raising Generations That Bring Positive Change.
          </h1>

          <p className="mt-6 text-lg text-neutral-600">
            Since 2014, Junior Jinnah Trust has been empowering
            underserved communities through education, orphan
            support, humanitarian assistance and sustainable
            development projects across Pakistan.
          </p>

          <a
            href="#donate"
            className="inline-flex items-center mt-8 bg-teal-600 hover:bg-teal-700 transition text-white px-6 py-3 rounded-lg font-medium"
          >
            Support A Child Today
          </a>

        </div>

        <div className="grid grid-cols-3 gap-4">

          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-[#f5b400] rounded-xl p-6 text-center shadow"
            >
              <s.icon
                size={28}
                className="mx-auto text-white mb-3"
              />

              <div className="text-2xl font-bold text-white">
                {s.value}
              </div>

              <div className="text-white text-sm">
                {s.label}
              </div>

            </div>
          ))}

        </div>

      </section>

      {/* ---------------- CAMPAIGNS ---------------- */}

      <section className="max-w-6xl mx-auto px-4 py-14">

        <div className="text-center mb-10">

          <h2 className="text-3xl font-bold">
            Our Campaigns
          </h2>

          <p className="text-neutral-500 mt-2">
            Every contribution creates opportunities for children.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {CAMPAIGNS.map((c) => (

            <div
              key={c.id}
              className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl transition"
            >

              <img
                src={c.image}
                alt={c.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">

                <h3 className="text-xl font-semibold">
                  {c.title}
                </h3>

                <p className="mt-2 text-neutral-500">
                  {c.blurb}
                </p>

                <div className="mt-5">
                  <ProgressBar
                    raised={c.raised}
                    goal={c.goal}
                  />
                </div>

                <div className="mt-5 text-sm text-neutral-700">

                  <div>
                    Monthly:
                    <span className="font-semibold ml-1">
                      Rs. {c.monthly.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    Yearly:
                    <span className="font-semibold ml-1">
                      Rs. {c.yearly.toLocaleString()}
                    </span>
                  </div>

                </div>

                <a
                  href="#donate"
                  className="inline-flex items-center gap-1 mt-5 text-teal-700 font-medium"
                >
                  Donate To This Campaign
                  <ChevronRight size={16}/>
                </a>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ---------------- WHY SUPPORT JJT ---------------- */}

      <section className="bg-white py-16">

        <div className="max-w-6xl mx-auto px-4">

          <div className="text-center mb-12">

            <h2 className="text-3xl font-bold">
              Why Support Junior Jinnah Trust?
            </h2>

            <p className="mt-3 text-neutral-500">
              Every donation directly impacts children's lives.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="border rounded-xl p-8 text-center">

              <GraduationCap
                className="mx-auto text-teal-600 mb-5"
                size={40}
              />

              <h3 className="font-semibold text-lg">
                Education
              </h3>

              <p className="mt-3 text-neutral-500">
                Providing quality education to children who otherwise
                would not have access to schools.
              </p>

            </div>

            <div className="border rounded-xl p-8 text-center">

              <Heart
                className="mx-auto text-teal-600 mb-5"
                size={40}
              />

              <h3 className="font-semibold text-lg">
                Care
              </h3>

              <p className="mt-3 text-neutral-500">
                Supporting orphans and vulnerable children through
                nutrition, healthcare and emotional wellbeing.
              </p>

            </div>

            <div className="border rounded-xl p-8 text-center">

              <Building2
                className="mx-auto text-teal-600 mb-5"
                size={40}
              />

              <h3 className="font-semibold text-lg">
                Community
              </h3>

              <p className="mt-3 text-neutral-500">
                Investing in schools, clean water, relief efforts,
                employment and community development.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ---------------- DONATE ---------------- */}

      <section
        id="donate"
        className="max-w-6xl mx-auto px-4 py-20"
      >

        <div className="text-center mb-10">

          <h2 className="text-3xl font-bold">
            Donate Now
          </h2>

          <p className="text-neutral-500 mt-2">
            Choose a campaign, enter your details and securely
            complete your donation.
          </p>

        </div>

        <DonateFlow />

      </section>

    </div>
  );
}
export default function JJTSite() {

  // Home page is now the landing page
  const [page, setPage] = useState("home");


  function goTo(destination) {

    setPage(destination);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }


  function goToDonate() {

    if (page !== "home") {

      setPage("home");


      setTimeout(() => {

        document
          .getElementById("donate")
          ?.scrollIntoView({
            behavior: "smooth",
          });

      }, 100);


    } else {

      document
        .getElementById("donate")
        ?.scrollIntoView({
          behavior: "smooth",
        });

    }

  }



  return (

    <div className="min-h-screen bg-neutral-50 text-neutral-900">


      <NavBar
        page={page}
        goTo={goTo}
        goToDonate={goToDonate}
      />


      {
        page === "home" &&
        <HomePage
          goToDonate={goToDonate}
        />
      }


      {
        page === "what" &&
        <WhatWeDoPage
          goToDonate={goToDonate}
        />
      }


      {
        page === "home" &&
        <HomePage />
      }


      <Footer />


    </div>

  );

}