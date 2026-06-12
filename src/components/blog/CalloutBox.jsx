export default function CalloutBox({ label, children }) {
  return (
    <div className="my-6 rounded-xl border-l-4 border-[#1F5C99] bg-white p-5 shadow-md">
      {label && (
        <span className="mb-2 inline-block rounded bg-[#1F5C99]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#1F5C99]">
          {label}
        </span>
      )}
      <div className="text-sm leading-relaxed text-gray-800">{children}</div>
    </div>
  );
}
