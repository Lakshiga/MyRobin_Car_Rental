const mockCars = [
  { id: 1, name: "Tesla Model Y", segment: "EV", rate: 120 },
  { id: 2, name: "Range Rover Sport", segment: "SUV", rate: 185 },
  { id: 3, name: "BMW M4", segment: "Performance", rate: 210 },
];

export default function CarsCatalogPage() {
  return (
    <section style={{ display: "grid", gap: "1.5rem" }}>
      <header>
        <h1>Available cars</h1>
        <p>Filter by transmission, range, seating, or budget.</p>
      </header>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
        }}
      >
        {mockCars.map((car) => (
          <article key={car.id} style={{ padding: "1.25rem", background: "var(--surface)", borderRadius: "0.75rem" }}>
            <h3>{car.name}</h3>
            <p>{car.segment}</p>
            <p>${'{'}car.rate{'}'}/day</p>
          </article>
        ))}
      </div>
    </section>
  );
}