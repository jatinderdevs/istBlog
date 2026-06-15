export default function InfoCard({ children, icon = "ℹ️" }) {
  return (
    <div className="my-6 flex gap-4 rounded-xl border-l-4 border-[var(--brand-green)] bg-[var(--brand-green-light)] p-5">
      <span className="mt-0.5 shrink-0 text-lg">{icon}</span>
      <div className="text-sm leading-relaxed text-gray-800">{children}</div>
    </div>
  );
}
