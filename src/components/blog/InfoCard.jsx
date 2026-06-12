export default function InfoCard({ children, icon = "ℹ️" }) {
  return (
    <div className="my-6 flex gap-4 rounded-xl border-l-4 border-[#1F5C99] bg-[#D6E4F0] p-5">
      <span className="mt-0.5 shrink-0 text-lg">{icon}</span>
      <div className="text-sm leading-relaxed text-gray-800">{children}</div>
    </div>
  );
}
