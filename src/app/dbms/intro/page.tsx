const sections = [
  { id: "what-is-data", label: "What is Data?" },
  { id: "data-hierarchy", label: "Data Hierarchy" },
  { id: "information", label: "Information" },
  { id: "what-is-a-database", label: "What is a Database?" },
  { id: "file-system", label: "File System & its Problems" },
  { id: "types-of-databases", label: "Types of Databases" },
  { id: "characteristics", label: "Characteristics" },
  { id: "sql-vs-nosql", label: "SQL vs NoSQL" },
  { id: "components-of-dbms", label: "Components of DBMS" },
  { id: "data-abstraction", label: "Data Abstraction" },
  { id: "views", label: "Views" },
  { id: "schema", label: "Schema" },
  { id: "dbms-architecture", label: "DBMS Architecture" },
  { id: "users-of-dbms", label: "Users of DBMS" },
];

export default function IntroToDBMS() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16 flex gap-12">

        {/* Main content */}
        <main className="flex-1 min-w-0">

          {/* Header */}
          <div className="mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/30 rounded-full px-3 py-1">
              DBMS · Introduction
            </span>
            <h1 className="mt-3 text-4xl tracking-tight text-foreground font-heading">
              Intro to DBMS
            </h1>
            <p className="mt-4 text-xl text-muted-foreground leading-relaxed">
              Everything starts with data. Let&apos;s build up from the basics.
            </p>
          </div>

          <div className="space-y-14 text-foreground/80 text-base leading-7">

            {/* What is Data */}
            <section id="what-is-data">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3 pb-2 border-b border-border">
                What is Data?
              </h2>
              <p>
                Data is raw, unprocessed facts — numbers, words, symbols, or observations
                that on their own have no meaning.
              </p>
              <div className="mt-3 bg-card border border-border rounded-lg px-5 py-4 text-sm text-muted-foreground">
                <strong>Example:</strong> <code>93</code>, <code>Alice</code>, <code>2024-01-15</code>{" "}— just raw values, nothing more.
              </div>
            </section>

            {/* Data Hierarchy */}
            <section id="data-hierarchy">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3 pb-2 border-b border-border">
                Data Hierarchy
              </h2>
              <p className="mb-5">
                Data is organised in levels, each building on the one below it.
              </p>
              <div className="space-y-3">
                {[
                  { level: "Bit", desc: "Smallest unit — a 0 or 1." },
                  { level: "Byte", desc: "8 bits. Represents one character, e.g. 'A'." },
                  { level: "Field", desc: "A single meaningful attribute, e.g. Name = \"Alice\"." },
                  { level: "Record (Tuple)", desc: "A collection of related fields for one entity, e.g. one student's row." },
                  { level: "File", desc: "A collection of related records, e.g. all students." },
                  { level: "Database", desc: "A collection of related files / tables organised for efficient access." },
                ].map(({ level, desc }, i) => (
                  <div key={level} className="flex gap-4 items-start">
                    <span className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center ${['bg-sky-500/20 text-sky-400','bg-violet-500/20 text-violet-400','bg-emerald-500/20 text-emerald-400','bg-amber-500/20 text-amber-400','bg-pink-500/20 text-pink-400','bg-indigo-500/20 text-indigo-400'][i % 6]}`}>
                      {i + 1}
                    </span>
                    <p>
                      <span className="font-medium text-foreground">{level}</span>
                      {" — "}
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Information */}
            <section id="information">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3 pb-2 border-b border-border">
                Information
              </h2>
              <p>
                Information is data that has been <strong>processed and given context</strong>{" "}so it
                becomes meaningful and useful for decision-making.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="font-semibold text-amber-400 uppercase tracking-wide text-xs mb-2">Data</p>
                  <p className="text-foreground/80">93, Alice, Math</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="font-semibold text-emerald-400 uppercase tracking-wide text-xs mb-2">Information</p>
                  <p className="text-foreground/80">Alice scored 93 in Math.</p>
                </div>
              </div>
            </section>

            {/* Database */}
            <section id="what-is-a-database">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3 pb-2 border-b border-border">
                What is a Database?
              </h2>
              <p>
                A <strong>database</strong>{" "}is an organised collection of structured data stored
                electronically so it can be easily accessed, managed, and updated.
              </p>
              <p className="mt-3">
                A <strong>DBMS (Database Management System)</strong>{" "}is the software that sits between
                the user and the database — it handles storing, retrieving, and securing data.
                Examples: MySQL, PostgreSQL, Oracle, MongoDB.
              </p>
            </section>

            {/* File System */}
            <section id="file-system">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3 pb-2 border-b border-border">
                File System &amp; Why We Moved to DBMS
              </h2>
              <p className="mb-4">
                Before databases, data was stored in <strong>flat files</strong>{" "}on the OS — think
                Excel sheets or plain <code>.txt</code>{" "}files managed by the application itself.
                Each department would maintain its own files: HR had <code>employees.txt</code>,
                Payroll had <code>salaries.txt</code>, both storing employee data separately.
              </p>

              <h3 className="font-heading text-base font-semibold text-foreground mb-3">Problems with File Systems</h3>
              <div className="space-y-3 text-sm mb-8">
                {[
                  {
                    problem: "Data Redundancy",
                    detail: "The same data is stored in multiple files. Employee name and address saved in both HR and Payroll files.",
                    impact: "Wastes storage and causes inconsistency — update one file, the other is now stale.",
                  },
                  {
                    problem: "Data Inconsistency",
                    detail: "When the same data exists in multiple places, updates often only happen in one place.",
                    impact: "HR shows Alice's address as Delhi, Payroll still shows Mumbai.",
                  },
                  {
                    problem: "Difficult Data Access",
                    detail: "To answer a question like \u201clist all employees earning > ₹50k in Delhi\u201d, you\u2019d have to write a custom program to parse and join multiple files.",
                    impact: "No ad-hoc querying — every new question needs new code.",
                  },
                  {
                    problem: "No Concurrent Access",
                    detail: "If two programs write to the same file at the same time, data gets corrupted.",
                    impact: "File systems have no locking or transaction management built in.",
                  },
                  {
                    problem: "Security Issues",
                    detail: "File systems offer access control only at the file level — you can either read the whole file or nothing.",
                    impact: "No way to say \u201cthis user can see salaries but not bank account numbers\u201d.",
                  },
                  {
                    problem: "Data Isolation",
                    detail: "Data is scattered across different files in different formats (.csv, .txt, binary).",
                    impact: "Hard to combine and analyse data across departments.",
                  },
                  {
                    problem: "No Crash Recovery",
                    detail: "If a program crashes mid-write, the file is left in a half-written, corrupt state.",
                    impact: "No rollback mechanism — data is permanently damaged.",
                  },
                ].map(({ problem, detail, impact }) => (
                  <div key={problem} className="border border-border border-l-4 border-l-red-500/50 rounded-lg p-5">
                    <p className="font-semibold text-red-400">{problem}</p>
                    <p className="mt-1 text-foreground/80">{detail}</p>
                    <div className="mt-2 flex gap-2 items-start text-sm text-muted-foreground">
                      <span className="mt-0.5 flex-shrink-0 text-amber-400">→</span>
                      <span>{impact}</span>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="font-heading text-base font-semibold text-foreground mb-3">Why DBMS Solves This</h3>
              <div className="bg-card border border-border rounded-lg overflow-hidden text-sm">
                <div className="grid grid-cols-2 bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                  <div className="px-4 py-3">File System Problem</div>
                  <div className="px-4 py-3 border-l border-border text-emerald-400">DBMS Solution</div>
                </div>
                {[
                  ["Data Redundancy",       "Normalisation — store each piece of data once, reference it everywhere"],
                  ["Data Inconsistency",    "Single source of truth — update once, reflected everywhere"],
                  ["Difficult Access",      "SQL — powerful query language for any question without custom code"],
                  ["No Concurrent Access",  "Transactions & locks — safe simultaneous reads and writes"],
                  ["Weak Security",         "Role-based access — control at table, row, or column level"],
                  ["No Crash Recovery",     "ACID transactions — automatic rollback on failure"],
                ].map(([problem, solution], i) => (
                  <div key={problem} className={`grid grid-cols-2 ${i % 2 === 0 ? "" : "bg-muted/40"}`}>
                    <div className="px-4 py-3 text-foreground/80">{problem}</div>
                    <div className="px-4 py-3 border-l border-border text-emerald-400">{solution}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Types of Database */}
            <section id="types-of-databases">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Types of Databases
              </h2>
              <div className="space-y-4">
                {[
                  {
                    name: "Relational (RDBMS)",
                    desc: "Stores data in tables (rows & columns) with relationships between them. Uses SQL.",
                    eg: "MySQL, PostgreSQL, Oracle",
                  },
                  {
                    name: "NoSQL",
                    desc: "Flexible schemas — stores data as documents, key-value pairs, graphs, or columns. Great for unstructured data.",
                    eg: "MongoDB, Redis, Cassandra",
                  },
                  {
                    name: "Object-Oriented",
                    desc: "Data stored as programming objects with attributes and methods — good for complex, deeply nested data. Note: AWS S3 is object storage (stores files as blobs by key), not an object-oriented DB.",
                    eg: "db4o, ObjectDB",
                  },
                ].map(({ name, desc, eg }, i) => (
                  <div key={name} className={`border border-border rounded-lg p-5 border-l-4 ${["border-l-sky-500/60","border-l-violet-500/60","border-l-amber-500/60"][i % 3]}`}>
                    <p className={`font-semibold ${["text-sky-400","text-violet-400","text-amber-400"][i % 3]}`}>{name}</p>
                    <p className="mt-1 text-sm">{desc}</p>
                    <p className="mt-2 text-sm text-muted-foreground"><span className="font-medium text-sky-400">e.g.</span>{" "}{eg}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Characteristics */}
            <section id="characteristics">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Characteristics of a Database
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  { title: "Data Integrity", desc: "Rules (constraints) ensure data is accurate and consistent at all times." },
                  { title: "Data Security", desc: "Access control ensures only authorised users can read or modify data." },
                  { title: "Concurrent Access", desc: "Multiple users can read/write simultaneously without corrupting data — managed via locks and transactions." },
                  { title: "Data Independence", desc: "Changing storage structure or physical layout doesn't break the application layer." },
                  { title: "Scalability", desc: "The database can handle growing amounts of data and users without redesign." },
                  { title: "Minimal Redundancy", desc: "Same data isn't stored in multiple places unnecessarily, reducing inconsistency." },
                ].map(({ title, desc }, i) => (
                  <div key={title} className={`bg-card border border-border rounded-lg p-4 border-l-4 ${["border-l-sky-500/60","border-l-violet-500/60","border-l-emerald-500/60","border-l-amber-500/60","border-l-pink-500/60","border-l-indigo-500/60"][i % 6]}`}>
                    <p className={`font-medium ${["text-sky-400","text-violet-400","text-emerald-400","text-amber-400","text-pink-400","text-indigo-400"][i % 6]}`}>{title}</p>
                    <p className="mt-1 text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SQL vs NoSQL */}
            <section id="sql-vs-nosql">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                SQL vs NoSQL
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div className="bg-card border border-border border-l-4 border-l-sky-500/60 rounded-lg p-5">
                  <p className="font-semibold text-sky-400 mb-1">SQL</p>
                  <p className="text-xs text-muted-foreground">Structured Query Language databases</p>
                </div>
                <div className="bg-card border border-border border-l-4 border-l-violet-500/60 rounded-lg p-5">
                  <p className="font-semibold text-violet-400 mb-1">NoSQL</p>
                  <p className="text-xs text-muted-foreground">Not Only SQL databases</p>
                </div>
              </div>

              {/* Comparison table */}
              <div className="border border-border rounded-lg overflow-hidden text-sm mb-10">
                <div className="grid grid-cols-3 bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                  <div className="px-4 py-3">Feature</div>
                  <div className="px-4 py-3 border-l border-border text-sky-400">SQL</div>
                  <div className="px-4 py-3 border-l border-border text-violet-400">NoSQL</div>
                </div>
                {[
                  ["Data Model",      "Tables (rows & columns)",         "Documents, key-value, graph, column"],
                  ["Schema",          "Fixed — defined upfront",         "Flexible — can change anytime"],
                  ["Query Language",  "SQL (standardised)",              "Varies by DB (no universal standard)"],
                  ["Relationships",   "JOINs across tables",             "Embedded data or application-level joins"],
                  ["Scaling",         "Vertical (bigger machine)",       "Horizontal (more machines)"],
                  ["Transactions",    "ACID guaranteed",                 "Eventual consistency (BASE) by default"],
                  ["Best for",        "Structured, relational data",     "Large-scale, unstructured or fast-changing data"],
                ].map(([feature, sql, nosql], i) => (
                  <div
                    key={feature}
                    className={`grid grid-cols-3 ${i % 2 === 0 ? "" : "bg-muted/40"}`}
                  >
                    <div className="px-4 py-3 font-medium text-foreground">{feature}</div>
                    <div className="px-4 py-3 border-l border-border text-foreground/80">{sql}</div>
                    <div className="px-4 py-3 border-l border-border text-foreground/80">{nosql}</div>
                  </div>
                ))}
              </div>

              {/* SQL deep dive */}
              <h3 className="font-heading text-base font-semibold text-foreground mb-3">SQL Databases</h3>
              <p className="mb-4">
                SQL databases store data in <strong>tables</strong>{" "}with predefined schemas. Every row follows
                the same structure, and tables relate to each other through <strong>foreign keys</strong>.
                They guarantee <strong>ACID</strong>{" "}properties:
              </p>
              <div className="space-y-3 text-sm mb-8">
                {[
                  {
                    title: "Atomicity",
                    desc: "A transaction is all-or-nothing. If any step fails, the entire transaction rolls back — the DB is left unchanged.",
                    example: "You transfer ₹500 from Account A to B. This involves two steps: debit A, credit B. If the credit fails after the debit, Atomicity rolls back the debit too. No money is lost.",
                  },
                  {
                    title: "Consistency",
                    desc: "A transaction must take the database from one valid state to another, respecting all rules and constraints.",
                    example: "A bank rule says balance can't go below ₹0. If a transaction tries to withdraw ₹1000 from an account with ₹200, it is rejected — the DB stays consistent.",
                  },
                  {
                    title: "Isolation",
                    desc: "Concurrent transactions execute as if they were serial — one doesn't see the intermediate state of another.",
                    example: "Two people book the last seat on a flight at the same time. Isolation ensures only one booking succeeds — the second transaction doesn't see the seat as available once the first locks it.",
                  },
                  {
                    title: "Durability",
                    desc: "Once a transaction is committed, it is permanent — even if the system crashes immediately after.",
                    example: "You place an order and get a confirmation. The server crashes a second later. When it restarts, your order is still there because the commit was written to disk.",
                  },
                ].map(({ title, desc, example }, i) => {
                  const acidColors = [['border-l-amber-500/60','text-amber-400'],['border-l-emerald-500/60','text-emerald-400'],['border-l-violet-500/60','text-violet-400'],['border-l-sky-500/60','text-sky-400']];
                  const [bc, tc] = acidColors[i] || acidColors[0];
                  return (
                  <div key={title} className={`border border-border border-l-4 ${bc} rounded-lg p-5`}>
                    <p className={`font-semibold ${tc}`}>{title}</p>
                    <p className="mt-1 text-foreground/80">{desc}</p>
                    <div className="mt-3 bg-muted/50 border-l-4 border-sky-500/40 rounded-md px-4 py-3 text-muted-foreground">
                      <span className="font-medium text-sky-400">Example: </span>{example}
                    </div>
                  </div>
                  );
                })}
              </div>
              <p className="mb-10 text-sm">
                <span className="font-medium text-foreground">When to use SQL:</span> financial systems,
                e-commerce orders, user auth — anywhere data integrity and complex queries matter.
              </p>

              {/* NoSQL deep dive */}
              <h3 className="font-heading text-base font-semibold text-foreground mb-3">NoSQL Databases</h3>
              <p className="mb-4">
                NoSQL databases trade strict consistency for <strong>speed and scale</strong>. They come in
                four main types:
              </p>
              <div className="space-y-3 text-sm mb-6">
                {[
                  {
                    type: "Document",
                    desc: "Stores data as JSON-like documents. Each document can have a different structure.",
                    eg: "MongoDB, CouchDB",
                    use: "User profiles, product catalogues, CMS",
                  },
                  {
                    type: "Key-Value",
                    desc: "Simplest model — a unique key maps to a value (string, list, hash). Extremely fast.",
                    eg: "Redis, DynamoDB",
                    use: "Caching, session storage, leaderboards",
                  },
                  {
                    type: "Column-Family",
                    desc: "Stores data in columns rather than rows — optimised for reading large datasets.",
                    eg: "Cassandra, HBase",
                    use: "Time-series data, analytics, IoT",
                  },
                  {
                    type: "Graph",
                    desc: "Stores nodes (entities) and edges (relationships). Best for highly connected data.",
                    eg: "Neo4j, Amazon Neptune",
                    use: "Social networks, fraud detection, recommendations",
                  },
                ].map(({ type, desc, eg, use }) => (
                  <div key={type} className="border border-border rounded-lg p-5">
                    <p className="font-semibold text-foreground">{type}</p>
                    <p className="mt-1 text-foreground/80">{desc}</p>
                    <div className="mt-3 flex gap-6 text-sm text-muted-foreground">
                      <span><span className="font-medium text-sky-400">e.g.</span> {eg}</span>
                      <span><span className="font-medium text-violet-400">Use:</span> {use}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm">
                <span className="font-medium text-foreground">When to use NoSQL:</span> real-time feeds,
                chat apps, large-scale analytics — anywhere you need horizontal scale or flexible schemas.
              </p>
            </section>

            {/* Components of DBMS */}
            <section id="components-of-dbms">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Components of DBMS
              </h2>
              <p className="mb-6">
                A DBMS is not a single program — it is made up of several interconnected components,
                each responsible for a specific job.
              </p>

              <div className="space-y-4 text-sm">
                {[
                  {
                    name: "Hardware",
                    desc: "The physical devices the DBMS runs on — servers, storage disks, RAM, and network infrastructure. The performance of the hardware directly affects DB speed.",
                    eg: "Hard drives (HDD/SSD), RAM, servers",
                  },
                  {
                    name: "Software",
                    desc: "The DBMS program itself, along with the OS and any application programs that access the database. This is the layer users interact with.",
                    eg: "MySQL, PostgreSQL, Oracle DB, MongoDB",
                  },
                  {
                    name: "Data",
                    desc: "The actual stored data plus the metadata (data about data). Metadata describes the structure — table names, column types, constraints, relationships.",
                    eg: "User records, product info, transaction logs",
                  },
                  {
                    name: "Query Processor",
                    desc: "Interprets and executes queries written by users. It parses the query, checks it for errors, optimises it for performance, then executes it.",
                    eg: "SQL parser, query optimiser, execution engine",
                  },
                  {
                    name: "Storage Manager",
                    desc: "Manages how data is physically stored on disk and retrieved into memory. Handles buffer management, file organisation, and indexing.",
                    eg: "Buffer pool, file manager, index manager",
                  },
                  {
                    name: "Transaction Manager",
                    desc: "Ensures that all transactions follow ACID properties. Manages concurrency control (locks) and crash recovery (logs and rollback).",
                    eg: "Lock manager, log manager, recovery module",
                  },
                  {
                    name: "Data Dictionary (Catalog)",
                    desc: "A system table that stores metadata — the schema of all tables, column definitions, constraints, user permissions, and indexes. The DBMS consults it before executing any query.",
                    eg: "INFORMATION_SCHEMA in MySQL/PostgreSQL",
                  },
                  {
                    name: "Users",
                    desc: "The people who interact with the DBMS at different levels.",
                    eg: null,
                    users: [
                      { role: "DBA (Database Administrator)", duty: "Manages the DB — schema design, performance tuning, backups, access control." },
                      { role: "Application Programmer", duty: "Writes code that queries the DB via APIs or SQL." },
                      { role: "End User", duty: "Uses applications that talk to the DB — usually unaware of the underlying structure." },
                    ],
                  },
                ].map(({ name, desc, eg, users }, i) => (
                  <div key={name} className={`border border-border border-l-4 ${["border-l-sky-500/60","border-l-violet-500/60","border-l-emerald-500/60","border-l-amber-500/60","border-l-pink-500/60","border-l-indigo-500/60","border-l-cyan-500/60","border-l-rose-500/60"][i%8]} rounded-lg p-5`}>
                    <p className={`font-semibold ${["text-sky-400","text-violet-400","text-emerald-400","text-amber-400","text-pink-400","text-indigo-400","text-cyan-400","text-rose-400"][i%8]}`}>{name}</p>
                    <p className="mt-1 text-foreground/80">{desc}</p>
                    {eg && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        <span className="font-medium text-sky-400">e.g.</span> {eg}
                      </p>
                    )}
                    {users && (
                      <div className="mt-3 space-y-2">
                        {users.map(({ role, duty }) => (
                          <div key={role} className="bg-muted/50 rounded-md px-4 py-2">
                            <span className="font-medium text-foreground/90">{role}</span>
                            <span className="text-muted-foreground"> — {duty}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Data Abstraction */}
            <section id="data-abstraction">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Data Abstraction
              </h2>
              <p className="mb-4">
                A DBMS hides the complexity of how data is stored and managed from users. This hiding
                is called <strong>data abstraction</strong>. It is achieved through <strong>three levels</strong>,
                each showing a different view of the same data.
              </p>
              <p className="mb-8">
                Think of it like a hospital system — a doctor, a receptionist, and a sysadmin all
                interact with patient data but see very different things.
              </p>

              {/* Three levels */}
              <div className="space-y-4 text-sm mb-10">
                {[
                  {
                    level: "1",
                    name: "Physical Level",
                    aka: "Internal Level",
                    who: "Database engineers & sysadmins",
                    desc: "The lowest level. Describes how data is actually stored on disk — file formats, storage blocks, indexes, compression, and access paths. Users never see this.",
                    example: "Patient data is stored as a B-tree index on a 512-byte block. The name field is stored as a fixed-length 50-byte char array at offset 0.",
                  },
                  {
                    level: "2",
                    name: "Logical Level",
                    aka: "Conceptual Level",
                    who: "DBAs & backend developers",
                    desc: "The middle level. Describes what data is stored and the relationships between them — tables, columns, data types, constraints, and foreign keys. Physical storage details are hidden.",
                    example: "Table: Patient(id INT, name VARCHAR(50), age INT, doctor_id INT). Table: Doctor(id INT, name VARCHAR(50), dept VARCHAR(30)).",
                  },
                  {
                    level: "3",
                    name: "View Level",
                    aka: "External Level",
                    who: "End users & applications",
                    desc: "The highest level. Each user or application sees only the part of the data relevant to them. Multiple views can exist over the same logical schema — sensitive fields are hidden.",
                    example: "Doctor sees: Patient name, age, diagnosis. Receptionist sees: Patient name, appointment date, room number. Neither sees the other's data.",
                  },
                ].map(({ level, name, aka, who, desc, example }) => (
                  <div key={name} className="border border-border rounded-lg overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-3 bg-muted/50 border-b border-border">
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center ${['bg-sky-500/20 text-sky-400','bg-violet-500/20 text-violet-400','bg-emerald-500/20 text-emerald-400'][parseInt(level)-1] || 'bg-muted text-muted-foreground'}`}>
                        {level}
                      </span>
                      <p className="font-semibold text-foreground">{name}</p>
                      <span className="text-xs text-muted-foreground">({aka})</span>
                      <span className="ml-auto text-xs text-muted-foreground">{who}</span>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                      <p className="text-foreground/80">{desc}</p>
                      <div className="bg-muted/50 rounded-md px-4 py-3 text-muted-foreground">
                        <span className="font-medium text-sky-400">Example: </span>{example}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Data Independence */}
              <h3 className="font-heading text-base font-semibold text-foreground mb-3">
                Why Three Levels? — Data Independence
              </h3>
              <p className="mb-4">
                Separating the levels means changes at one level don&apos;t break the others.
                This is called <strong>data independence</strong>{" "}and comes in two types:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="border border-border rounded-lg p-5">
                  <p className="font-semibold text-foreground">Physical Independence</p>
                  <p className="mt-1 text-foreground/80">
                    You can change how data is stored on disk (e.g. switch from HDD to SSD, change indexing)
                    without touching the logical schema or rewriting application code.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-5">
                  <p className="font-semibold text-foreground">Logical Independence</p>
                  <p className="mt-1 text-foreground/80">
                    You can change the logical schema (e.g. add a new column, split a table)
                    without breaking the views or applications that depend on the old structure.
                  </p>
                </div>
              </div>
            </section>

            {/* Views */}
            <section id="views">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Views
              </h2>
              <p className="mb-4">
                A <strong>view</strong>{" "}is a virtual table created from a <strong>SELECT query</strong>.
                It has no data of its own — it pulls data from the underlying real tables every time
                it is queried. Think of it as a saved query with a name.
              </p>

              <div className="bg-card border border-border rounded-lg px-5 py-4 text-sm mb-6">
                <p className="font-semibold text-foreground mb-2">What does &ldquo;virtual&rdquo; mean?</p>
                <p className="text-foreground/80 mb-3">
                  A <strong>real table</strong>{" "}physically exists on disk — it has rows stored in memory that
                  you can point to. A <strong>virtual table</strong>{" "}does not exist on disk at all.
                  It is just a stored SQL query. When you query a view, the DBMS internally replaces
                  your query with the view&apos;s definition and runs it against the real tables.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-muted/50 rounded-md p-3">
                    <p className="font-medium text-foreground mb-1">Real Table</p>
                    <p className="text-muted-foreground">Rows are stored on disk. <code>SELECT * FROM Employee</code>{" "}reads actual data from storage.</p>
                  </div>
                  <div className="bg-muted/50 rounded-md p-3">
                    <p className="font-medium text-foreground mb-1">View (Virtual Table)</p>
                    <p className="text-muted-foreground">No rows on disk. <code>SELECT * FROM HR_View</code>{" "}is silently rewritten to the underlying SELECT query and executed.</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg px-5 py-4 text-sm text-muted-foreground mb-8">
                <p className="font-medium text-foreground mb-2">Syntax</p>
                <code className="block whitespace-pre text-sky-400">{`CREATE VIEW view_name AS
SELECT column1, column2
FROM table_name
WHERE condition;`}</code>
              </div>

              {/* Example */}
              <h3 className="font-heading text-base font-semibold text-foreground mb-3">Example</h3>
              <p className="mb-3 text-sm">
                Suppose you have an <code>Employee</code>{" "}table with columns:
                id, name, salary, department, bank_account.
                You want the HR team to see names and departments — but <strong>not salaries or bank details</strong>.
              </p>
              <div className="bg-card border border-border rounded-lg px-5 py-4 text-sm mb-8">
                <code className="block whitespace-pre text-sky-400">{`CREATE VIEW HR_View AS
SELECT id, name, department
FROM Employee;`}</code>
                <p className="mt-3 text-muted-foreground">
                  HR now queries <code>HR_View</code>{" "}and only ever sees id, name, department —
                  salary and bank_account are completely hidden.
                </p>
              </div>

              {/* Properties */}
              <h3 className="font-heading text-base font-semibold text-foreground mb-3">Properties of Views</h3>
              <div className="space-y-3 text-sm mb-8">
                {[
                  {
                    title: "Virtual — no stored data",
                    desc: "A view stores only the query definition, not the result. Every time you query a view, it runs the underlying SELECT fresh against the real tables.",
                  },
                  {
                    title: "Security & Access Control",
                    desc: "Grant users access to a view instead of the base table. They see only what the view exposes — sensitive columns remain hidden.",
                  },
                  {
                    title: "Simplicity",
                    desc: "Complex joins or aggregations can be wrapped in a view. Users query it like a simple table without knowing the complexity underneath.",
                  },
                  {
                    title: "Data Independence",
                    desc: "If the underlying table structure changes, you can update the view definition instead of rewriting every application query that depended on it.",
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="border border-border rounded-lg p-5">
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="mt-1 text-foreground/80">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Updatable views */}
              <h3 className="font-heading text-base font-semibold text-foreground mb-3">Can You Update a View?</h3>
              <p className="mb-4 text-sm text-foreground/80">
                Remember — a view has no data of its own. So when you &ldquo;update a view&rdquo;,
                you are actually updating the <strong>real table behind it</strong>. The DBMS needs
                to figure out which row in which real table to change.
              </p>

              <div className="space-y-3 text-sm mb-2">
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-5 py-3 bg-muted/50 border-b border-border">
                    <p className="font-semibold text-foreground">✓ Updatable View — simple, single table</p>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    <code className="block whitespace-pre text-sky-400 text-xs">{`CREATE VIEW HR_View AS
SELECT emp_id, name, department FROM Employee;

-- This update works ✓
UPDATE HR_View SET name = 'Bob' WHERE emp_id = 1;`}</code>
                    <p className="text-foreground/80">
                      The DBMS can trace this back easily — <code>HR_View</code>{" "}maps directly to
                      the <code>Employee</code>{" "}table. It knows exactly which row to update.
                    </p>
                  </div>
                </div>

                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-5 py-3 bg-muted/50 border-b border-border">
                    <p className="font-semibold text-foreground">✗ Read-only View — join across two tables</p>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    <code className="block whitespace-pre text-sky-400 text-xs">{`CREATE VIEW EmpDept_View AS
SELECT e.name, d.dept_name
FROM Employee e JOIN Department d ON e.dept_id = d.dept_id;

-- This update FAILS ✗
UPDATE EmpDept_View SET dept_name = 'Finance' WHERE name = 'Alice';`}</code>
                    <p className="text-foreground/80">
                      The DBMS is confused — <code>dept_name</code>{" "}comes from the <code>Department</code>{" "}table,
                      but the view mixes columns from two tables. Should it update <code>Department</code>{" "}for
                      just Alice, or for everyone in that dept? It cannot decide, so it rejects the update.
                    </p>
                  </div>
                </div>

                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-5 py-3 bg-muted/50 border-b border-border">
                    <p className="font-semibold text-foreground">✗ Read-only View — aggregation</p>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    <code className="block whitespace-pre text-sky-400 text-xs">{`CREATE VIEW DeptSalary_View AS
SELECT department, AVG(salary) AS avg_salary
FROM Employee GROUP BY department;

-- This update FAILS ✗
UPDATE DeptSalary_View SET avg_salary = 80000 WHERE department = 'IT';`}</code>
                    <p className="text-foreground/80">
                      <code>avg_salary</code>{" "}is a calculated value across many rows — it is not
                      a real column stored anywhere. The DBMS has no idea which individual salaries
                      to change to make the average 80000.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Schema */}
            <section id="schema">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Schema
              </h2>
              <p className="mb-4">
                A <strong>schema</strong>{" "}is the overall design or blueprint of a database — it
                describes what tables exist, what columns they have, their data types, constraints,
                and how they relate to each other. The schema is the structure; the actual records
                are the data.
              </p>
              <div className="bg-card border border-border rounded-lg px-5 py-4 text-sm text-muted-foreground mb-8">
                Schema = structure &nbsp;|&nbsp; Data = the actual content stored inside that structure.
                <br />
                Just like a class definition in OOP is the schema, and objects are the data.
              </div>

              <p className="mb-6 text-sm">
                The ANSI/SPARC model defines <strong>three schemas</strong>, directly mapping to the
                three levels of data abstraction:
              </p>

              <div className="space-y-4 text-sm mb-10">
                {[
                  {
                    level: "1",
                    name: "Internal Schema",
                    maps: "Physical Level",
                    desc: "Describes how data is physically stored — file structures, storage formats, indexes, access paths, and memory allocation. Written and managed by the DBMS engine, not by developers.",
                    example: `Employee records stored as a clustered B+ tree indexed on emp_id.
Name field: CHAR(50) at byte offset 0.
Salary field: INT at byte offset 50.
Index file: emp_id → disk block pointer.`,
                  },
                  {
                    level: "2",
                    name: "Conceptual Schema",
                    maps: "Logical Level",
                    desc: "Describes the entire logical structure of the database — all tables, columns, data types, relationships, constraints, and keys. This is what DBAs and developers work with. There is only one conceptual schema per database.",
                    example: `Employee(emp_id INT PRIMARY KEY,
         name VARCHAR(50),
         salary INT,
         dept_id INT FOREIGN KEY → Department.dept_id)

Department(dept_id INT PRIMARY KEY,
           dept_name VARCHAR(30))`,
                  },
                  {
                    level: "3",
                    name: "External Schema",
                    maps: "View Level",
                    desc: "Defines the part of the database a specific user or application can see. There can be many external schemas over the same conceptual schema. Each is typically implemented as a view.",
                    example: `-- HR team's external schema
CREATE VIEW HR_View AS
SELECT emp_id, name, dept_id FROM Employee;

-- Payroll team's external schema
CREATE VIEW Payroll_View AS
SELECT emp_id, name, salary FROM Employee;`,
                  },
                ].map(({ level, name, maps, desc, example }) => (
                  <div key={name} className="border border-border rounded-lg overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-3 bg-muted/50 border-b border-border">
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center ${['bg-sky-500/20 text-sky-400','bg-violet-500/20 text-violet-400','bg-emerald-500/20 text-emerald-400'][parseInt(level)-1] || 'bg-muted text-muted-foreground'}`}>
                        {level}
                      </span>
                      <p className="font-semibold text-foreground">{name}</p>
                      <span className="ml-auto text-xs text-muted-foreground">maps to → {maps}</span>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                      <p className="text-foreground/80">{desc}</p>
                      <div className="bg-card border border-border rounded-lg px-4 py-3">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Example</p>
                        <code className="block whitespace-pre text-sky-400 text-xs leading-6">{example}</code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="font-heading text-base font-semibold text-foreground mb-3">Schema vs Instance</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="border border-border rounded-lg p-5">
                  <p className="font-semibold text-foreground">Schema</p>
                  <p className="mt-1 text-foreground/80">
                    The structure — table definitions, column types, constraints. Changes rarely
                    (only when the design changes).
                  </p>
                  <p className="mt-2 text-muted-foreground">Analogy: the blueprint of a building.</p>
                </div>
                <div className="border border-border rounded-lg p-5">
                  <p className="font-semibold text-foreground">Instance</p>
                  <p className="mt-1 text-foreground/80">
                    The actual data in the database at a given point in time. Changes constantly
                    as records are inserted, updated, or deleted.
                  </p>
                  <p className="mt-2 text-muted-foreground">Analogy: the building at a specific moment with all its occupants.</p>
                </div>
              </div>
            </section>

            {/* DBMS Architecture */}
            <section id="dbms-architecture">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                DBMS Architecture
              </h2>
              <p className="mb-8 text-sm text-foreground/80">
                DBMS architecture defines how the client, application logic, and database are
                structured and separated. There are three models — 1-tier, 2-tier, and 3-tier.
              </p>

              {/* Arrow helper */}
              {(() => {
                const Arrow = ({ label }: { label: string }) => (
                  <div className="flex flex-col items-center py-1">
                    <div className="w-px h-4 bg-border" />
                    <div className="text-xs text-muted-foreground px-3 py-1 border border-border rounded-full bg-card">{label}</div>
                    <div className="w-px h-4 bg-border" />
                    <svg width="12" height="8" viewBox="0 0 12 8" className="fill-muted-foreground"><path d="M6 8L0 0h12z"/></svg>
                  </div>
                );

                const Box = ({ badge, badgeColor, borderColor, bgColor, title, sub, tags, tagColor }: {
                  badge: string; badgeColor: string; borderColor: string; bgColor: string;
                  title: string; sub: string; tags: string[]; tagColor: string;
                }) => (
                  <div className={`w-full rounded-xl border-2 ${borderColor} ${bgColor} px-6 py-4`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold uppercase tracking-widest ${badgeColor}`}>{badge}</span>
                    </div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {tags.map(t => (
                        <span key={t} className={`text-xs border rounded-md px-2 py-0.5 ${tagColor}`}>{t}</span>
                      ))}
                    </div>
                  </div>
                );

                return (
                  <div className="space-y-10 text-sm">

                    {/* 1-Tier */}
                    <div>
                      <h3 className="font-heading text-base font-semibold text-foreground mb-1">1-Tier Architecture</h3>
                      <p className="text-foreground/80 mb-3">
                        Everything — the UI, business logic, and database — runs on the <strong>same machine</strong>.
                        The user directly interacts with the DBMS. No network involved.
                        Used by developers locally or in simple single-user applications.
                      </p>
                      <div className="bg-muted/50 border-l-4 border-amber-500/50 rounded-lg px-4 py-3 mb-4 text-foreground/80">
                        <span className="font-medium text-amber-400">Real life: </span>
                        Think of the <strong>Contacts app</strong>{" "}on your phone. Your contacts are stored in a small local database on the device itself. The app, the logic (&ldquo;search by name&rdquo;), and the data all live on the same phone. No server, no internet needed.
                      </div>
                      <div className="flex flex-col items-center mb-4 select-none">
                        <Box badge="Client + Application + Database" badgeColor="text-amber-400" borderColor="border-amber-500/60" bgColor="bg-amber-500/10" title="Single Machine" sub="UI · Business Logic · DBMS · Storage — all in one" tags={["Contacts app on phone", "Notes app", "MS Access"]} tagColor="bg-amber-500/10 border-amber-500/30 text-amber-400" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-card border border-border rounded-lg p-3">
                          <p className="font-medium text-emerald-400 text-xs mb-1">✓ Pros</p>
                          <p className="text-muted-foreground text-xs">Simple setup, fast (no network), good for local dev and testing.</p>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-3">
                          <p className="font-medium text-red-400 text-xs mb-1">✗ Cons</p>
                          <p className="text-muted-foreground text-xs">Not suitable for multiple users. No separation of concerns. Hard to scale.</p>
                        </div>
                      </div>
                    </div>

                    {/* 2-Tier */}
                    <div>
                      <h3 className="font-heading text-base font-semibold text-foreground mb-1">2-Tier Architecture</h3>
                      <p className="text-foreground/80 mb-3">
                        The client and database are on <strong>separate machines</strong>.
                        The client directly sends SQL queries to the database over a network.
                        Business logic lives in the client application itself.
                      </p>
                      <div className="bg-muted/50 border-l-4 border-amber-500/50 rounded-lg px-4 py-3 mb-4 text-foreground/80">
                        <span className="font-medium text-amber-400">Real life: </span>
                        Think of an <strong>ATM machine</strong>. You insert your card and check your balance. The ATM (client) directly talks to the bank&apos;s central database over a secure network to fetch your account details. The ATM itself has the logic — but it hits the bank&apos;s DB directly. There is no separate app server in between.
                      </div>
                      <div className="flex flex-col items-center mb-4 select-none">
                        <Box badge="Tier 1 — Client" badgeColor="text-sky-400" borderColor="border-sky-500/60" bgColor="bg-sky-500/10" title="Client Application" sub="UI + Business Logic" tags={["ATM machine", "Bank desktop software", "Library management system"]} tagColor="bg-sky-500/10 border-sky-500/30 text-sky-400" />
                        <Arrow label="SQL Query / Result (over network)" />
                        <Box badge="Tier 2 — Database" badgeColor="text-emerald-400" borderColor="border-emerald-500/60" bgColor="bg-emerald-500/10" title="Database Server" sub="DBMS · Storage · Indexes" tags={["MySQL", "PostgreSQL", "Oracle"]} tagColor="bg-emerald-500/10 border-emerald-500/30 text-emerald-400" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-card border border-border rounded-lg p-3">
                          <p className="font-medium text-emerald-400 text-xs mb-1">✓ Pros</p>
                          <p className="text-muted-foreground text-xs">Simple, faster than 3-tier, multiple clients can share one DB.</p>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-3">
                          <p className="font-medium text-red-400 text-xs mb-1">✗ Cons</p>
                          <p className="text-muted-foreground text-xs">Business logic duplicated across clients. DB exposed directly — security risk. Hard to scale to thousands of users.</p>
                        </div>
                      </div>
                    </div>

                    {/* 3-Tier */}
                    <div>
                      <h3 className="font-heading text-base font-semibold text-foreground mb-1">3-Tier Architecture</h3>
                      <p className="text-foreground/80 mb-3">
                        An <strong>application server</strong>{" "}is introduced between the client and the database.
                        The client never talks to the DB directly — all requests go through the middle layer,
                        which handles business logic, auth, and validation before querying the DB.
                        This is the standard for every modern app you use today.
                      </p>
                      <div className="bg-muted/50 border-l-4 border-amber-500/50 rounded-lg px-4 py-3 mb-4 text-foreground/80">
                        <span className="font-medium text-amber-400">Real life: </span>
                        When you open <strong>Instagram</strong>{" "}and scroll your feed — your phone (Tier 1) sends a request to Instagram&apos;s servers (Tier 2), which decides what posts to show you based on your follows, likes, and algorithm. Only then does it query the database (Tier 3) to fetch those specific posts. Your phone never touches Instagram&apos;s database directly.
                      </div>
                      <div className="flex flex-col items-center mb-4 select-none">
                        <Box badge="Tier 1 — Presentation" badgeColor="text-sky-400" borderColor="border-sky-500/60" bgColor="bg-sky-500/10" title="Client" sub="Web browser · Mobile app · Desktop UI" tags={["React", "Android", "iOS"]} tagColor="bg-sky-500/10 border-sky-500/30 text-sky-400" />
                        <Arrow label="HTTP Request / Response" />
                        <Box badge="Tier 2 — Application" badgeColor="text-violet-400" borderColor="border-violet-500/60" bgColor="bg-violet-500/10" title="Application Server" sub="Business Logic · API · Auth · Validation" tags={["Node.js", "Django", "Spring Boot"]} tagColor="bg-violet-500/10 border-violet-500/30 text-violet-400" />
                        <Arrow label="SQL Query / Result Set" />
                        <Box badge="Tier 3 — Data" badgeColor="text-emerald-400" borderColor="border-emerald-500/60" bgColor="bg-emerald-500/10" title="Database Server" sub="DBMS · Storage · Indexes · Transactions" tags={["MySQL", "PostgreSQL", "MongoDB"]} tagColor="bg-emerald-500/10 border-emerald-500/30 text-emerald-400" />
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-card border border-border rounded-lg p-3">
                          <p className="font-medium text-emerald-400 text-xs mb-1">✓ Pros</p>
                          <p className="text-muted-foreground text-xs">Secure, scalable, maintainable. Each tier can scale independently. DB is never exposed to the client.</p>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-3">
                          <p className="font-medium text-red-400 text-xs mb-1">✗ Cons</p>
                          <p className="text-muted-foreground text-xs">More complex setup. Extra network hop adds slight latency.</p>
                        </div>
                      </div>

                      {/* Example */}
                      <p className="font-semibold text-foreground text-sm mb-2">Example — Zomato &ldquo;Place Order&rdquo;</p>
                      <div className="border border-border rounded-lg overflow-hidden text-sm">
                        {[
                          { tier: "Tier 1", color: "text-sky-400", label: "Client", action: "You open Zomato, pick a burger, and tap Place Order." },
                          { tier: "Tier 2", color: "text-violet-400", label: "App Server", action: "Checks if you are logged in, verifies the restaurant is open, calculates total + delivery fee, applies any coupon, and creates the order." },
                          { tier: "Tier 3", color: "text-emerald-400", label: "DB Server", action: "Saves the order record, deducts item from restaurant inventory, logs the payment, assigns a delivery partner — all in one transaction." },
                        ].map(({ tier, color, label, action }, i) => (
                          <div key={tier} className={`flex gap-4 px-5 py-3 ${i !== 2 ? "border-b border-border" : ""}`}>
                            <div className="flex-shrink-0 w-20">
                              <p className={`font-bold text-xs ${color}`}>{tier}</p>
                              <p className="text-xs text-muted-foreground">{label}</p>
                            </div>
                            <p className="text-foreground/80 text-xs">{action}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                );
              })()}
            </section>


            {/* Users of DBMS */}
            <section id="users-of-dbms">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Users of DBMS
              </h2>
              <p className="mb-6 text-sm text-foreground/80">
                A DBMS is used by different types of people, each interacting with it at a different level
                and with a different goal.
              </p>

              <div className="space-y-4 text-sm">
                {[
                  {
                    role: "Database Administrator (DBA)",
                    icon: "⚙️",
                    color: "border-l-violet-500/60",
                    titleColor: "text-violet-400",
                    responsibilities: [
                      "Designs and maintains the overall database schema.",
                      "Manages user accounts and access permissions.",
                      "Monitors performance and tunes queries and indexes.",
                      "Schedules and manages backups and recovery.",
                      "Handles upgrades, migrations, and database security.",
                    ],
                    eg: "The person at a company who decides how the employee DB is structured, who can access it, and ensures it never goes down.",
                  },
                  {
                    role: "Application Programmer",
                    icon: "💻",
                    color: "border-l-sky-500/60",
                    titleColor: "text-sky-400",
                    responsibilities: [
                      "Writes application code that interacts with the DB via SQL or an ORM.",
                      "Designs queries for fetching, inserting, updating, and deleting data.",
                      "Handles error cases like failed transactions or constraint violations.",
                      "Optimises slow queries based on execution plans.",
                    ],
                    eg: "A backend developer at Zomato writing the API that fetches nearby restaurants from the database.",
                  },
                  {
                    role: "Sophisticated / Parametric User",
                    icon: "📊",
                    color: "border-l-emerald-500/60",
                    titleColor: "text-emerald-400",
                    responsibilities: [
                      "Directly queries the database using SQL without writing full applications.",
                      "Writes complex queries, reports, and data analysis scripts.",
                      "Understands the schema well enough to navigate multiple tables.",
                    ],
                    eg: "A data analyst at a bank running SQL queries to generate monthly transaction reports or identify fraud patterns.",
                  },
                  {
                    role: "Naive / End User",
                    icon: "👤",
                    color: "border-l-amber-500/60",
                    titleColor: "text-amber-400",
                    responsibilities: [
                      "Uses applications built on top of the database — has no knowledge of SQL or the schema.",
                      "Interacts through forms, buttons, and dashboards.",
                      "Reads and writes data indirectly through the application layer.",
                    ],
                    eg: "You booking a train ticket on IRCTC — you fill a form, click Book, and the app handles all the DB queries behind the scenes.",
                  },
                  {
                    role: "Database Designer",
                    icon: "🗂️",
                    color: "border-l-pink-500/60",
                    titleColor: "text-pink-400",
                    responsibilities: [
                      "Identifies what data needs to be stored based on business requirements.",
                      "Designs the ER diagram — entities, attributes, and relationships.",
                      "Normalises the schema to remove redundancy.",
                      "Translates the ER design into actual tables, columns, and constraints.",
                    ],
                    eg: "Before building a hospital management system, the designer maps out all entities — Patient, Doctor, Appointment, Ward — and how they relate before a single table is created.",
                  },
                  {
                    role: "System Analyst",
                    icon: "🔍",
                    color: "border-l-indigo-500/60",
                    titleColor: "text-indigo-400",
                    responsibilities: [
                      "Bridges the gap between business stakeholders and the technical team.",
                      "Gathers and documents requirements for what the system must store and do.",
                      "Ensures the database design meets business needs.",
                      "Validates that the system behaves correctly end-to-end.",
                    ],
                    eg: "At a new e-commerce startup, the system analyst interviews the business team to understand what product, order, and customer data is needed before anything is built.",
                  },
                ].map(({ role, icon, color, titleColor, responsibilities, eg }) => (
                  <div key={role} className={`border border-border border-l-4 ${color} rounded-lg overflow-hidden`}>
                    <div className="px-5 py-3 bg-muted/40 border-b border-border flex items-center gap-2">
                      <span>{icon}</span>
                      <p className={`font-semibold text-sm ${titleColor}`}>{role}</p>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                      <ul className="space-y-1.5">
                        {responsibilities.map((r, i) => (
                          <li key={i} className="flex gap-2 items-start text-foreground/80">
                            <span className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full ${color.replace("border-l-","bg-").replace("/60","/80")}`} />
                            {r}
                          </li>
                        ))}
                      </ul>
                      <div className="bg-muted/50 border-l-4 border-amber-500/50 rounded-md px-4 py-2 text-muted-foreground">
                        <span className="font-medium text-amber-400">Real life: </span>{eg}
                      </div>
                    </div>
                  </div>
                ))}
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
