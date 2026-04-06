const sections = [
  { id: "keys",          label: "Types of Keys" },
  { id: "key-summary",   label: "Keys — Quick Reference" },
  { id: "normalization", label: "Normalization" },
  { id: "func-deps",     label: "Functional Dependencies" },
  { id: "1nf",           label: "First Normal Form" },
  { id: "2nf",           label: "Second Normal Form" },
  { id: "3nf",           label: "Third Normal Form" },
  { id: "bcnf",          label: "BCNF" },
];

/* Running example used throughout the Keys section */
const studentRows = [
  { id: "1", name: "Alice", email: "alice@uni.edu",   phone: "9876543210", dept: "CS"   },
  { id: "2", name: "Bob",   email: "bob@uni.edu",     phone: "8765432109", dept: "CS"   },
  { id: "3", name: "Bob",   email: "charlie@uni.edu", phone: "7654321098", dept: "MATH" },
];

export default function RelationalModel() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16 flex gap-12">

        <main className="flex-1 min-w-0">

          {/* Header */}
          <div className="mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/30 rounded-full px-3 py-1">
              DBMS · Relational Model
            </span>
            <h1 className="mt-4 text-4xl tracking-tight text-foreground font-heading">
              Relational Model & Normalization
            </h1>
            <p className="mt-4 text-xl text-muted-foreground leading-relaxed">
              Types of keys, functional dependencies, and how normalization removes redundancy from databases.
            </p>
          </div>

          <div className="space-y-14 text-foreground/80 text-base leading-7">

            {/* ── Types of Keys ─────────────────────────────────────── */}
            <section id="keys">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Types of Keys
              </h2>
              <p className="mb-5 text-sm">
                A <strong>key</strong> is an attribute (or set of attributes) that uniquely identifies a tuple or establishes a link between relations.
                We will use this single example throughout:
              </p>

              {/* Running example table */}
              <div className="border border-border rounded-lg overflow-hidden text-xs mb-8">
                <div className="px-4 py-2 bg-muted/40 border-b border-border font-mono text-violet-400 text-[11px] font-semibold">
                  STUDENT(student_id, name, email, phone, dept_id)
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/20 text-[10px]">
                      <th className="px-4 py-2 text-left text-amber-400 font-mono">student_id</th>
                      <th className="px-4 py-2 text-left text-foreground/60 font-mono">name</th>
                      <th className="px-4 py-2 text-left text-foreground/60 font-mono">email</th>
                      <th className="px-4 py-2 text-left text-foreground/60 font-mono">phone</th>
                      <th className="px-4 py-2 text-left text-foreground/60 font-mono">dept_id</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {studentRows.map((r) => (
                      <tr key={r.id}>
                        <td className="px-4 py-2 font-mono text-amber-300">{r.id}</td>
                        <td className="px-4 py-2 text-foreground/80">{r.name}</td>
                        <td className="px-4 py-2 text-foreground/60">{r.email}</td>
                        <td className="px-4 py-2 text-foreground/60">{r.phone}</td>
                        <td className="px-4 py-2 text-foreground/60">{r.dept}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-5 text-sm">

                {/* Super Key */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-5 py-2.5 bg-muted/30 border-b border-border flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0" />
                    <p className="font-semibold text-foreground">Super Key</p>
                  </div>
                  <div className="px-5 py-3.5 text-sm space-y-2">
                    <p className="text-foreground/80">
                      Any set of attributes that <strong>uniquely identifies every tuple</strong>. Can contain extra attributes — doesn&apos;t have to be minimal.
                    </p>
                    <div className="text-xs font-mono text-muted-foreground space-y-0.5">
                      <p><span className="text-sky-400">✓</span> {"{"}student_id{"}"} &nbsp; <span className="text-sky-400">✓</span> {"{"}email{"}"} &nbsp; <span className="text-sky-400">✓</span> {"{"}phone{"}"} &nbsp; <span className="text-sky-400">✓</span> {"{"}student_id, name{"}"} &nbsp; <span className="text-sky-400">✓</span> {"{"}student_id, email, phone{"}"}</p>
                      <p><span className="text-rose-400">✗</span> {"{"}name{"}"} — rows 2 and 3 are both &quot;Bob&quot;</p>
                    </div>
                  </div>
                </div>

                {/* Candidate Key */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-5 py-2.5 bg-muted/30 border-b border-border flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                    <p className="font-semibold text-foreground">Candidate Key</p>
                  </div>
                  <div className="px-5 py-3.5 text-sm space-y-2">
                    <p className="text-foreground/80">
                      A <strong>minimal super key</strong> — uniquely identifies tuples and no attribute can be removed from it. A table can have multiple candidate keys.
                    </p>
                    <p className="text-xs font-mono text-muted-foreground">
                      Candidate keys: <span className="text-emerald-400">{"{"}student_id{"}"}, {"{"}email{"}"}, {"{"}phone{"}"}</span>
                      &nbsp;&nbsp;— <span className="text-rose-400">{"{"}student_id, email{"}"}</span> is a super key but <em>not</em> a candidate key (student_id alone is sufficient).
                    </p>
                  </div>
                </div>

                {/* Primary + Alternate */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-amber-500/30 rounded-lg overflow-hidden">
                    <div className="px-5 py-2.5 bg-amber-500/10 border-b border-border">
                      <p className="font-semibold text-amber-400 text-sm">Primary Key</p>
                    </div>
                    <div className="px-5 py-3.5 text-xs space-y-2">
                      <p className="text-foreground/80 leading-5">The one candidate key chosen as the official row identifier. <strong>NOT NULL, UNIQUE, one per table.</strong></p>
                      <p className="font-mono text-amber-300">student_id  ← chosen PK</p>
                      <pre className="bg-[oklch(0.13_0.004_260)] border border-border rounded px-3 py-2 text-emerald-300/80 text-[11px] font-mono leading-5 overflow-x-auto">{`student_id INT PRIMARY KEY`}</pre>
                    </div>
                  </div>
                  <div className="border border-rose-500/30 rounded-lg overflow-hidden">
                    <div className="px-5 py-2.5 bg-rose-500/10 border-b border-border">
                      <p className="font-semibold text-rose-400 text-sm">Alternate Key</p>
                    </div>
                    <div className="px-5 py-3.5 text-xs space-y-2">
                      <p className="text-foreground/80 leading-5">All candidate keys <strong>not chosen</strong> as the PK. Still unique — enforced with a UNIQUE constraint.</p>
                      <p className="font-mono text-rose-300">email, phone  ← alternate keys</p>
                      <pre className="bg-[oklch(0.13_0.004_260)] border border-border rounded px-3 py-2 text-emerald-300/80 text-[11px] font-mono leading-5 overflow-x-auto">{`email VARCHAR UNIQUE,\nphone VARCHAR UNIQUE`}</pre>
                    </div>
                  </div>
                </div>

                {/* Foreign Key */}
                <div className="border border-violet-500/30 rounded-lg overflow-hidden">
                  <div className="px-5 py-2.5 bg-violet-500/10 border-b border-border flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                    <p className="font-semibold text-foreground">Foreign Key</p>
                  </div>
                  <div className="px-5 py-3.5 text-sm space-y-2.5">
                    <p className="text-foreground/80">
                      An attribute in one table that <strong>references the PK of another</strong>. Enforces referential integrity — you cannot reference a row that doesn&apos;t exist.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-mono text-sky-300">dept_id</span> in STUDENT references <span className="font-mono text-amber-300">dept_id PK</span>{" "}in DEPARTMENT.
                      You cannot enroll a student in dept_id=&apos;ECE&apos; if ECE doesn&apos;t exist in DEPARTMENT.
                    </p>
                    <div className="flex gap-3 text-[10px]">
                      {[
                        { label: "ON DELETE CASCADE",  desc: "Delete child rows when parent is deleted." },
                        { label: "ON DELETE SET NULL",  desc: "Set FK to NULL when parent is deleted." },
                        { label: "ON DELETE RESTRICT",  desc: "Block deletion if child rows exist." },
                      ].map(({ label, desc }) => (
                        <div key={label} className="flex-1 border border-border rounded p-2 bg-muted/20">
                          <p className="font-mono text-violet-400 mb-1">{label}</p>
                          <p className="text-muted-foreground">{desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Composite Key */}
                <div className="border border-cyan-500/30 rounded-lg overflow-hidden">
                  <div className="px-5 py-2.5 bg-cyan-500/10 border-b border-border flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                    <p className="font-semibold text-foreground">Composite Key</p>
                  </div>
                  <div className="px-5 py-3.5 text-sm space-y-2">
                    <p className="text-foreground/80">
                      A PK made of <strong>two or more attributes</strong>. Common in junction tables. No single attribute alone is unique — only the combination is.
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      ENROLLMENT(<span className="text-amber-400">student_id</span>, <span className="text-amber-400">course_id</span>, grade)
                      — the same student can enroll in many courses; the same course has many students. Only the pair is unique.
                    </p>
                    <pre className="bg-[oklch(0.13_0.004_260)] border border-border rounded px-3 py-2 text-emerald-300/80 text-xs font-mono leading-5 overflow-x-auto">{`PRIMARY KEY (student_id, course_id)`}</pre>
                  </div>
                </div>

                {/* Surrogate + Partial + Unique in one row */}
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="border border-indigo-500/30 rounded-lg overflow-hidden">
                    <div className="px-4 py-2.5 bg-indigo-500/10 border-b border-border">
                      <p className="font-semibold text-indigo-400">Surrogate Key</p>
                    </div>
                    <div className="px-4 py-3 space-y-1.5">
                      <p className="text-foreground/80 leading-5">An <strong>artificial, system-generated</strong> ID — no real-world meaning. Usually an auto-incrementing integer.</p>
                      <p className="text-muted-foreground leading-5">
                        <span className="font-mono text-indigo-300">student_id SERIAL</span> — not derived from the student&apos;s data; assigned by the DB.
                      </p>
                      <p className="text-muted-foreground leading-5">Use when no natural unique key exists or natural keys can change (email can change; an integer id cannot).</p>
                    </div>
                  </div>
                  <div className="border border-orange-500/30 rounded-lg overflow-hidden">
                    <div className="px-4 py-2.5 bg-orange-500/10 border-b border-border">
                      <p className="font-semibold text-orange-400">Partial Key</p>
                    </div>
                    <div className="px-4 py-3 space-y-1.5">
                      <p className="text-foreground/80 leading-5">Attribute of a <strong>weak entity</strong> that only <em>partially</em> identifies its tuples — needs the parent PK to be unique.</p>
                      <p className="text-muted-foreground leading-5">
                        DEPENDENT(<span className="font-mono text-orange-300">emp_id FK</span>, <span className="font-mono text-orange-300">dep_name</span>, relation) — dep_name is the partial key. &quot;Alice&quot; appears as a dependent in many employees; only (emp_id, dep_name) together is unique.
                      </p>
                    </div>
                  </div>
                  <div className="border border-teal-500/30 rounded-lg overflow-hidden">
                    <div className="px-4 py-2.5 bg-teal-500/10 border-b border-border">
                      <p className="font-semibold text-teal-400">Unique Key</p>
                    </div>
                    <div className="px-4 py-3 space-y-1.5">
                      <p className="text-foreground/80 leading-5">Enforces uniqueness like a PK but <strong>allows one NULL</strong> per column and multiple unique keys can exist per table.</p>
                      <p className="text-muted-foreground leading-5">
                        <span className="font-mono text-teal-300">email UNIQUE</span> in STUDENT — no two students share an email, but an unverified student can have NULL.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* ── Keys Quick Reference ───────────────────────────────── */}
            <section id="key-summary">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Keys — Quick Reference
              </h2>
              <div className="border border-border rounded-lg overflow-hidden text-xs">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30 text-[10px]">
                      <th className="px-4 py-2.5 text-left text-muted-foreground font-medium">Key</th>
                      <th className="px-4 py-2.5 text-left text-muted-foreground font-medium">Unique?</th>
                      <th className="px-4 py-2.5 text-left text-muted-foreground font-medium">NULL?</th>
                      <th className="px-4 py-2.5 text-left text-muted-foreground font-medium">Count</th>
                      <th className="px-4 py-2.5 text-left text-muted-foreground font-medium">One-liner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {[
                      { name: "Super Key",     c: "text-sky-400",     u:"Yes", n:"Maybe", cnt:"Many",       desc: "Any combo that uniquely identifies a tuple" },
                      { name: "Candidate Key", c: "text-emerald-400", u:"Yes", n:"No",    cnt:"≥ 1",        desc: "Minimal super key — no redundant attribute" },
                      { name: "Primary Key",   c: "text-amber-400",   u:"Yes", n:"No",    cnt:"Exactly 1",  desc: "The chosen candidate key" },
                      { name: "Alternate Key", c: "text-rose-400",    u:"Yes", n:"No",    cnt:"0 or more",  desc: "Candidate keys not chosen as PK" },
                      { name: "Foreign Key",   c: "text-violet-400",  u:"No",  n:"Yes",   cnt:"0 or more",  desc: "References PK of another table" },
                      { name: "Composite Key", c: "text-cyan-400",    u:"Yes", n:"No",    cnt:"As needed",  desc: "Multi-attribute key" },
                      { name: "Surrogate Key", c: "text-indigo-400",  u:"Yes", n:"No",    cnt:"Exactly 1",  desc: "Artificial system-generated ID" },
                      { name: "Partial Key",   c: "text-orange-400",  u:"No",  n:"No",    cnt:"1/weak ent", desc: "Partially identifies a weak entity" },
                      { name: "Unique Key",    c: "text-teal-400",    u:"Yes", n:"Once",  cnt:"0 or more",  desc: "Unique constraint; allows one NULL" },
                    ].map(({ name, c, u, n, cnt, desc }) => (
                      <tr key={name} className="hover:bg-muted/20">
                        <td className={`px-4 py-2.5 font-semibold ${c}`}>{name}</td>
                        <td className="px-4 py-2.5 text-foreground/70">{u}</td>
                        <td className="px-4 py-2.5 text-foreground/70">{n}</td>
                        <td className="px-4 py-2.5 text-foreground/70">{cnt}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── Normalization ─────────────────────────────────────── */}
            <section id="normalization">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Normalization
              </h2>
              <p className="mb-4">
                <strong>Normalization</strong> is the process of structuring a relational database to <strong>reduce data redundancy</strong> and <strong>eliminate anomalies</strong>. It works by decomposing one large, messy table into smaller well-structured tables.
              </p>

              <div className="grid grid-cols-3 gap-3 text-xs mb-6">
                {[
                  { name: "Insertion Anomaly", color: "text-rose-400 border-rose-500/30 bg-rose-500/5",
                    desc: "Cannot insert data without adding unrelated data. e.g. Can't add a new department until at least one student enrols in it." },
                  { name: "Update Anomaly",    color: "text-amber-400 border-amber-500/30 bg-amber-500/5",
                    desc: "Changing one fact requires updating many rows. e.g. Changing an instructor's name means updating every row where they appear." },
                  { name: "Deletion Anomaly",  color: "text-orange-400 border-orange-500/30 bg-orange-500/5",
                    desc: "Deleting a row causes unintended loss of other data. e.g. Dropping the last student in a dept deletes the dept's existence too." },
                ].map(({ name, color, desc }) => (
                  <div key={name} className={`border rounded-lg p-3 ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
                    <p className={`font-semibold mb-1.5 ${color.split(" ")[0]}`}>{name}</p>
                    <p className="text-muted-foreground leading-5">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Running normalization example — start */}
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Running example — we will normalize this table step by step
              </p>
              <div className="border border-border rounded-lg overflow-hidden text-xs mb-3">
                <div className="px-4 py-2 bg-muted/40 border-b border-border font-mono text-rose-400 text-[11px]">
                  STUDENT_COURSE (unnormalized)
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/20 text-[10px]">
                      {["student_id","student_name","dept_id","dept_name","course_id","course_name","instructor","grade"].map(h => (
                        <th key={h} className="px-3 py-2 text-left text-foreground/50 font-mono">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {[
                      ["1","Alice","CS","Comp Sci","C101","DBMS","Dr. Kumar","A"],
                      ["1","Alice","CS","Comp Sci","C102","OS","Dr. Gupta","B"],
                      ["2","Bob","IT","Info Tech","C101","DBMS","Dr. Kumar","B"],
                      ["3","Charlie","CS","Comp Sci","C103","Algo","Dr. Mehta","A"],
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-muted/10">
                        {row.map((cell, j) => (
                          <td key={j} className={`px-3 py-1.5 font-mono ${j < 2 ? "text-amber-300/80" : j < 4 ? "text-sky-300/70" : j < 6 ? "text-emerald-300/70" : "text-foreground/60"}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground">
                Notice: Alice&apos;s name and dept repeat. &quot;Comp Sci&quot; repeats three times. DBMS and Dr. Kumar repeat. This is the redundancy we will remove.
              </p>
            </section>

            {/* ── Functional Dependencies ───────────────────────────── */}
            <section id="func-deps">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Functional Dependencies
              </h2>
              <p className="mb-4">
                A <strong>functional dependency (FD)</strong> <span className="font-mono text-violet-300">X → Y</span> means: knowing the value of X <em>determines</em> the value of Y.
                For any two tuples with the same X, they must have the same Y.
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm mb-5">
                <div className="space-y-2 text-xs">
                  <p className="text-foreground/80 leading-5">
                    In our STUDENT_COURSE table:
                  </p>
                  <div className="bg-muted/40 border border-border rounded-lg p-3 font-mono space-y-1.5 text-[11px]">
                    <p><span className="text-violet-300">student_id → student_name, dept_id, dept_name</span></p>
                    <p><span className="text-emerald-300">course_id  → course_name, instructor</span></p>
                    <p><span className="text-amber-300">(student_id, course_id) → grade</span></p>
                    <p><span className="text-sky-300">dept_id → dept_name</span></p>
                  </div>
                </div>
                <div className="space-y-3 text-xs">
                  {[
                    { name: "Full FD",     color: "text-emerald-400", desc: "Y depends on the entire composite key, not just part of it. e.g. grade depends on BOTH student_id AND course_id." },
                    { name: "Partial FD",  color: "text-rose-400",    desc: "Y depends on only part of a composite key. e.g. student_name depends only on student_id — not the full PK." },
                    { name: "Transitive FD", color: "text-amber-400", desc: "X → Z through an intermediate: X → Y and Y → Z. e.g. student_id → dept_id → dept_name." },
                  ].map(({ name, color, desc }) => (
                    <div key={name} className="flex gap-2">
                      <span className={`flex-shrink-0 font-semibold ${color}`}>{name}:</span>
                      <span className="text-muted-foreground leading-5">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 border-l-4 border-violet-500/50 rounded-md px-5 py-3 text-sm text-foreground/80">
                <strong>Why it matters:</strong>{" "}every normal form is defined in terms of which functional dependencies are allowed.
                Understanding FDs is the prerequisite to understanding normalization.
              </div>
            </section>

            {/* ── 1NF ───────────────────────────────────────────────── */}
            <section id="1nf">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                First Normal Form (1NF)
              </h2>
              <p className="mb-4">
                A table is in <strong>1NF</strong> if every cell holds a <strong>single, atomic value</strong> — no multi-valued cells, no repeating groups, and every row is uniquely identifiable.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs mb-5">
                <div className="border border-rose-500/20 rounded-lg overflow-hidden">
                  <div className="px-4 py-2 bg-muted/30 border-b border-border text-rose-400 font-semibold">Violates 1NF</div>
                  <table className="w-full">
                    <thead><tr className="border-b border-border/50 bg-muted/10"><th className="px-3 py-1.5 text-left text-muted-foreground font-mono text-[10px]">student_id</th><th className="px-3 py-1.5 text-left text-muted-foreground font-mono text-[10px]">courses</th></tr></thead>
                    <tbody className="divide-y divide-border/30">
                      <tr><td className="px-3 py-1.5 font-mono text-amber-300">1</td><td className="px-3 py-1.5 text-rose-300/80 font-mono text-[11px]">C101, C102</td></tr>
                      <tr><td className="px-3 py-1.5 font-mono text-amber-300">2</td><td className="px-3 py-1.5 text-rose-300/80 font-mono text-[11px]">C101</td></tr>
                    </tbody>
                  </table>
                  <p className="px-4 py-2 text-rose-400 text-[10px]">Multi-valued cell: &quot;C101, C102&quot; breaks atomicity.</p>
                </div>
                <div className="border border-emerald-500/20 rounded-lg overflow-hidden">
                  <div className="px-4 py-2 bg-muted/30 border-b border-border text-emerald-400 font-semibold">In 1NF</div>
                  <table className="w-full">
                    <thead><tr className="border-b border-border/50 bg-muted/10"><th className="px-3 py-1.5 text-left text-muted-foreground font-mono text-[10px]">student_id</th><th className="px-3 py-1.5 text-left text-muted-foreground font-mono text-[10px]">course_id</th></tr></thead>
                    <tbody className="divide-y divide-border/30">
                      <tr><td className="px-3 py-1.5 font-mono text-amber-300">1</td><td className="px-3 py-1.5 font-mono text-emerald-300/80">C101</td></tr>
                      <tr><td className="px-3 py-1.5 font-mono text-amber-300">1</td><td className="px-3 py-1.5 font-mono text-emerald-300/80">C102</td></tr>
                      <tr><td className="px-3 py-1.5 font-mono text-amber-300">2</td><td className="px-3 py-1.5 font-mono text-emerald-300/80">C101</td></tr>
                    </tbody>
                  </table>
                  <p className="px-4 py-2 text-emerald-400 text-[10px]">One value per cell. PK = (student_id, course_id).</p>
                </div>
              </div>

              <div className="bg-muted/50 border-l-4 border-sky-500/50 rounded-md px-5 py-3 text-sm text-foreground/80">
                Our STUDENT_COURSE table <strong>is already in 1NF</strong> — each cell is atomic and we have a composite PK (student_id, course_id).
                The problems it has are partial and transitive dependencies — addressed by 2NF and 3NF.
              </div>
            </section>

            {/* ── 2NF ───────────────────────────────────────────────── */}
            <section id="2nf">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Second Normal Form (2NF)
              </h2>
              <p className="mb-2">
                A table is in <strong>2NF</strong> if it is in 1NF and has <strong>no partial dependencies</strong> — every non-key attribute must depend on the entire primary key, not just part of it.
              </p>
              <p className="mb-5 text-sm text-muted-foreground">
                2NF only matters when the PK is composite. If PK is a single column, 1NF → 2NF automatically.
              </p>

              <div className="border border-rose-500/20 rounded-lg p-4 text-xs mb-5 space-y-2">
                <p className="text-rose-400 font-semibold">Partial dependencies in STUDENT_COURSE — PK = (student_id, course_id)</p>
                <div className="font-mono space-y-1 text-[11px]">
                  <p className="text-foreground/70"><span className="text-rose-400">student_id → student_name, dept_id, dept_name</span> &nbsp;← depends on PART of PK only</p>
                  <p className="text-foreground/70"><span className="text-rose-400">course_id  → course_name, instructor</span> &nbsp;← depends on PART of PK only</p>
                  <p className="text-foreground/70"><span className="text-emerald-400">(student_id, course_id) → grade</span> &nbsp;← full dependency ✓</p>
                </div>
              </div>

              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Fix — split into separate tables</p>
              <div className="grid grid-cols-3 gap-3 text-xs mb-4">
                {[
                  { name: "STUDENT", pk: "student_id PK", cols: ["name", "dept_id", "dept_name"], color: "text-amber-400 border-amber-500/30 bg-amber-500/5" },
                  { name: "COURSE",  pk: "course_id PK",  cols: ["course_name", "instructor"],    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5" },
                  { name: "ENROLLMENT", pk: "(student_id, course_id) PK", cols: ["grade"], color: "text-violet-400 border-violet-500/30 bg-violet-500/5" },
                ].map(({ name, pk, cols, color }) => (
                  <div key={name} className={`border rounded-lg overflow-hidden ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
                    <div className={`px-3 py-2 border-b border-border font-mono font-semibold ${color.split(" ")[0]} text-[11px]`}>{name}</div>
                    <div className="px-3 py-2 space-y-1 font-mono text-[11px]">
                      <p className="text-amber-400">{pk}</p>
                      {cols.map(c => <p key={c} className="text-foreground/70">{c}</p>)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 border-l-4 border-emerald-500/50 rounded-md px-5 py-3 text-sm text-foreground/80">
                After decomposition: no partial dependencies remain. Each non-key attribute depends on the <strong>full PK</strong> of its table.
                But STUDENT still has a problem — <code className="text-xs font-mono text-sky-300">dept_name</code> depends on <code className="text-xs font-mono text-sky-300">dept_id</code>, not directly on <code className="text-xs font-mono text-amber-300">student_id</code>. That&apos;s a transitive dependency.
              </div>
            </section>

            {/* ── 3NF ───────────────────────────────────────────────── */}
            <section id="3nf">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Third Normal Form (3NF)
              </h2>
              <p className="mb-5">
                A table is in <strong>3NF</strong> if it is in 2NF <em>and</em> has <strong>no transitive dependencies</strong> — no non-key attribute should depend on another non-key attribute.
              </p>

              <div className="border border-rose-500/20 rounded-lg p-4 text-xs mb-5 space-y-2">
                <p className="text-rose-400 font-semibold">Transitive dependency in STUDENT — PK = student_id</p>
                <div className="font-mono space-y-1 text-[11px]">
                  <p className="text-foreground/70"><span className="text-amber-300">student_id</span> → <span className="text-sky-300">dept_id</span> → <span className="text-rose-400">dept_name</span></p>
                  <p className="text-foreground/60 text-[10px]">dept_name depends on dept_id (a non-key), not directly on student_id (the PK) — 3NF violation.</p>
                </div>
                <p className="text-muted-foreground mt-1">
                  Anomaly: if CS changes its name to &quot;Computer Science&quot;, every student row in CS must be updated.
                </p>
              </div>

              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Fix — extract dept_name into its own table</p>
              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                {[
                  { name: "STUDENT", pk: "student_id PK", cols: ["name", "dept_id FK"], color: "text-amber-400 border-amber-500/30 bg-amber-500/5",    note: "dept_name removed" },
                  { name: "DEPT",    pk: "dept_id PK",    cols: ["dept_name"],          color: "text-sky-400 border-sky-500/30 bg-sky-500/5",           note: "dept_name lives here" },
                ].map(({ name, pk, cols, color, note }) => (
                  <div key={name} className={`border rounded-lg overflow-hidden ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
                    <div className={`px-4 py-2 border-b border-border flex justify-between font-mono font-semibold ${color.split(" ")[0]} text-[11px]`}>
                      <span>{name}</span>
                      <span className="text-muted-foreground font-normal">{note}</span>
                    </div>
                    <div className="px-4 py-2.5 space-y-1 font-mono text-[11px]">
                      <p className="text-amber-400">{pk}</p>
                      {cols.map(c => <p key={c} className="text-foreground/70">{c}</p>)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 border-l-4 border-emerald-500/50 rounded-md px-5 py-3 text-sm text-foreground/80">
                Now changing a dept name means updating one row in DEPT — not hundreds of student rows. Redundancy eliminated.
              </div>
            </section>

            {/* ── BCNF ──────────────────────────────────────────────── */}
            <section id="bcnf">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Boyce-Codd Normal Form (BCNF)
              </h2>
              <p className="mb-4">
                <strong>BCNF</strong> is a stricter version of 3NF. A table is in BCNF if for <em>every</em> functional dependency <span className="font-mono text-violet-300">X → Y</span>, <strong>X must be a super key</strong>.
                In 3NF, a non-key attribute can determine another attribute if it&apos;s part of a candidate key — BCNF removes even that exception.
              </p>

              <div className="border border-rose-500/20 rounded-lg p-4 text-xs mb-5 space-y-3">
                <p className="text-rose-400 font-semibold">BCNF violation example — COURSE_TEACH</p>
                <div className="font-mono text-[11px] space-y-1 text-foreground/70">
                  <p>COURSE_TEACH(student_id, course_id, instructor)</p>
                  <p className="text-muted-foreground">Rules: each student takes a course with one instructor; one instructor teaches only one course.</p>
                </div>
                <div className="font-mono space-y-1.5 text-[11px]">
                  <p><span className="text-amber-300">(student_id, course_id) → instructor</span> &nbsp;— PK determines instructor ✓</p>
                  <p><span className="text-amber-300">(student_id, instructor) → course_id</span> &nbsp;— also a candidate key ✓</p>
                  <p><span className="text-rose-400">instructor → course_id</span> &nbsp;— instructor is NOT a super key → <strong>BCNF violation!</strong></p>
                </div>
                <p className="text-muted-foreground leading-5">
                  The table is in 3NF (instructor is part of a candidate key, which 3NF allows) but fails BCNF because the non-super-key <code>instructor</code> determines <code>course_id</code>.
                </p>
              </div>

              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Fix — decompose</p>
              <div className="grid grid-cols-2 gap-3 text-xs mb-5">
                {[
                  { name: "INSTRUCTOR_COURSE", pk: "instructor PK", cols: ["course_id"], color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5" },
                  { name: "STUDENT_INSTRUCTOR", pk: "student_id PK", cols: ["instructor FK"], color: "text-violet-400 border-violet-500/30 bg-violet-500/5" },
                ].map(({ name, pk, cols, color }) => (
                  <div key={name} className={`border rounded-lg overflow-hidden ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
                    <div className={`px-4 py-2 border-b border-border font-mono font-semibold ${color.split(" ")[0]} text-[11px]`}>{name}</div>
                    <div className="px-4 py-2.5 space-y-1 font-mono text-[11px]">
                      <p className="text-amber-400">{pk}</p>
                      {cols.map(c => <p key={c} className="text-foreground/70">{c}</p>)}
                    </div>
                  </div>
                ))}
              </div>

              {/* NF Summary */}
              <div className="border border-border rounded-lg overflow-hidden text-xs">
                <div className="px-4 py-2.5 bg-muted/40 border-b border-border font-semibold text-foreground text-sm">Normal Forms — Comparison</div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/20 text-[10px]">
                      <th className="px-4 py-2 text-left text-muted-foreground font-medium">Normal Form</th>
                      <th className="px-4 py-2 text-left text-muted-foreground font-medium">Requires</th>
                      <th className="px-4 py-2 text-left text-muted-foreground font-medium">Eliminates</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {[
                      { nf: "1NF", color: "text-sky-400",     req: "Atomic values, no repeating groups, has a PK",      elim: "Multi-valued cells, repeating groups" },
                      { nf: "2NF", color: "text-emerald-400", req: "In 1NF + no partial dependencies",                  elim: "Partial dependencies on part of composite PK" },
                      { nf: "3NF", color: "text-violet-400",  req: "In 2NF + no transitive dependencies",               elim: "Non-key → non-key functional dependencies" },
                      { nf: "BCNF",color: "text-amber-400",   req: "Every FD X→Y: X must be a super key",               elim: "All FDs where LHS is not a super key" },
                    ].map(({ nf, color, req, elim }) => (
                      <tr key={nf} className="hover:bg-muted/20">
                        <td className={`px-4 py-2.5 font-bold ${color}`}>{nf}</td>
                        <td className="px-4 py-2.5 text-foreground/70">{req}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{elim}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

          </div>
        </main>

        {/* Right-side TOC */}
        <aside className="hidden lg:block w-52 flex-shrink-0">
          <div className="sticky top-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              On this page
            </p>
            <nav className="space-y-1">
              {sections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-0.5"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

      </div>
    </div>
  );
}
