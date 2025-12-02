export default function PublicHomePage() {
  return (
    <section style={{ display: "grid", gap: "2rem" }}>
      <div>
        <p className="eyebrow">Premium fleet  Flexible plans</p>
        <h1>Rent the perfect car for every journey.</h1>
        <p>
          DriveFlow connects travelers with curated vehicles, real-time
          availability, and concierge-level support across the globe.
        </p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button>Explore cars</button>
          <button style={{ background: "transparent", border: "1px solid" }}>
            Manage booking
          </button>
        </div>
      </div>
      <div style={{ display: "grid", gap: "0.75rem" }}>
        <div style={{ padding: "1.5rem", background: "var(--surface)", borderRadius: "1rem" }}>
          <strong>24/7 pickup</strong>
          <p>Airport, city center, or doorstep delivery.</p>
        </div>
        <div style={{ padding: "1.5rem", background: "var(--surface)", borderRadius: "1rem" }}>
          <strong>Insurance ready</strong>
          <p>Fully insured rides with zero paperwork on-site.</p>
        </div>
      </div>
    </section>
  );
}