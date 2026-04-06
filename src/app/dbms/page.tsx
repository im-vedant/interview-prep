import Link from "next/link";

const articles = [
  {
    slug: "/dbms/intro",
    title: "Intro to DBMS",
    desc: "Data, hierarchy, file systems, types, characteristics, SQL vs NoSQL, ACID, schema, abstraction, views, architecture, and users.",
  },
  {
    slug: "/dbms/data-models",
    title: "Data Models & ER Model",
    desc: "What data models are, types — hierarchical, network, relational, ER, object-oriented, document, key-value.",
  },
  {
    slug: "/dbms/er-to-relational",
    title: "ER Diagrams to Relational Model",
    desc: "How to design an ER diagram step by step, and map it to relational tables — entities, relationships, weak entities, M:N, specialization.",
  },
  {
    slug: "/dbms/relational-model",
    title: "Relational Model & Normalization",
    desc: "Relation structure, all types of keys — super, candidate, primary, foreign, composite, surrogate, partial — and normalization up to BCNF.",
  },
];

export default function DBMSIndex() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-16">

        <div className="mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/30 rounded-full px-3 py-1">
            Topic
          </span>
          <h1 className="mt-4 text-4xl font-heading tracking-tight text-foreground">DBMS</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Database Management Systems — from fundamentals to architecture.
          </p>
        </div>

        <div className="space-y-3">
          {articles.map(({ slug, title, desc }, i) => (
            <Link
              key={slug}
              href={slug}
              className="flex items-start gap-4 border border-border rounded-lg px-5 py-4 hover:bg-card transition-colors group"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-500/10 text-violet-400 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-foreground group-hover:text-white transition-colors">{title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
              </div>
            </Link>
          ))}
        </div>

      </main>
    </div>
  );
}
