"use client";

import { useState } from "react";

export default function CityTabBlock({ tabs }) {
  const [active, setActive] = useState(0);

  if (!tabs || tabs.length === 0) return null;

  const activeTab = tabs[active];
  const activities = activeTab?.activities || activeTab?.items || [];

  return (
    <div className="my-6">
      <div className="mb-5 flex gap-2">
        {tabs.map((tab, i) => {
          const label = tab.label || tab.cityName;
          return (
            <button
              key={tab._key || i}
              onClick={() => setActive(i)}
              className={`cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                i === active
                  ? "bg-[#1F5C99] text-white"
                  : "border border-gray-300 text-gray-600 hover:border-[#1F5C99] hover:text-[#1F5C99]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <ul className="space-y-3">
          {activities.map((activity, i) => {
            const text = typeof activity === "string" ? activity : activity.text || activity;
            return (
              <li key={activity._key || i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#1F5C99]" />
                <span>{text}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
