import Link from "next/link";

const topics = [
  {
    slug: "/dbms",
    title: "DBMS",
    description: "Database fundamentals — data, storage models, normalization, transactions, and more.",
    articles: 4,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-16">

        {/* Hero */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            SDE Interview Prep
          </h1>
          <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
            A personal collection of concise notes on core CS topics — written to
            understand deeply, not just memorise. Covers DBMS, OS, Networks,
            DSA, and System Design.
          </p>
        </div>

        {/* Topics */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-5">
            Topics
          </h2>
          <div className="space-y-3">
            {topics.map(({ slug, title, description, articles }) => (
              <Link
                key={slug}
                href={slug}
                className="flex items-center justify-between gap-6 border border-border rounded-lg px-5 py-4 hover:bg-card transition-colors group"
              >
                <div>
                  <p className="font-semibold text-foreground">
                    {title}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
                <span className="flex-shrink-0 text-xs text-zinc-400">
                  {articles} {articles === 1 ? "article" : "articles"}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
