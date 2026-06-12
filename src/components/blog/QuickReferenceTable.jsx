export default function QuickReferenceTable({ rows }) {
  if (!rows || rows.length === 0) return null;
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-[#2E75B6] text-white">
            <th className="px-4 py-3 font-semibold">Resource</th>
            <th className="px-4 py-3 font-semibold">Link / Details</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const col1 = Array.isArray(row) ? row[0] : row.col1 ?? row.resource;
            const col2 = Array.isArray(row) ? row[1] : row.col2 ?? row.link;
            return (
              <tr key={row._key || i} className={i % 2 === 0 ? "bg-[#F5F7FA]" : "bg-white"}>
                <td className="px-4 py-3 font-medium text-gray-900">{col1}</td>
                <td className="px-4 py-3 text-gray-600">
                  {col2?.startsWith("http") ? (
                    <a
                      href={col2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1F5C99] underline underline-offset-2 hover:text-[#2E75B6]"
                    >
                      {col2}
                    </a>
                  ) : (
                    col2
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
