export default function CalloutBox({ label, children }) {
  return (
    <div className="my-6 rounded-xl border-l-4 border-[var(--brand-green)] bg-white p-5 shadow-md">
      {label && (
        <span className="mb-2 inline-block rounded bg-[var(--brand-green-light)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[var(--brand-green)]">
          {label}
        </span>
      )}
      <div className="text-sm leading-relaxed text-gray-800">{children}</div>
    </div>
  );
}
