export default function AppTable({ apps }) {
  if (!apps || apps.length === 0) return null;
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-[#2E75B6] text-white">
            <th className="px-4 py-3 font-semibold">App</th>
            <th className="px-4 py-3 font-semibold">What It Does</th>
            <th className="px-4 py-3 font-semibold">Cost</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((app, i) => {
            const name = typeof app === "string" ? app : app.name || app.col1;
            const description = typeof app === "string" ? "" : app.description || app.col2;
            const cost = typeof app === "string" ? "" : app.cost || app.col3 || "Free";
            return (
              <tr key={app._key || i} className={i % 2 === 0 ? "bg-[#F5F7FA]" : "bg-white"}>
                <td className="px-4 py-3 font-medium text-gray-900">{name}</td>
                <td className="px-4 py-3 text-gray-600">{description}</td>
                <td className="px-4 py-3">
                  <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                    {cost}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
