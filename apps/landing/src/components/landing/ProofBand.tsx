const proofItems = [
  {
    title: "Find where the day went",
    body: "See work grouped by hour, app, project, and context without starting timers.",
  },
  {
    title: "Review AI-assisted work",
    body: "Separate observed activity from generated output and work that still needs review.",
  },
  {
    title: "Write updates from facts",
    body: "Turn captured sessions into a daily report without rebuilding the day from memory.",
  },
];

export function ProofBand() {
  return (
    <section className="proof-band" id="proof" aria-labelledby="proof-title">
      <div>
        <p className="section-kicker">Why teams keep it running</p>
        <h2 id="proof-title">A clean memory of the work, not another timer to manage.</h2>
      </div>
      <div className="proof-items">
        {proofItems.map((item) => (
          <article key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
