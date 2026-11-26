"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { canonicalUrl, jsonLd } from "@/lib/seo";
import NewsletterInline from "@/components/newsletter/NewsletterInline";
import { RENT_CHECKER_OFFER } from "@/lib/newsletter";

// ─── City & accommodation data ────────────────────────────────────────────────

const CITY_DATA = {
  sydney: {
    name: "Sydney",
    share: [250, 350],
    studio: [400, 550],
    "1bed": [550, 750],
    homestay: [300, 400],
  },
  melbourne: {
    name: "Melbourne",
    share: [220, 320],
    studio: [350, 480],
    "1bed": [450, 650],
    homestay: [280, 380],
  },
  brisbane: {
    name: "Brisbane / Gold Coast",
    share: [200, 290],
    studio: [300, 420],
    "1bed": [400, 560],
    homestay: [260, 340],
  },
  perth: {
    name: "Perth",
    share: [210, 300],
    studio: [310, 420],
    "1bed": [420, 560],
    homestay: [260, 350],
  },
  adelaide: {
    name: "Adelaide",
    share: [180, 260],
    studio: [280, 380],
    "1bed": [360, 480],
    homestay: [240, 320],
  },
  canberra: {
    name: "Canberra",
    share: [220, 310],
    studio: [340, 460],
    "1bed": [460, 620],
    homestay: [270, 360],
  },
};

const ACCOM_LABELS = {
  share: "Share house (own room)",
  studio: "Studio apartment",
  "1bed": "1-bedroom apartment",
  homestay: "Homestay",
};

// ─── Helper functions ─────────────────────────────────────────────────────────

function getVerdict(ratio) {
  if (ratio <= 30)
    return {
      status: "safe",
      label: "Affordable",
      text: "Within the 30% guideline — you're in good shape.",
      barColor: "bg-green-600",
      bg: "bg-green-50",
      textColor: "text-green-800",
      border: "border-green-200",
    };
  if (ratio <= 40)
    return {
      status: "caution",
      label: "Manageable",
      text: "Above 30% but still workable — budget carefully.",
      barColor: "bg-amber-500",
      bg: "bg-amber-50",
      textColor: "text-amber-800",
      border: "border-amber-200",
    };
  return {
    status: "danger",
    label: "High",
    text: "Over 40% — leaves very little for food, transport & emergencies.",
    barColor: "bg-red-500",
    bg: "bg-red-50",
    textColor: "text-red-800",
    border: "border-red-200",
  };
}

function getCityBadge(ratio) {
  if (ratio <= 30)
    return (
      <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800">
        Affordable
      </span>
    );
  if (ratio <= 40)
    return (
      <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
        Tight
      </span>
    );
  return (
    <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-800">
      Difficult
    </span>
  );
}

// ─── Main calculator component ────────────────────────────────────────────────

function RentCalculator() {
  const [income, setIncome] = useState(600);
  const [rent, setRent] = useState(250);
  const [city, setCity] = useState("brisbane");
  const [accom, setAccom] = useState("share");

  const ratio = income > 0 ? (rent / income) * 100 : 0;
  const remaining = income - rent;
  const verdict = getVerdict(ratio);
  const cityRange = CITY_DATA[city][accom];
  const midRent = Math.round((cityRange[0] + cityRange[1]) / 2);
  const rentDiff = rent - midRent;
  const diffText =
    rentDiff > 0
      ? `$${rentDiff} above`
      : rentDiff < 0
        ? `$${Math.abs(rentDiff)} below`
        : "equal to";

  const tips = [];
  if (ratio > 40)
    tips.push(
      "Consider a share house with 2–3 other students — splitting a 3-bedroom can cut your rent by 30–40%.",
    );
  if (ratio > 30)
    tips.push(
      "Look at outer suburbs or nearby regional cities — rents drop significantly just 20–30 minutes from the CBD.",
    );
  if (remaining < 200)
    tips.push(
      "With under $200/wk left, budget roughly $80 for groceries, $40 for transport and $20 for your phone plan.",
    );
  if (ratio <= 30)
    tips.push(
      "You're in a great position — consider putting the surplus into an emergency fund (aim for 4 weeks of expenses).",
    );

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">
            Weekly <b> income</b> after tax (AUD)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              $
            </span>
            <input
              type="number"
              min="0"
              step="50"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[var(--brand-green)]"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1"></p>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1.5">City</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[var(--brand-green)] bg-white"
          >
            {Object.entries(CITY_DATA).map(([key, val]) => (
              <option key={key} value={key}>
                {val.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1.5">
            Accommodation type
          </label>
          <select
            value={accom}
            onChange={(e) => setAccom(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[var(--brand-green)] bg-white"
          >
            {Object.entries(ACCOM_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1.5">
            Your weekly rent (AUD)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              $
            </span>
            <input
              type="number"
              min="0"
              step="10"
              value={rent}
              onChange={(e) => setRent(Number(e.target.value))}
              className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[var(--brand-green)]"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Typical {ACCOM_LABELS[accom].toLowerCase()} in{" "}
            {CITY_DATA[city].name}: ${cityRange[0]}–${cityRange[1]}/wk
          </p>
        </div>
      </div>

      {/* Result panel */}
      <div
        className={`rounded-xl border p-5 mb-5 ${verdict.bg} ${verdict.border}`}
      >
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${verdict.bg} ${verdict.textColor} border ${verdict.border}`}
          >
            {verdict.label}
          </span>
          <span className={`text-sm ${verdict.textColor}`}>{verdict.text}</span>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-lg p-3 border border-white/60">
            <p className="text-xs text-gray-400 mb-0.5">Rent ratio</p>
            <p className={`text-xl font-medium ${verdict.textColor}`}>
              {ratio.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-400">of income</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-white/60">
            <p className="text-xs text-gray-400 mb-0.5">Monthly rent</p>
            <p className="text-xl font-medium text-gray-800">
              ${Math.round((rent * 52) / 12)}
            </p>
            <p className="text-xs text-gray-400">estimated</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-white/60">
            <p className="text-xs text-gray-400 mb-0.5">Left per week</p>
            <p
              className={`text-xl font-medium ${
                remaining < 150
                  ? "text-red-700"
                  : remaining < 250
                    ? "text-amber-700"
                    : "text-gray-800"
              }`}
            >
              ${Math.round(remaining)}
            </p>
            <p className="text-xs text-gray-400">after rent</p>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>0%</span>
            <span>30% guideline</span>
            <span>50%+</span>
          </div>
          <div className="h-2 bg-white/60 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${verdict.barColor}`}
              style={{ width: `${Math.min(ratio * 2, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Your rent is {diffText} the typical{" "}
            {ACCOM_LABELS[accom].toLowerCase()} in {CITY_DATA[city].name} ($
            {cityRange[0]}–${cityRange[1]}/wk).
          </p>
        </div>
      </div>

      {/* Tips */}
      {tips.length > 0 && (
        <div className="border-l-2 border-[var(--brand-green)] pl-4 space-y-2">
          {tips.map((tip, i) => (
            <p key={i} className="text-sm text-gray-600 leading-relaxed">
              {tip}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── City comparison table ────────────────────────────────────────────────────

function CityTable({ accom, income }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left py-3 pr-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
              City
            </th>
            <th className="text-left py-3 pr-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
              Weekly range
            </th>
            <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
              On ${income}/wk income
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {Object.entries(CITY_DATA).map(([key, val]) => {
            const range = val[accom];
            const mid = Math.round((range[0] + range[1]) / 2);
            const ratio = income > 0 ? (mid / income) * 100 : 0;
            return (
              <tr key={key}>
                <td className="py-3 pr-4 font-medium text-gray-800">
                  {val.name}
                </td>
                <td className="py-3 pr-4 text-gray-500">
                  ${range[0]}–${range[1]}
                </td>
                <td className="py-3">{getCityBadge(ratio)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RentCheckerPage() {
  const [income, setIncome] = useState(600);
  const [accom, setAccom] = useState("share");

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Rent Affordability Checker",
            description:
              "Check whether your rent is affordable on a student income in Australia, with typical rents across major cities and the 30% guideline explained.",
            url: canonicalUrl("/tools/rent-checker"),
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "AUD",
            },
            audience: {
              "@type": "Audience",
              audienceType: "International students in Australia",
            },
          }),
        }}
      />

      <div>
        {/* Page header */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-6 py-14">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-gray-400">Tools</span>
              <span className="text-xs text-gray-300">/</span>
              <span className="text-xs text-gray-400">Rent Checker</span>
            </div>
            <span className="inline-block bg-[var(--brand-green-light)] text-[var(--brand-green)] text-xs font-medium px-3 py-1 rounded-full mb-4">
              Free Calculator
            </span>
            <h1 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight mb-4">
              Rent Affordability Calculator for International Students
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Enter your weekly income and rent to instantly see if your housing
              costs are sustainable — with real rental ranges for every major
              Australian city.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <div className="max-w-3xl mx-auto px-6 py-10">
          <RentCalculator />

          <NewsletterInline offer={RENT_CHECKER_OFFER} source="rent-checker" />

          {/* SEO content block 1 */}
          <div className="mt-12 prose prose-gray max-w-none">
            <h2 className="text-xl font-medium text-gray-900 mb-3">
              The 30% rule — and why it matters for international students
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4 text-sm">
              Financial advisors worldwide use the 30% rule as a benchmark: your
              rent should not exceed 30% of your take-home income. For
              international students in Australia, this is especially important
              because your income is capped by your student visa work conditions
              — currently 48 hours per fortnight during study periods.
            </p>
            <p className="text-gray-500 leading-relaxed mb-4 text-sm">
              In practice, many students in Sydney and Melbourne push to 40–45%,
              which leaves very little buffer for groceries, transport,
              textbooks and unexpected costs like medical bills or visa
              renewals. Keeping rent under 35% gives you breathing room and
              reduces financial stress — which in turn helps your studies.
            </p>

            <h2 className="text-xl font-medium text-gray-900 mb-3 mt-8">
              Typical rents for international students across Australia
              (2025–26)
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4 text-sm">
              Rent varies significantly between cities and accommodation types.
              Share housing remains the most popular and affordable option for
              students, while homestay can be a great choice for those who want
              meals included and a more structured environment settling in.
            </p>

            {/* Interactive city table */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 my-6">
              <div className="flex flex-wrap items-center gap-4 mb-5">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Accommodation type
                  </label>
                  <select
                    value={accom}
                    onChange={(e) => setAccom(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[var(--brand-green)] bg-white"
                  >
                    {Object.entries(ACCOM_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Your weekly income ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-28 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[var(--brand-green)]"
                  />
                </div>
              </div>
              <CityTable accom={accom} income={income} />
            </div>

            <h2 className="text-xl font-medium text-gray-900 mb-3 mt-8">
              Tips to find affordable rent as an international student
            </h2>
            <div className="space-y-4 text-sm text-gray-500 leading-relaxed">
              <div className="flex gap-3">
                <span className="text-[var(--brand-green)] font-medium shrink-0">
                  01
                </span>
                <p>
                  <strong className="text-gray-700 font-medium">
                    Start with share houses.
                  </strong>{" "}
                  Platforms like Flatmates.com.au and Facebook Marketplace list
                  rooms in shared properties. Living with 2–4 others is the
                  single biggest way to reduce rent costs in any city.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--brand-green)] font-medium shrink-0">
                  02
                </span>
                <p>
                  <strong className="text-gray-700 font-medium">
                    Look one suburb out from uni.
                  </strong>{" "}
                  Suburbs within walking distance of universities command a
                  premium. Moving one or two stops further on public transport
                  can save $50–100/wk, often more than the cost of a transit
                  pass.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--brand-green)] font-medium shrink-0">
                  03
                </span>
                <p>
                  <strong className="text-gray-700 font-medium">
                    Check your university&apos;s housing board.
                  </strong>{" "}
                  Most Australian universities have an official housing
                  noticeboard or off-campus housing service. These listings are
                  often vetted and safer than generic platforms.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--brand-green)] font-medium shrink-0">
                  04
                </span>
                <p>
                  <strong className="text-gray-700 font-medium">
                    Never pay a deposit before inspecting.
                  </strong>{" "}
                  Rental scams targeting international students are common,
                  especially on Facebook and Gumtree. Always inspect in person
                  or via video call before transferring any money.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--brand-green)] font-medium shrink-0">
                  05
                </span>
                <p>
                  <strong className="text-gray-700 font-medium">
                    Understand what&apos;s included.
                  </strong>{" "}
                  Some rentals include water, gas and internet — others don&apos;t.
                  Factor in $80–120/month for utilities if they&apos;re not included
                  when comparing your true costs.
                </p>
              </div>
            </div>

            {/* CTA to related posts */}
            <div className="mt-10 p-5 rounded-2xl bg-[var(--brand-green-light)] border border-green-100">
              <p className="text-xs font-medium text-[var(--brand-green)] uppercase tracking-wider mb-2">
                Related guides
              </p>
              <p className="text-sm font-medium text-gray-700 mb-3">
                More housing help for international students
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/blog/category/housing"
                  className="text-sm text-[var(--brand-green)] hover:underline"
                >
                  All housing guides →
                </Link>
                <Link
                  href="/blog/category/tax-and-money"
                  className="text-sm text-[var(--brand-green)] hover:underline"
                >
                  Money & budgeting →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
