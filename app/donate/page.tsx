export default function DonatePage() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-primary mb-4">Donate</h1>
      <p className="text-muted mb-8 max-w-prose">
        Your contribution fuels our programs and directly supports communities in need.
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { amount: 25, label: "Support Supplies" },
          { amount: 50, label: "Sponsor a Lesson" },
          { amount: 100, label: "Fund Healthcare" },
        ].map((t) => (
          <button key={t.amount} className="rounded-lg border border-muted/30 bg-bg-alt p-6 text-left hover:border-primary/50">
            <div className="text-2xl font-semibold text-text mb-1">${t.amount}</div>
            <div className="text-muted">{t.label}</div>
          </button>
        ))}
      </div>
      <div className="mt-8">
        <button className="bg-teal text-white rounded-md px-6 py-3 font-medium hover:opacity-90">Proceed to Donate</button>
      </div>
    </section>
  );
}

