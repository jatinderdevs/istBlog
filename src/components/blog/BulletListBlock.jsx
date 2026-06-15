export default function BulletListBlock({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="my-5 space-y-3">
      {items.map((item) => {
        if (typeof item === "string") {
          return (
            <li key={item} className=" flex items-start gap-3 text-sm leading-relaxed text-gray-700 md:text-base">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--brand-green)]" />
              <span>{item}</span>
            </li>
          );
        }
        const { _key, boldLabel, text } = item;
        return (
          <li key={_key} className=" flex items-start gap-3 text-sm leading-relaxed text-gray-700 md:text-base">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--brand-green)]" />
            <span>
              {boldLabel && <strong className="font-semibold">{boldLabel}: </strong>}
              {text}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
