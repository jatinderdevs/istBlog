// app/tools/rent-checker/layout.js
// This server component wrapper exists solely to export metadata,
// because Next.js cannot export metadata from a "use client" page.

export { metadata } from "./metadata";

export default function RentCheckerLayout({ children }) {
  return children;
}
