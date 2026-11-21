"use client";

import { useState } from "react";

export default function CopyEmailButton({ email }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the address is still visible to copy by hand
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
    >
      {copied ? "Copied!" : "Copy email address"}
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
