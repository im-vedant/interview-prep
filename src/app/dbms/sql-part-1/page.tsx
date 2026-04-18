const sections = [
  { id: "db-languages",  label: "Types of DB Languages" },
  { id: "ddl",           label: "DDL" },
  { id: "dml",           label: "DML" },
  { id: "dql",           label: "DQL" },
  { id: "dcl",           label: "DCL" },
  { id: "tcl",           label: "TCL" },
  { id: "operators",     label: "Types of Operators" },
  { id: "aggregates",    label: "Aggregate Functions" },
  { id: "clauses",       label: "SQL Clauses" },
  { id: "joins",         label: "JOINs" },
];

export default function SQLPart1() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16 flex gap-12">

        <main className="flex-1 min-w-0">

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-1">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/30 rounded-full px-3 py-1">
                DBMS · SQL
              </span>
              <span className="text-xs font-semibold text-muted-foreground border border-border rounded-full px-3 py-1">Part 1 of 2</span>
            </div>
            <h1 className="mt-4 text-4xl tracking-tight text-foreground font-heading">
              SQL — Part 1
            </h1>
            <p className="mt-4 text-xl text-muted-foreground leading-relaxed">
              From DDL to JOINs — the foundational building blocks of SQL every developer needs to know.
            </p>
          </div>

          <div className="space-y-14 text-foreground/80 text-base leading-7">

            {/* ── Types of DB Languages ─────────────────────────────── */}
            <section id="db-languages">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Types of Database Languages
              </h2>
              <p className="mb-6 text-sm">
                SQL is not a single uniform language — it is divided into sub-languages based on what each command <em>does</em>.
                Every SQL statement you write falls into exactly one of these five categories.
              </p>

              {/* Overview grid */}
              <div className="grid grid-cols-5 gap-2 text-xs mb-8">
                {[
                  { abbr: "DDL", full: "Data Definition",  color: "text-amber-400  border-amber-500/30  bg-amber-500/10",  cmds: ["CREATE","ALTER","DROP"] },
                  { abbr: "DML", full: "Data Manipulation",color: "text-violet-400 border-violet-500/30 bg-violet-500/10", cmds: ["INSERT","UPDATE","DELETE","TRUNCATE"] },
                  { abbr: "DQL", full: "Data Query",        color: "text-sky-400    border-sky-500/30    bg-sky-500/10",    cmds: ["SELECT"] },
                  { abbr: "DCL", full: "Data Control",      color: "text-rose-400   border-rose-500/30   bg-rose-500/10",   cmds: ["GRANT","REVOKE"] },
                  { abbr: "TCL", full: "Transaction Control",color:"text-emerald-400 border-emerald-500/30 bg-emerald-500/10",cmds:["COMMIT","ROLLBACK","SAVEPOINT"] },
                ].map(({ abbr, full, color, cmds }) => (
                  <div key={abbr} className={`border rounded-xl p-3 flex flex-col gap-2 ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
                    <div>
                      <p className={`font-bold text-base ${color.split(" ")[0]}`}>{abbr}</p>
                      <p className="text-muted-foreground text-[10px] leading-3 mt-0.5">{full}</p>
                    </div>
                    <div className="flex flex-col gap-1 mt-1">
                      {cmds.map(c => (
                        <span key={c} className={`font-mono text-[10px] font-semibold ${color.split(" ")[0]} opacity-80`}>{c}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 border-l-4 border-violet-500/50 rounded-md px-5 py-3 text-sm text-foreground/80">
                <strong>Why it matters:</strong>{" "}DDL changes are usually <em>auto-committed</em> and cannot be rolled back in most databases.
                DML changes can be rolled back inside a transaction. Knowing the category of a command tells you whether your mistake is reversible.
              </div>
            </section>

            {/* ── DDL ───────────────────────────────────────────────── */}
            <section id="ddl">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-1 pb-2 border-b border-border">
                DDL — Data Definition Language
              </h2>
              <p className="text-xs text-muted-foreground mb-5">Defines and modifies the <strong>structure</strong> of database objects — tables, indexes, views, schemas. Works on the schema, not the data.</p>

              <div className="space-y-4">
                {[
                  {
                    cmd: "CREATE",
                    color: "text-amber-400 border-amber-500/30 bg-amber-500/5",
                    desc: "Creates a new database object — table, database, view, index, or schema.",
                    sql: `CREATE TABLE student (
  student_id INT          PRIMARY KEY,
  name       VARCHAR(50)  NOT NULL,
  email      VARCHAR(100) UNIQUE,
  dept_id    INT          REFERENCES dept(dept_id)
);`,
                  },
                  {
                    cmd: "ALTER",
                    color: "text-amber-400 border-amber-500/30 bg-amber-500/5",
                    desc: "Modifies an existing table — add/drop/rename a column, change data type, add constraints.",
                    sql: `ALTER TABLE student ADD COLUMN phone VARCHAR(15);
ALTER TABLE student DROP COLUMN phone;
ALTER TABLE student RENAME COLUMN name TO full_name;
ALTER TABLE student ALTER COLUMN email SET NOT NULL;`,
                  },
                  {
                    cmd: "DROP",
                    color: "text-amber-400 border-amber-500/30 bg-amber-500/5",
                    desc: "Permanently deletes the table (structure + all data). Cannot be rolled back in most databases.",
                    sql: `DROP TABLE student;               -- deletes table + data
DROP TABLE IF EXISTS student;    -- no error if table doesn't exist`,
                  },
                ].map(({ cmd, color, desc, sql }) => (
                  <div key={cmd} className={`border rounded-lg overflow-hidden ${color.split(" ")[1]}`}>
                    <div className={`px-5 py-2.5 border-b border-border ${color.split(" ")[2]} flex items-center justify-between`}>
                      <p className={`font-mono font-bold ${color.split(" ")[0]}`}>{cmd}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <pre className="bg-[oklch(0.13_0.004_260)] px-5 py-3 text-xs text-emerald-300/80 font-mono leading-6 overflow-x-auto">{sql}</pre>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-muted/40 border border-border rounded-lg p-4 text-xs">
                <p className="font-semibold text-foreground mb-2">DROP vs TRUNCATE vs DELETE</p>
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border text-[10px]"><th className="text-left py-1 text-muted-foreground font-medium pr-4">Command</th><th className="text-left py-1 text-muted-foreground font-medium pr-4">Removes structure?</th><th className="text-left py-1 text-muted-foreground font-medium pr-4">Removes data?</th><th className="text-left py-1 text-muted-foreground font-medium">Rollback?</th></tr></thead>
                  <tbody className="divide-y divide-border/40">
                    {[
                      { c:"DROP",     s:"Yes","d":"Yes","r":"No (DDL)" },
                      { c:"TRUNCATE", s:"No", "d":"Yes (all)", "r":"No (MySQL/Oracle)" },
                      { c:"DELETE",   s:"No", "d":"Yes (selective)","r":"Yes (DML)" },
                    ].map(({c,s,d,r})=>(
                      <tr key={c}>
                        <td className="py-1.5 font-mono text-amber-300 pr-4">{c}</td>
                        <td className="py-1.5 text-foreground/70 pr-4">{s}</td>
                        <td className="py-1.5 text-foreground/70 pr-4">{d}</td>
                        <td className={`py-1.5 ${r.startsWith("Yes") ? "text-emerald-400" : "text-rose-400"}`}>{r}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── DML ───────────────────────────────────────────────── */}
            <section id="dml">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-1 pb-2 border-b border-border">
                DML — Data Manipulation Language
              </h2>
              <p className="text-xs text-muted-foreground mb-5">Adds, modifies, and deletes the actual <strong>data (rows)</strong> inside tables. These operations happen inside transactions and can be rolled back.</p>

              <div className="space-y-4">
                {[
                  {
                    cmd: "INSERT",
                    desc: "Adds one or more new rows into a table.",
                    sql: `INSERT INTO student (student_id, name, email, dept_id)
VALUES (1, 'Alice', 'alice@uni.edu', 'CS');

-- Insert multiple rows at once
INSERT INTO student (student_id, name, email, dept_id) VALUES
  (2, 'Bob',     'bob@uni.edu',     'CS'),
  (3, 'Charlie', 'charlie@uni.edu', 'MATH');`,
                  },
                  {
                    cmd: "UPDATE",
                    desc: "Modifies existing rows. Always pair with WHERE — without it, every row is updated.",
                    sql: `UPDATE student
SET dept_id = 'IT'
WHERE student_id = 2;

-- Update multiple columns
UPDATE student
SET name = 'Robert', email = 'robert@uni.edu'
WHERE student_id = 2;`,
                  },
                  {
                    cmd: "DELETE",
                    desc: "Removes specific rows. Without WHERE, deletes all rows but keeps the table.",
                    sql: `DELETE FROM student
WHERE student_id = 3;

-- Delete all rows (but table remains — unlike DROP)
DELETE FROM student;`,
                  },
                  {
                    cmd: "TRUNCATE",
                    desc: "Removes all rows instantly — faster than DELETE, resets auto-increment, no WHERE clause.",
                    sql: `TRUNCATE TABLE student;   -- all rows gone, table structure kept

-- Key differences from DELETE:
-- 1. Cannot use WHERE — always removes ALL rows
-- 2. Resets AUTO_INCREMENT counter
-- 3. Cannot be rolled back in MySQL/Oracle (can in PostgreSQL)`,
                  },
                ].map(({ cmd, desc, sql }) => (
                  <div key={cmd} className="border border-violet-500/30 rounded-lg overflow-hidden">
                    <div className="px-5 py-2.5 border-b border-border bg-violet-500/5 flex items-center justify-between">
                      <p className="font-mono font-bold text-violet-400">{cmd}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <pre className="bg-[oklch(0.13_0.004_260)] px-5 py-3 text-xs text-emerald-300/80 font-mono leading-6 overflow-x-auto">{sql}</pre>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-muted/50 border-l-4 border-rose-500/50 rounded-md px-5 py-3 text-sm text-foreground/80">
                <strong>Common mistake:</strong>{" "}forgetting <code className="text-xs font-mono text-rose-300">WHERE</code> in UPDATE or DELETE.
                Always write the WHERE clause first, test it with a SELECT, then run the UPDATE/DELETE.
              </div>
            </section>

            {/* ── DQL ───────────────────────────────────────────────── */}
            <section id="dql">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-1 pb-2 border-b border-border">
                DQL — Data Query Language
              </h2>
              <p className="text-xs text-muted-foreground mb-5">
                Retrieves data from the database. Contains only one command — <strong>SELECT</strong> — but it is by far the most complex and feature-rich command in SQL.
                Some classifications put SELECT inside DML; treating it separately as DQL is more precise.
              </p>

              <div className="border border-sky-500/30 rounded-lg overflow-hidden mb-4">
                <div className="px-5 py-2.5 border-b border-border bg-sky-500/5 flex items-center justify-between">
                  <p className="font-mono font-bold text-sky-400">SELECT</p>
                  <p className="text-xs text-muted-foreground">Retrieves rows from one or more tables.</p>
                </div>
                <pre className="bg-[oklch(0.13_0.004_260)] px-5 py-3 text-xs text-emerald-300/80 font-mono leading-6 overflow-x-auto">{`SELECT name, email
FROM   student
WHERE  dept_id = 'CS'
ORDER  BY name ASC;`}</pre>
              </div>

              <div className="border border-border rounded-lg overflow-hidden text-xs">
                <div className="px-4 py-2.5 bg-muted/40 border-b border-border font-semibold text-foreground text-sm">SELECT clause execution order</div>
                <div className="divide-y divide-border/50">
                  {[
                    { order: "1", clause: "FROM",     desc: "Identify the source table(s)" },
                    { order: "2", clause: "JOIN",      desc: "Combine rows from multiple tables" },
                    { order: "3", clause: "WHERE",     desc: "Filter rows before grouping" },
                    { order: "4", clause: "GROUP BY",  desc: "Group rows by a column" },
                    { order: "5", clause: "HAVING",    desc: "Filter groups (like WHERE but for groups)" },
                    { order: "6", clause: "SELECT",    desc: "Choose which columns to return" },
                    { order: "7", clause: "DISTINCT",  desc: "Remove duplicate rows" },
                    { order: "8", clause: "ORDER BY",  desc: "Sort the result" },
                    { order: "9", clause: "LIMIT",     desc: "Restrict the number of returned rows" },
                  ].map(({ order, clause, desc }) => (
                    <div key={order} className="flex items-center gap-4 px-4 py-2 hover:bg-muted/20">
                      <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0">{order}</span>
                      <span className="font-mono text-sky-300 w-20 flex-shrink-0">{clause}</span>
                      <span className="text-muted-foreground">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                The order you <em>write</em> clauses differs from the order the database <em>executes</em> them.
                This is why you cannot use a SELECT alias in a WHERE clause — WHERE runs before SELECT.
              </p>
            </section>

            {/* ── DCL ───────────────────────────────────────────────── */}
            <section id="dcl">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-1 pb-2 border-b border-border">
                DCL — Data Control Language
              </h2>
              <p className="text-xs text-muted-foreground mb-5">Controls <strong>who can access what</strong> — grants and revokes permissions on database objects. Managed by the DBA.</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  {
                    cmd: "GRANT",
                    desc: "Gives a user permission to perform an operation.",
                    sql: `-- Give Alice SELECT access on student table
GRANT SELECT ON student TO alice;

-- Give multiple privileges at once
GRANT SELECT, INSERT, UPDATE ON student TO bob;

-- Give all privileges
GRANT ALL PRIVILEGES ON student TO admin;`,
                  },
                  {
                    cmd: "REVOKE",
                    desc: "Removes a previously granted permission.",
                    sql: `-- Remove Alice's SELECT access
REVOKE SELECT ON student FROM alice;

-- Remove all privileges
REVOKE ALL PRIVILEGES ON student FROM bob;`,
                  },
                ].map(({ cmd, desc, sql }) => (
                  <div key={cmd} className="border border-rose-500/30 rounded-lg overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-border bg-rose-500/5 flex items-center justify-between">
                      <p className="font-mono font-bold text-rose-400">{cmd}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <pre className="bg-[oklch(0.13_0.004_260)] px-4 py-3 text-xs text-emerald-300/80 font-mono leading-6 overflow-x-auto">{sql}</pre>
                  </div>
                ))}
              </div>

              <div className="border border-border rounded-lg p-4 text-xs space-y-2">
                <p className="font-semibold text-foreground">Common SQL Privileges</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { priv: "SELECT",     desc: "Read rows" },
                    { priv: "INSERT",     desc: "Add rows" },
                    { priv: "UPDATE",     desc: "Modify rows" },
                    { priv: "DELETE",     desc: "Remove rows" },
                    { priv: "CREATE",     desc: "Create objects" },
                    { priv: "DROP",       desc: "Delete objects" },
                    { priv: "ALTER",      desc: "Modify structure" },
                    { priv: "EXECUTE",    desc: "Run stored procedures" },
                    { priv: "ALL",        desc: "All of the above" },
                  ].map(({ priv, desc }) => (
                    <div key={priv} className="flex gap-2 items-center border border-border rounded p-2 bg-muted/20">
                      <span className="font-mono text-rose-300 text-[10px]">{priv}</span>
                      <span className="text-muted-foreground text-[10px]">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── TCL ───────────────────────────────────────────────── */}
            <section id="tcl">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-1 pb-2 border-b border-border">
                TCL — Transaction Control Language
              </h2>
              <p className="text-xs text-muted-foreground mb-5">
                Manages <strong>transactions</strong> — a group of DML operations that must all succeed or all fail together (atomicity).
                TCL commands decide whether changes are made permanent or undone.
              </p>

              <div className="space-y-4 mb-5">
                {[
                  {
                    cmd: "COMMIT",
                    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
                    desc: "Permanently saves all changes made in the current transaction to the database.",
                    sql: `BEGIN;
  UPDATE account SET balance = balance - 500 WHERE id = 1;
  UPDATE account SET balance = balance + 500 WHERE id = 2;
COMMIT;   -- both changes are now permanent`,
                  },
                  {
                    cmd: "ROLLBACK",
                    color: "text-rose-400 border-rose-500/30 bg-rose-500/5",
                    desc: "Undoes all changes made since the last COMMIT. The database goes back to its previous state.",
                    sql: `BEGIN;
  DELETE FROM student WHERE dept_id = 'CS';
ROLLBACK;  -- oops! All CS students are restored`,
                  },
                  {
                    cmd: "SAVEPOINT",
                    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
                    desc: "Sets a named checkpoint inside a transaction. You can roll back to a savepoint without undoing the entire transaction.",
                    sql: `BEGIN;
  INSERT INTO student VALUES (4, 'Dave', 'dave@uni.edu', 'CS');
  SAVEPOINT after_insert;

  UPDATE student SET dept_id = 'ECE' WHERE student_id = 4;

ROLLBACK TO after_insert;  -- undo only the UPDATE, keep the INSERT
COMMIT;                    -- Dave is saved with original dept`,
                  },
                ].map(({ cmd, color, desc, sql }) => (
                  <div key={cmd} className={`border rounded-lg overflow-hidden ${color.split(" ")[1]}`}>
                    <div className={`px-5 py-2.5 border-b border-border ${color.split(" ")[2]} flex items-center justify-between`}>
                      <p className={`font-mono font-bold ${color.split(" ")[0]}`}>{cmd}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <pre className="bg-[oklch(0.13_0.004_260)] px-5 py-3 text-xs text-emerald-300/80 font-mono leading-6 overflow-x-auto">{sql}</pre>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 border-l-4 border-emerald-500/50 rounded-md px-5 py-3 text-sm text-foreground/80">
                <strong>ACID reminder:</strong>{" "}TCL commands are what make the <strong>A</strong> (Atomicity) and <strong>D</strong> (Durability) in ACID work.
                COMMIT makes changes durable. ROLLBACK ensures atomicity — either all or nothing.
              </div>
            </section>

            {/* ── Operators ─────────────────────────────────────────── */}
            <section id="operators">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Types of Operators
              </h2>
              <p className="mb-6 text-sm">
                SQL operators are symbols or keywords used in expressions to perform operations on values —
                filtering rows, combining conditions, comparing data, and manipulating sets.
              </p>

              <div className="space-y-8">

                {/* Arithmetic */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Arithmetic Operators</p>
                  <p className="text-sm text-foreground/80 mb-3">Perform mathematical calculations on numeric columns or values.</p>
                  <div className="grid grid-cols-5 gap-2 text-xs mb-3">
                    {[
                      { op:"+",  name:"Addition",       eg:"salary + 5000" },
                      { op:"-",  name:"Subtraction",    eg:"price - discount" },
                      { op:"*",  name:"Multiplication", eg:"qty * unit_price" },
                      { op:"/",  name:"Division",       eg:"total / count" },
                      { op:"%",  name:"Modulus",        eg:"id % 2  (odd/even)" },
                    ].map(({ op, name, eg }) => (
                      <div key={op} className="border border-amber-500/20 bg-amber-500/5 rounded-lg p-3 text-center">
                        <p className="font-mono text-2xl text-amber-400 font-bold mb-1">{op}</p>
                        <p className="text-foreground/70 font-semibold text-[10px]">{name}</p>
                        <p className="text-muted-foreground text-[10px] mt-1 font-mono">{eg}</p>
                      </div>
                    ))}
                  </div>
                  <pre className="bg-[oklch(0.13_0.004_260)] border border-border rounded-lg px-4 py-3 text-xs text-emerald-300/80 font-mono leading-6 overflow-x-auto">{`SELECT name, salary, salary * 1.10 AS salary_after_raise
FROM   employee;`}</pre>
                </div>

                {/* Comparison */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Comparison Operators</p>
                  <p className="text-sm text-foreground/80 mb-3">Compare two values and return TRUE or FALSE. Used mainly in WHERE clauses.</p>
                  <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                    {[
                      { op:"=",   desc:"Equal to",                 eg:"dept_id = 'CS'" },
                      { op:"!= or <>", desc:"Not equal to",        eg:"dept_id != 'CS'" },
                      { op:">",   desc:"Greater than",             eg:"salary > 50000" },
                      { op:"<",   desc:"Less than",                eg:"age < 30" },
                      { op:">=",  desc:"Greater than or equal",    eg:"marks >= 40" },
                      { op:"<=",  desc:"Less than or equal",       eg:"price <= 999" },
                    ].map(({ op, desc, eg }) => (
                      <div key={op} className="border border-border rounded-lg p-3 bg-muted/20 flex gap-3 items-start">
                        <span className="font-mono text-sky-400 font-bold w-12 flex-shrink-0">{op}</span>
                        <div>
                          <p className="text-foreground/70">{desc}</p>
                          <p className="font-mono text-muted-foreground text-[10px] mt-0.5">{eg}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <pre className="bg-[oklch(0.13_0.004_260)] border border-border rounded-lg px-4 py-3 text-xs text-emerald-300/80 font-mono leading-6 overflow-x-auto">{`SELECT * FROM student WHERE marks >= 40 AND marks <= 100;`}</pre>
                </div>

                {/* Logical */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Logical Operators</p>
                  <p className="text-sm text-foreground/80 mb-3">Combine multiple conditions. Return TRUE or FALSE.</p>
                  <div className="grid grid-cols-3 gap-3 text-xs mb-3">
                    {[
                      { op:"AND", color:"text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
                        desc:"TRUE only if BOTH conditions are true.",
                        eg:`SELECT * FROM student\nWHERE dept='CS' AND marks > 80;` },
                      { op:"OR",  color:"text-violet-400 border-violet-500/30 bg-violet-500/5",
                        desc:"TRUE if EITHER condition is true.",
                        eg:`SELECT * FROM student\nWHERE dept='CS' OR dept='IT';` },
                      { op:"NOT", color:"text-rose-400 border-rose-500/30 bg-rose-500/5",
                        desc:"Reverses the result of a condition.",
                        eg:`SELECT * FROM student\nWHERE NOT dept = 'CS';` },
                    ].map(({ op, color, desc, eg }) => (
                      <div key={op} className={`border rounded-lg overflow-hidden ${color.split(" ")[1]}`}>
                        <div className={`px-4 py-2 border-b border-border ${color.split(" ")[2]}`}>
                          <p className={`font-mono font-bold ${color.split(" ")[0]}`}>{op}</p>
                          <p className="text-muted-foreground text-[10px] mt-0.5">{desc}</p>
                        </div>
                        <pre className="bg-[oklch(0.13_0.004_260)] px-4 py-2.5 text-[11px] text-emerald-300/80 font-mono leading-5 overflow-x-auto">{eg}</pre>
                      </div>
                    ))}
                  </div>
                  <div className="bg-muted/40 border border-border rounded-lg p-3 text-xs">
                    <p className="text-muted-foreground font-medium mb-1.5">Operator precedence (highest → lowest)</p>
                    <p className="font-mono text-foreground/70">NOT &nbsp;→&nbsp; AND &nbsp;→&nbsp; OR</p>
                    <p className="text-muted-foreground text-[10px] mt-1">Use parentheses to override: <span className="font-mono text-sky-300">WHERE (dept=&apos;CS&apos; OR dept=&apos;IT&apos;) AND marks &gt; 80</span></p>
                  </div>
                </div>

                {/* Special / SQL-specific */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Special Operators</p>
                  <p className="text-sm text-foreground/80 mb-3">SQL-specific operators that are shorthand for common filtering patterns.</p>
                  <div className="space-y-3">
                    {[
                      {
                        op: "BETWEEN",
                        desc: "TRUE if value is within an inclusive range. Equivalent to value >= low AND value <= high.",
                        sql: `SELECT * FROM student WHERE marks BETWEEN 40 AND 100;
-- same as: marks >= 40 AND marks <= 100`,
                      },
                      {
                        op: "IN",
                        desc: "TRUE if value matches any value in a given list. Cleaner alternative to multiple OR conditions.",
                        sql: `SELECT * FROM student WHERE dept_id IN ('CS', 'IT', 'MATH');
-- same as: dept_id='CS' OR dept_id='IT' OR dept_id='MATH'`,
                      },
                      {
                        op: "NOT IN",
                        desc: "TRUE if value does NOT match any value in the list.",
                        sql: `SELECT * FROM student WHERE dept_id NOT IN ('CS', 'IT');`,
                      },
                      {
                        op: "LIKE",
                        desc: "Pattern matching on strings. % matches any sequence of characters. _ matches exactly one character.",
                        sql: `SELECT * FROM student WHERE name LIKE 'A%';      -- starts with A
SELECT * FROM student WHERE email LIKE '%@uni.edu'; -- ends with @uni.edu
SELECT * FROM student WHERE name LIKE '_ob';        -- 3-letter name ending in 'ob' (Bob)`,
                      },
                      {
                        op: "IS NULL / IS NOT NULL",
                        desc: "Checks for NULL values. You cannot use = NULL — NULL is not equal to anything, including itself.",
                        sql: `SELECT * FROM student WHERE phone IS NULL;
SELECT * FROM student WHERE phone IS NOT NULL;
-- WRONG: WHERE phone = NULL   (always returns no rows)`,
                      },
                      {
                        op: "EXISTS",
                        desc: "TRUE if a subquery returns at least one row. Often used to check for related records.",
                        sql: `SELECT name FROM student s
WHERE EXISTS (
  SELECT 1 FROM enrollment e
  WHERE e.student_id = s.student_id
);  -- students who have enrolled in at least one course`,
                      },
                    ].map(({ op, desc, sql }) => (
                      <div key={op} className="border border-sky-500/20 rounded-lg overflow-hidden">
                        <div className="px-5 py-2.5 bg-sky-500/5 border-b border-border flex items-start gap-4">
                          <p className="font-mono font-bold text-sky-400 flex-shrink-0 w-36">{op}</p>
                          <p className="text-xs text-muted-foreground leading-4">{desc}</p>
                        </div>
                        <pre className="bg-[oklch(0.13_0.004_260)] px-5 py-3 text-xs text-emerald-300/80 font-mono leading-6 overflow-x-auto">{sql}</pre>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Set Operators */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Set Operators</p>
                  <p className="text-sm text-foreground/80 mb-3">
                    Combine the results of two SELECT queries into a single result set.
                    Both queries must have the <strong>same number of columns</strong> with compatible data types.
                  </p>
                  <div className="space-y-3 mb-4">
                    {[
                      {
                        op: "UNION",
                        color: "text-violet-400 border-violet-500/30 bg-violet-500/5",
                        desc: "Combines results of two queries, removes duplicate rows.",
                        sql: `SELECT name FROM student WHERE dept = 'CS'
UNION
SELECT name FROM student WHERE marks > 90;`,
                      },
                      {
                        op: "UNION ALL",
                        color: "text-violet-400 border-violet-500/30 bg-violet-500/5",
                        desc: "Same as UNION but keeps duplicate rows. Faster since no deduplication step.",
                        sql: `SELECT name FROM student WHERE dept = 'CS'
UNION ALL
SELECT name FROM student WHERE marks > 90;`,
                      },
                      {
                        op: "INTERSECT",
                        color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
                        desc: "Returns only rows that appear in BOTH result sets.",
                        sql: `SELECT name FROM student WHERE dept = 'CS'
INTERSECT
SELECT name FROM student WHERE marks > 90;
-- CS students who ALSO scored above 90`,
                      },
                      {
                        op: "EXCEPT / MINUS",
                        color: "text-rose-400 border-rose-500/30 bg-rose-500/5",
                        desc: "Returns rows from the first query that do NOT appear in the second. (EXCEPT in PostgreSQL/SQL Server, MINUS in Oracle.)",
                        sql: `SELECT name FROM student WHERE dept = 'CS'
EXCEPT
SELECT name FROM student WHERE marks > 90;
-- CS students who did NOT score above 90`,
                      },
                    ].map(({ op, color, desc, sql }) => (
                      <div key={op} className={`border rounded-lg overflow-hidden ${color.split(" ")[1]}`}>
                        <div className={`px-5 py-2.5 border-b border-border ${color.split(" ")[2]} flex items-start gap-4`}>
                          <p className={`font-mono font-bold flex-shrink-0 w-28 ${color.split(" ")[0]}`}>{op}</p>
                          <p className="text-xs text-muted-foreground leading-4">{desc}</p>
                        </div>
                        <pre className="bg-[oklch(0.13_0.004_260)] px-5 py-3 text-xs text-emerald-300/80 font-mono leading-6 overflow-x-auto">{sql}</pre>
                      </div>
                    ))}
                  </div>

                  {/* Venn-style summary */}
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    {[
                      { op:"UNION",    desc:"A ∪ B (no dupes)",  color:"text-violet-400 border-violet-500/30 bg-violet-500/5" },
                      { op:"UNION ALL",desc:"A ∪ B (with dupes)",color:"text-violet-400 border-violet-500/30 bg-violet-500/5" },
                      { op:"INTERSECT",desc:"A ∩ B",             color:"text-emerald-400 border-emerald-500/30 bg-emerald-500/5" },
                      { op:"EXCEPT",   desc:"A − B",             color:"text-rose-400 border-rose-500/30 bg-rose-500/5" },
                    ].map(({ op, desc, color }) => (
                      <div key={op} className={`border rounded-lg p-3 text-center ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
                        <p className={`font-mono font-bold ${color.split(" ")[0]}`}>{op}</p>
                        <p className="text-muted-foreground text-[11px] mt-1">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* ── Aggregate Functions ───────────────────────────────── */}
            <section id="aggregates">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Aggregate Functions
              </h2>
              <p className="mb-5 text-sm">
                Aggregate functions <strong>collapse multiple rows into a single value</strong>.
                They are always used with <code className="text-xs font-mono text-sky-300 bg-muted/60 px-1 rounded">SELECT</code>, and pair with <code className="text-xs font-mono text-sky-300 bg-muted/60 px-1 rounded">GROUP BY</code> to compute values per group.
              </p>

              {/* Running example table */}
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Example table — STUDENT</p>
              <div className="border border-border rounded-lg overflow-hidden text-xs mb-6">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border text-[10px]">
                      {["student_id","name","dept","marks","fee_paid"].map(h => (
                        <th key={h} className="px-4 py-2 text-left font-mono text-foreground/60">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {[
                      ["1","Alice","CS","88","15000"],
                      ["2","Bob","CS","72","15000"],
                      ["3","Charlie","IT","91","12000"],
                      ["4","Dave","IT","65","12000"],
                      ["5","Eve","CS",null,"15000"],
                    ].map((r, i) => (
                      <tr key={i} className="hover:bg-muted/10">
                        <td className="px-4 py-1.5 font-mono text-amber-300">{r[0]}</td>
                        <td className="px-4 py-1.5 text-foreground/80">{r[1]}</td>
                        <td className="px-4 py-1.5 text-sky-300/70">{r[2]}</td>
                        <td className={`px-4 py-1.5 font-mono ${r[3] ? "text-emerald-300/70" : "text-muted-foreground italic"}`}>{r[3] ?? "NULL"}</td>
                        <td className="px-4 py-1.5 font-mono text-foreground/60">{r[4]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Five functions */}
              <div className="space-y-3 mb-6">
                {[
                  {
                    fn: "COUNT()",
                    color: "text-violet-400 border-violet-500/30 bg-violet-500/5",
                    desc: "Counts rows. COUNT(*) counts all rows including NULLs. COUNT(column) counts only non-NULL values in that column.",
                    sql: `SELECT COUNT(*)      FROM student;          -- 5 (all rows)
SELECT COUNT(marks) FROM student;          -- 4 (Eve's NULL is skipped)
SELECT COUNT(DISTINCT dept) FROM student;  -- 2 (CS, IT)`,
                    result: "5 / 4 / 2",
                  },
                  {
                    fn: "SUM()",
                    color: "text-amber-400 border-amber-500/30 bg-amber-500/5",
                    desc: "Returns the total of all non-NULL values in a numeric column.",
                    sql: `SELECT SUM(marks) FROM student;            -- 316 (88+72+91+65, NULL skipped)
SELECT SUM(marks) FROM student WHERE dept = 'CS';  -- 160 (88+72, Eve NULL skipped)`,
                    result: "316 / 160",
                  },
                  {
                    fn: "AVG()",
                    color: "text-sky-400 border-sky-500/30 bg-sky-500/5",
                    desc: "Returns the average of all non-NULL values. Divides SUM by the count of non-NULL rows — NULL does NOT count as 0.",
                    sql: `SELECT AVG(marks) FROM student;            -- 79.0  (316 / 4, not 316 / 5)
SELECT AVG(marks) FROM student WHERE dept = 'IT'; -- 78.0  (156 / 2)`,
                    result: "79.0 / 78.0",
                  },
                  {
                    fn: "MAX()",
                    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
                    desc: "Returns the highest value. Works on numbers, strings, and dates.",
                    sql: `SELECT MAX(marks) FROM student;            -- 91
SELECT MAX(name)  FROM student;            -- 'Eve' (last alphabetically)`,
                    result: "91 / Eve",
                  },
                  {
                    fn: "MIN()",
                    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
                    desc: "Returns the lowest value.",
                    sql: `SELECT MIN(marks)  FROM student;           -- 65
SELECT MIN(name)  FROM student;            -- 'Alice' (first alphabetically)`,
                    result: "65 / Alice",
                  },
                ].map(({ fn, color, desc, sql, result }) => (
                  <div key={fn} className={`border rounded-lg overflow-hidden ${color.split(" ")[1]}`}>
                    <div className={`px-5 py-2.5 border-b border-border ${color.split(" ")[2]} flex items-center justify-between`}>
                      <p className={`font-mono font-bold text-sm ${color.split(" ")[0]}`}>{fn}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <pre className="bg-[oklch(0.13_0.004_260)] px-5 py-3 text-xs text-emerald-300/80 font-mono leading-6 overflow-x-auto">{sql}</pre>
                    <div className={`px-5 py-1.5 border-t border-border/50 ${color.split(" ")[2]}`}>
                      <span className="text-[10px] text-muted-foreground">Result: </span>
                      <span className={`text-[10px] font-mono font-semibold ${color.split(" ")[0]}`}>{result}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* GROUP BY */}
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">GROUP BY — aggregating per group</p>
              <p className="text-sm text-foreground/80 mb-3">
                <code className="text-xs font-mono text-sky-300 bg-muted/60 px-1 rounded">GROUP BY</code>{" "}splits rows into groups and applies the aggregate function to each group separately.
                Every column in SELECT must either be in GROUP BY or wrapped in an aggregate function.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                <div className="border border-border rounded-lg overflow-hidden">
                  <pre className="bg-[oklch(0.13_0.004_260)] px-4 py-3 text-xs text-emerald-300/80 font-mono leading-6">{`SELECT   dept,
         COUNT(*)    AS total_students,
         AVG(marks)  AS avg_marks,
         MAX(marks)  AS top_score
FROM     student
GROUP BY dept;`}</pre>
                </div>
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-3 py-2 bg-muted/30 border-b border-border text-[10px] text-muted-foreground font-medium">Result</div>
                  <table className="w-full">
                    <thead><tr className="border-b border-border/50 bg-muted/10 text-[10px]">
                      <th className="px-3 py-1.5 text-left text-sky-300 font-mono">dept</th>
                      <th className="px-3 py-1.5 text-left text-violet-300 font-mono">total</th>
                      <th className="px-3 py-1.5 text-left text-sky-300 font-mono">avg_marks</th>
                      <th className="px-3 py-1.5 text-left text-emerald-300 font-mono">top_score</th>
                    </tr></thead>
                    <tbody className="divide-y divide-border/30 font-mono text-[11px]">
                      <tr>
                        <td className="px-3 py-1.5 text-sky-300/70">CS</td>
                        <td className="px-3 py-1.5 text-violet-300/70">3</td>
                        <td className="px-3 py-1.5 text-sky-300/70">80.0</td>
                        <td className="px-3 py-1.5 text-emerald-300/70">88</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-1.5 text-sky-300/70">IT</td>
                        <td className="px-3 py-1.5 text-violet-300/70">2</td>
                        <td className="px-3 py-1.5 text-sky-300/70">78.0</td>
                        <td className="px-3 py-1.5 text-emerald-300/70">91</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* HAVING */}
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">HAVING — filtering groups</p>
              <p className="text-sm text-foreground/80 mb-3">
                <code className="text-xs font-mono text-sky-300 bg-muted/60 px-1 rounded">HAVING</code>{" "}filters groups <em>after</em> aggregation — like WHERE but for groups.
                You cannot use WHERE to filter on an aggregate result.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                <div className="border border-rose-500/20 rounded-lg overflow-hidden">
                  <div className="px-4 py-2 bg-rose-500/5 border-b border-border text-rose-400 font-semibold text-[11px]">✗ Wrong — cannot use WHERE on aggregate</div>
                  <pre className="bg-[oklch(0.13_0.004_260)] px-4 py-2.5 text-xs text-rose-300/60 font-mono leading-5">{`SELECT dept, AVG(marks)
FROM   student
WHERE  AVG(marks) > 79   -- ❌ error
GROUP BY dept;`}</pre>
                </div>
                <div className="border border-emerald-500/20 rounded-lg overflow-hidden">
                  <div className="px-4 py-2 bg-emerald-500/5 border-b border-border text-emerald-400 font-semibold text-[11px]">✓ Correct — use HAVING</div>
                  <pre className="bg-[oklch(0.13_0.004_260)] px-4 py-2.5 text-xs text-emerald-300/80 font-mono leading-5">{`SELECT dept, AVG(marks)
FROM   student
GROUP BY dept
HAVING AVG(marks) > 79;  -- ✓ CS dept only`}</pre>
                </div>
              </div>

              {/* WHERE vs HAVING */}
              <div className="border border-border rounded-lg overflow-hidden text-xs">
                <div className="px-4 py-2.5 bg-muted/40 border-b border-border font-semibold text-foreground text-sm">WHERE vs HAVING</div>
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/20 text-[10px]">
                    <th className="px-4 py-2 text-left text-muted-foreground font-medium">Property</th>
                    <th className="px-4 py-2 text-left text-sky-400 font-medium">WHERE</th>
                    <th className="px-4 py-2 text-left text-emerald-400 font-medium">HAVING</th>
                  </tr></thead>
                  <tbody className="divide-y divide-border/50">
                    {[
                      { prop:"Filters",        where:"Individual rows",       having:"Groups (after GROUP BY)" },
                      { prop:"Runs at step",   where:"Step 3 (before GROUP BY)", having:"Step 5 (after GROUP BY)" },
                      { prop:"Can use aggregates?", where:"No",              having:"Yes" },
                      { prop:"Example",        where:"WHERE dept = 'CS'",    having:"HAVING COUNT(*) > 2" },
                    ].map(({ prop, where, having }) => (
                      <tr key={prop} className="hover:bg-muted/20">
                        <td className="px-4 py-2.5 text-foreground/70">{prop}</td>
                        <td className="px-4 py-2.5 text-sky-300/80 font-mono text-[11px]">{where}</td>
                        <td className="px-4 py-2.5 text-emerald-300/80 font-mono text-[11px]">{having}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 bg-muted/50 border-l-4 border-amber-500/50 rounded-md px-5 py-3 text-sm text-foreground/80">
                <strong>NULL in aggregates:</strong>{" "}all aggregate functions <strong>ignore NULL values</strong> except <code className="text-xs font-mono text-violet-300">COUNT(*)</code>.
                This is why <code className="text-xs font-mono text-violet-300">AVG(marks)</code> divides by 4, not 5 — Eve&apos;s NULL row is excluded from both the sum and the count.
              </div>
            </section>

            {/* ── SQL Clauses ───────────────────────────────────────── */}
            <section id="clauses">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                SQL Clauses
              </h2>
              <p className="mb-6 text-sm">
                A clause is a component of a SQL statement that controls how rows are filtered, sorted, grouped, or limited.
                Every clause has a fixed position in the query — writing them out of order causes a syntax error.
              </p>

              <div className="space-y-5">

                {/* WHERE */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-5 py-2.5 bg-muted/30 border-b border-border flex items-center justify-between">
                    <p className="font-mono font-bold text-sky-400">WHERE</p>
                    <p className="text-xs text-muted-foreground">Filters rows <em>before</em> any grouping or aggregation</p>
                  </div>
                  <div className="px-5 py-4 space-y-3 text-sm">
                    <p className="text-foreground/80 text-xs leading-5">
                      Evaluates a condition on every row — only rows where the condition is TRUE are kept.
                      Accepts all comparison operators, logical operators (AND/OR/NOT), and special operators (BETWEEN, IN, LIKE, IS NULL).
                    </p>
                    <pre className="bg-[oklch(0.13_0.004_260)] border border-border rounded-lg px-4 py-3 text-xs text-emerald-300/80 font-mono leading-6 overflow-x-auto">{`-- Single condition
SELECT * FROM student WHERE dept = 'CS';

-- Multiple conditions
SELECT * FROM student WHERE dept = 'CS' AND marks > 75;

-- Combining special operators
SELECT * FROM student
WHERE  dept IN ('CS', 'IT')
AND    marks BETWEEN 60 AND 100
AND    email IS NOT NULL;`}</pre>
                  </div>
                </div>

                {/* ORDER BY */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-5 py-2.5 bg-muted/30 border-b border-border flex items-center justify-between">
                    <p className="font-mono font-bold text-sky-400">ORDER BY</p>
                    <p className="text-xs text-muted-foreground">Sorts the result set — runs last, after SELECT</p>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1.5">
                        <p className="text-muted-foreground font-medium">Key rules</p>
                        <ul className="space-y-1 text-foreground/70 list-disc list-inside">
                          <li>Default order is <span className="font-mono text-sky-300">ASC</span> (ascending)</li>
                          <li>Use <span className="font-mono text-sky-300">DESC</span> for descending</li>
                          <li>Can sort by multiple columns — left to right priority</li>
                          <li>Can reference column alias from SELECT</li>
                          <li>NULLs sort first in ASC, last in DESC (varies by DB)</li>
                        </ul>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-muted-foreground font-medium">Sort priority example</p>
                        <p className="text-xs text-foreground/70 leading-5">
                          <span className="font-mono text-sky-300">ORDER BY dept ASC, marks DESC</span>
                          — first sort by dept A→Z, then within each dept sort marks highest first.
                        </p>
                      </div>
                    </div>
                    <pre className="bg-[oklch(0.13_0.004_260)] border border-border rounded-lg px-4 py-3 text-xs text-emerald-300/80 font-mono leading-6 overflow-x-auto">{`SELECT name, dept, marks FROM student
ORDER BY marks DESC;                   -- highest marks first

-- Multiple columns
SELECT name, dept, marks FROM student
ORDER BY dept ASC, marks DESC;         -- dept A→Z, then marks high→low within dept

-- Using alias
SELECT name, marks * 1.1 AS adjusted
FROM student
ORDER BY adjusted DESC;                -- can use the alias`}</pre>
                  </div>
                </div>

                {/* DISTINCT */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-5 py-2.5 bg-muted/30 border-b border-border flex items-center justify-between">
                    <p className="font-mono font-bold text-sky-400">DISTINCT</p>
                    <p className="text-xs text-muted-foreground">Removes duplicate rows from the result</p>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    <p className="text-foreground/80 text-xs leading-5">
                      Placed right after SELECT. When multiple columns are listed, a row is considered duplicate only if <em>all</em> selected columns match.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <pre className="bg-[oklch(0.13_0.004_260)] border border-border rounded-lg px-4 py-3 text-xs text-emerald-300/80 font-mono leading-6">{`-- Without DISTINCT
SELECT dept FROM student;
-- CS, CS, IT, IT, CS

-- With DISTINCT
SELECT DISTINCT dept FROM student;
-- CS, IT`}</pre>
                      </div>
                      <div>
                        <pre className="bg-[oklch(0.13_0.004_260)] border border-border rounded-lg px-4 py-3 text-xs text-emerald-300/80 font-mono leading-6">{`-- DISTINCT on multiple columns
-- duplicate = ALL columns match
SELECT DISTINCT dept, marks
FROM student;
-- (CS,88),(CS,72),(IT,91),(IT,65),(CS,NULL)`}</pre>
                      </div>
                    </div>
                    <div className="bg-muted/40 border border-border rounded-lg p-3 text-xs text-muted-foreground">
                      <span className="text-amber-400 font-semibold">Note: </span>
                      <span className="font-mono text-violet-300">COUNT(DISTINCT col)</span> counts unique non-NULL values.
                      {" "}<span className="font-mono text-violet-300">SELECT DISTINCT</span> can be slow on large tables — it requires sorting or hashing the result.
                    </div>
                  </div>
                </div>

                {/* LIMIT / OFFSET */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-5 py-2.5 bg-muted/30 border-b border-border flex items-center justify-between">
                    <p className="font-mono font-bold text-sky-400">LIMIT / OFFSET</p>
                    <p className="text-xs text-muted-foreground">Restricts how many rows are returned — used for pagination</p>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    <p className="text-foreground/80 text-xs leading-5">
                      <span className="font-mono text-sky-300">LIMIT n</span> returns at most n rows.
                      <span className="font-mono text-sky-300 ml-2">OFFSET k</span> skips the first k rows before returning.
                      Together they implement pagination.
                    </p>
                    <pre className="bg-[oklch(0.13_0.004_260)] border border-border rounded-lg px-4 py-3 text-xs text-emerald-300/80 font-mono leading-6 overflow-x-auto">{`SELECT * FROM student ORDER BY marks DESC LIMIT 3;         -- top 3 students

-- Pagination: 10 rows per page
SELECT * FROM student ORDER BY student_id
LIMIT  10 OFFSET 0;    -- page 1 (rows 1–10)

LIMIT  10 OFFSET 10;   -- page 2 (rows 11–20)
LIMIT  10 OFFSET 20;   -- page 3 (rows 21–30)

-- Formula: OFFSET = (page_number - 1) * page_size`}</pre>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-muted/30 border border-border rounded-lg p-3">
                        <p className="text-sky-400 font-semibold mb-1">MySQL / PostgreSQL</p>
                        <p className="font-mono text-foreground/70">LIMIT 10 OFFSET 20</p>
                      </div>
                      <div className="bg-muted/30 border border-border rounded-lg p-3">
                        <p className="text-sky-400 font-semibold mb-1">SQL Server / Oracle</p>
                        <p className="font-mono text-foreground/70">OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* GROUP BY + HAVING — brief */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { clause:"GROUP BY", color:"text-violet-400 border-violet-500/30 bg-violet-500/5",
                      desc:"Groups rows with the same value in a column so aggregate functions can be applied per group.",
                      note:"Covered in detail in the Aggregate Functions section above." },
                    { clause:"HAVING",   color:"text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
                      desc:"Filters groups after GROUP BY — like WHERE but for aggregated results. Can use aggregate functions in the condition.",
                      note:"Covered in detail in the Aggregate Functions section above." },
                  ].map(({ clause, color, desc, note }) => (
                    <div key={clause} className={`border rounded-lg overflow-hidden ${color.split(" ")[1]}`}>
                      <div className={`px-5 py-2.5 border-b border-border ${color.split(" ")[2]}`}>
                        <p className={`font-mono font-bold ${color.split(" ")[0]}`}>{clause}</p>
                      </div>
                      <div className="px-5 py-3.5 space-y-2 text-xs">
                        <p className="text-foreground/80 leading-5">{desc}</p>
                        <p className="text-muted-foreground italic text-[10px]">{note}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Full query anatomy */}
                <div className="border border-border rounded-lg overflow-hidden text-xs">
                  <div className="px-5 py-2.5 bg-muted/40 border-b border-border font-semibold text-foreground text-sm">Full SELECT — all clauses in order</div>
                  <pre className="bg-[oklch(0.13_0.004_260)] px-5 py-4 text-xs text-emerald-300/80 font-mono leading-7 overflow-x-auto">{`SELECT   DISTINCT dept, AVG(marks) AS avg_marks   -- 6. choose columns
FROM     student                                   -- 1. source table
WHERE    marks IS NOT NULL                         -- 3. filter rows
GROUP BY dept                                      -- 4. group
HAVING   AVG(marks) > 75                           -- 5. filter groups
ORDER BY avg_marks DESC                            -- 8. sort
LIMIT    5;                                        -- 9. cap rows`}</pre>
                  <div className="px-5 py-2.5 border-t border-border/50 text-[10px] text-muted-foreground">
                    Numbers show execution order — not the order you write them. Writing them out of order is a syntax error.
                  </div>
                </div>

              </div>
            </section>

            {/* ── JOINs ─────────────────────────────────────────────── */}
            <section id="joins">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                JOINs
              </h2>
              <p className="mb-5 text-sm">
                A JOIN combines rows from two tables based on a related column. The type of join decides what happens to rows that <strong>don&apos;t have a match</strong> in the other table.
              </p>

              {/* Example tables */}
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Example tables</p>
              <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-4 py-2 bg-muted/40 border-b border-border font-mono text-amber-400 text-[11px]">STUDENT</div>
                  <table className="w-full">
                    <thead><tr className="border-b border-border/50 bg-muted/10 text-[10px]">
                      <th className="px-3 py-1.5 text-left text-amber-400 font-mono">student_id</th>
                      <th className="px-3 py-1.5 text-left text-muted-foreground font-mono">name</th>
                      <th className="px-3 py-1.5 text-left text-muted-foreground font-mono">dept_id</th>
                    </tr></thead>
                    <tbody className="divide-y divide-border/30 font-mono text-[11px]">
                      {[["1","Alice","CS"],["2","Bob","IT"],["3","Charlie","NULL"]].map(([id,n,d])=>(
                        <tr key={id}>
                          <td className="px-3 py-1.5 text-amber-300">{id}</td>
                          <td className="px-3 py-1.5 text-foreground/80">{n}</td>
                          <td className={`px-3 py-1.5 ${d==="NULL" ? "text-muted-foreground italic" : "text-sky-300/70"}`}>{d}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-4 py-2 bg-muted/40 border-b border-border font-mono text-sky-400 text-[11px]">DEPT</div>
                  <table className="w-full">
                    <thead><tr className="border-b border-border/50 bg-muted/10 text-[10px]">
                      <th className="px-3 py-1.5 text-left text-amber-400 font-mono">dept_id</th>
                      <th className="px-3 py-1.5 text-left text-muted-foreground font-mono">dept_name</th>
                    </tr></thead>
                    <tbody className="divide-y divide-border/30 font-mono text-[11px]">
                      {[["CS","Comp Sci"],["IT","Info Tech"],["MATH","Mathematics"]].map(([id,n])=>(
                        <tr key={id}>
                          <td className="px-3 py-1.5 text-amber-300">{id}</td>
                          <td className="px-3 py-1.5 text-foreground/70">{n}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                Charlie has no dept (NULL). MATH has no students. Watch how each join handles these.
              </p>

              {/* Four joins */}
              <div className="space-y-5">
                {[
                  {
                    name: "INNER JOIN",
                    color: "text-violet-400 border-violet-500/30 bg-violet-500/5",
                    desc: "Returns only rows that have a matching value in BOTH tables. Non-matching rows from either side are dropped.",
                    sql: `SELECT s.name, d.dept_name
FROM   student s
INNER JOIN dept d ON s.dept_id = d.dept_id;`,
                    rows: [["Alice","Comp Sci"],["Bob","Info Tech"]],
                    note: "Charlie (NULL dept) and MATH (no students) are both excluded.",
                    venn: "inner",
                  },
                  {
                    name: "LEFT JOIN",
                    color: "text-sky-400 border-sky-500/30 bg-sky-500/5",
                    desc: "Returns ALL rows from the LEFT table. If there's no match in the right table, the right side columns are NULL.",
                    sql: `SELECT s.name, d.dept_name
FROM   student s
LEFT JOIN dept d ON s.dept_id = d.dept_id;`,
                    rows: [["Alice","Comp Sci"],["Bob","Info Tech"],["Charlie","NULL"]],
                    note: "Charlie is included with NULL dept_name. MATH (no students) is excluded.",
                    venn: "left",
                  },
                  {
                    name: "RIGHT JOIN",
                    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
                    desc: "Returns ALL rows from the RIGHT table. If there's no match in the left table, the left side columns are NULL.",
                    sql: `SELECT s.name, d.dept_name
FROM   student s
RIGHT JOIN dept d ON s.dept_id = d.dept_id;`,
                    rows: [["Alice","Comp Sci"],["Bob","Info Tech"],["NULL","Mathematics"]],
                    note: "MATH is included with NULL name. Charlie (no dept match) is excluded.",
                    venn: "right",
                  },
                  {
                    name: "FULL JOIN",
                    color: "text-amber-400 border-amber-500/30 bg-amber-500/5",
                    desc: "Returns ALL rows from BOTH tables. Unmatched rows from either side get NULLs for the other side's columns.",
                    sql: `SELECT s.name, d.dept_name
FROM   student s
FULL JOIN dept d ON s.dept_id = d.dept_id;`,
                    rows: [["Alice","Comp Sci"],["Bob","Info Tech"],["Charlie","NULL"],["NULL","Mathematics"]],
                    note: "Everything is included — Charlie with NULL dept and MATH with NULL name.",
                    venn: "full",
                  },
                ].map(({ name, color, desc, sql, rows, note, venn }) => (
                  <div key={name} className={`border rounded-lg overflow-hidden ${color.split(" ")[1]}`}>
                    <div className={`px-5 py-2.5 border-b border-border ${color.split(" ")[2]} flex items-center gap-4`}>
                      {/* Venn icon */}
                      <svg width="36" height="24" viewBox="0 0 36 24" className="flex-shrink-0">
                        {/* Left circle */}
                        <circle cx="13" cy="12" r="10"
                          fill={venn==="left"||venn==="full" ? "currentColor" : "none"}
                          className={venn==="left"||venn==="full" ? color.split(" ")[0] : ""}
                          stroke="currentColor"
                          strokeWidth="1.5"
                          opacity={venn==="left"||venn==="full" ? "0.3" : "0.5"}
                        />
                        {/* Right circle */}
                        <circle cx="23" cy="12" r="10"
                          fill={venn==="right"||venn==="full" ? "currentColor" : "none"}
                          className={venn==="right"||venn==="full" ? color.split(" ")[0] : ""}
                          stroke="currentColor"
                          strokeWidth="1.5"
                          opacity={venn==="right"||venn==="full" ? "0.3" : "0.5"}
                        />
                        {/* Center overlap highlight */}
                        <ellipse cx="18" cy="12" rx="5" ry="9"
                          fill="currentColor"
                          className={color.split(" ")[0]}
                          opacity="0.5"
                        />
                      </svg>
                      <p className={`font-mono font-bold ${color.split(" ")[0]}`}>{name}</p>
                      <p className="text-xs text-muted-foreground ml-1">{desc}</p>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-border/50">
                      <pre className="bg-[oklch(0.13_0.004_260)] px-5 py-3 text-xs text-emerald-300/80 font-mono leading-6 overflow-x-auto">{sql}</pre>
                      <div className="bg-[oklch(0.13_0.004_260)] px-4 py-3">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-2">Result</p>
                        <table className="w-full text-[11px] font-mono">
                          <thead><tr className="border-b border-border/30">
                            <th className="pb-1 text-left text-foreground/40">name</th>
                            <th className="pb-1 text-left text-foreground/40">dept_name</th>
                          </tr></thead>
                          <tbody className="divide-y divide-border/20">
                            {rows.map(([n,d],i)=>(
                              <tr key={i}>
                                <td className={`py-1 pr-4 ${n==="NULL" ? "text-muted-foreground italic" : "text-foreground/80"}`}>{n}</td>
                                <td className={`py-1 ${d==="NULL" ? "text-muted-foreground italic" : "text-sky-300/70"}`}>{d}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p className={`text-[10px] mt-2.5 ${color.split(" ")[0]} opacity-70`}>{note}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick comparison */}
              <div className="mt-5 border border-border rounded-lg overflow-hidden text-xs">
                <div className="px-4 py-2.5 bg-muted/40 border-b border-border font-semibold text-foreground text-sm">Quick Comparison</div>
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-muted/20 text-[10px]">
                    <th className="px-4 py-2 text-left text-muted-foreground font-medium">JOIN type</th>
                    <th className="px-4 py-2 text-left text-muted-foreground font-medium">Matched rows</th>
                    <th className="px-4 py-2 text-left text-muted-foreground font-medium">Unmatched LEFT</th>
                    <th className="px-4 py-2 text-left text-muted-foreground font-medium">Unmatched RIGHT</th>
                    <th className="px-4 py-2 text-left text-muted-foreground font-medium">Result rows</th>
                  </tr></thead>
                  <tbody className="divide-y divide-border/50">
                    {[
                      { j:"INNER JOIN", c:"text-violet-400", m:"✓","l":"✗","r":"✗", res:"2" },
                      { j:"LEFT JOIN",  c:"text-sky-400",    m:"✓","l":"✓","r":"✗", res:"3" },
                      { j:"RIGHT JOIN", c:"text-emerald-400",m:"✓","l":"✗","r":"✓", res:"3" },
                      { j:"FULL JOIN",  c:"text-amber-400",  m:"✓","l":"✓","r":"✓", res:"4" },
                    ].map(({ j, c, m, l, r, res }) => (
                      <tr key={j} className="hover:bg-muted/20">
                        <td className={`px-4 py-2.5 font-mono font-bold ${c}`}>{j}</td>
                        <td className="px-4 py-2.5 text-emerald-400">{m}</td>
                        <td className={`px-4 py-2.5 ${l==="✓" ? "text-emerald-400" : "text-rose-400"}`}>{l}</td>
                        <td className={`px-4 py-2.5 ${r==="✓" ? "text-emerald-400" : "text-rose-400"}`}>{r}</td>
                        <td className="px-4 py-2.5 text-foreground/70">{res} rows</td>
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
