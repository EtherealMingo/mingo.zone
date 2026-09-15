export function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

export function SectionCard({ title, children }) {
  return (
    <section className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      {title ? <h3 className="text-lg font-semibold">{title}</h3> : null}
      {children}
    </section>
  );
}
