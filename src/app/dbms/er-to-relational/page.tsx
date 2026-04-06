"use client";

import ERDiagram from "@/components/er-diagram-loader";
import { MarkerType } from "@xyflow/react";
import type { Node, Edge } from "@xyflow/react";

const sections = [
  { id: "design-steps",   label: "Designing an ER Diagram" },
  { id: "mapping-rules",  label: "ER → Relational Rules" },
  { id: "rule-strong",    label: "Rule 1 — Strong Entity" },
  { id: "rule-weak",      label: "Rule 2 — Weak Entity" },
  { id: "rule-1-1",       label: "Rule 3 — 1:1 Relationship" },
  { id: "rule-1-n",       label: "Rule 4 — 1:N Relationship" },
  { id: "rule-m-n",       label: "Rule 5 — M:N Relationship" },
  { id: "rule-multival",  label: "Rule 6 — Multi-valued Attr" },
  { id: "rule-composite", label: "Rule 7 — Composite Attr" },
  { id: "rule-special",   label: "Rule 8 — Specialization" },
  { id: "worked-example", label: "Worked Example" },
];

/* ─── Worked Example ER Diagram (E-commerce) ─────────────────── */
const exNodes: Node[] = [
  { id: "customer", type: "entity", position: { x: 20, y: 20 },
    data: { label: "CUSTOMER", attrs: [{ name: "customer_id", pk: true }, { name: "name" }, { name: "email" }] } },
  { id: "places", type: "relationship", position: { x: 210, y: 36 }, data: { label: "PLACES" } },
  { id: "order", type: "entity", position: { x: 340, y: 20 },
    data: { label: "ORDER", attrs: [{ name: "order_id", pk: true }, { name: "customer_id", fk: true }, { name: "date" }, { name: "status" }] } },
  { id: "contains", type: "relationship", position: { x: 530, y: 36 }, data: { label: "CONTAINS" } },
  { id: "order_item", type: "entity", position: { x: 660, y: 20 },
    data: { label: "ORDER ITEM", weak: true, attrs: [{ name: "order_id", fk: true }, { name: "product_id", fk: true }, { name: "qty" }, { name: "price" }] } },

  { id: "includes", type: "relationship", position: { x: 700, y: 240 }, data: { label: "INCLUDES" } },
  { id: "product", type: "entity", position: { x: 640, y: 360 },
    data: { label: "PRODUCT", attrs: [{ name: "product_id", pk: true }, { name: "name" }, { name: "price" }] } },
  { id: "belongs", type: "relationship", position: { x: 430, y: 380 }, data: { label: "BELONGS TO" } },
  { id: "category", type: "entity", position: { x: 270, y: 360 },
    data: { label: "CATEGORY", attrs: [{ name: "cat_id", pk: true }, { name: "name" }] } },
];

const s = { stroke: "oklch(0.55 0.12 264)", strokeWidth: 1.5 };
const t = { stroke: "oklch(0.70 0.15 80)",  strokeWidth: 1.5 };
const lb = { fill: "oklch(0.18 0.006 260)", fillOpacity: 1 };
const sl = { fill: "oklch(0.75 0.08 264)", fontSize: 11, fontWeight: 700 };
const tl = { fill: "oklch(0.72 0.16 80)",  fontSize: 11, fontWeight: 700 };

const exEdges: Edge[] = [
  { id: "c-places",    source: "customer",   target: "places",     type: "default", label: "1", style: s, labelStyle: sl, labelBgStyle: lb },
  { id: "places-o",   source: "places",     target: "order",      type: "double",  label: "N", style: t, labelStyle: tl, labelBgStyle: lb },
  { id: "o-contains", source: "order",      target: "contains",   type: "double",  label: "1", style: t, labelStyle: tl, labelBgStyle: lb },
  { id: "contains-oi",source: "contains",   target: "order_item", type: "double",  label: "N", style: t, labelStyle: tl, labelBgStyle: lb },
  { id: "oi-includes", source: "order_item", target: "includes", sourceHandle: "bottom", type: "double", label: "N", style: t, labelStyle: tl, labelBgStyle: lb },
  { id: "includes-p",  source: "includes",  target: "product",  targetHandle: "top",    type: "default", label: "1", style: s, labelStyle: sl, labelBgStyle: lb },
  { id: "p-belongs",   source: "product",   target: "belongs",    type: "double",  label: "N", style: t, labelStyle: tl, labelBgStyle: lb },
  { id: "belongs-cat", source: "belongs",   target: "category",   type: "default", label: "1", style: s, labelStyle: sl, labelBgStyle: lb },
];

/* ─── Helpers ─────────────────────────────────────────────────── */
function RuleCard({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="border border-border rounded-lg overflow-hidden">
      <div className="px-5 py-3 bg-muted/40 border-b border-border flex items-center gap-3">
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex items-center justify-center">{num}</span>
        <p className="font-semibold text-violet-400 text-sm">{title}</p>
      </div>
      <div className="px-5 py-4 space-y-3 text-sm">{children}</div>
    </div>
  );
}

function SQL({ children }: { children: string }) {
  return (
    <pre className="bg-[oklch(0.13_0.004_260)] border border-border rounded-lg px-4 py-3 text-xs text-emerald-300/80 overflow-x-auto leading-6 font-mono">
      {children}
    </pre>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted/50 border-l-4 border-amber-500/50 rounded-md px-4 py-2 text-xs text-foreground/70">
      <span className="text-amber-400 font-semibold">Note: </span>{children}
    </div>
  );
}

export default function ERToRelational() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16 flex gap-12">
        <main className="flex-1 min-w-0">

          {/* Header */}
          <div className="mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/30 rounded-full px-3 py-1">
              DBMS · ER Diagrams
            </span>
            <h1 className="mt-4 text-4xl tracking-tight text-foreground font-heading">
              ER Diagrams to Relational Model
            </h1>
            <p className="mt-4 text-xl text-muted-foreground leading-relaxed">
              How to go from real-world requirements → an ER diagram → actual database tables.
            </p>
          </div>

          <div className="space-y-14 text-foreground/80 text-base leading-7">

            {/* Step by step design */}
            <section id="design-steps">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Designing an ER Diagram
              </h2>
              <p className="mb-6">
                ER design is a structured process. Given a set of requirements, follow these steps in order.
              </p>

              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    title: "Identify the entities",
                    desc: "Read the requirements and pick out the nouns — things that have independent existence and need data stored about them.",
                    eg: "\"The system manages customers, products, and orders.\" → CUSTOMER, PRODUCT, ORDER",
                    color: "bg-violet-500/20 text-violet-400",
                  },
                  {
                    step: "2",
                    title: "Identify attributes for each entity",
                    desc: "For each entity, list the properties you need to store. Mark which one uniquely identifies each record — that's the key attribute.",
                    eg: "CUSTOMER → customer_id (PK), name, email, phone\nPRODUCT  → product_id (PK), name, price, stock",
                    color: "bg-sky-500/20 text-sky-400",
                  },
                  {
                    step: "3",
                    title: "Identify the relationships",
                    desc: "Look for verbs in the requirements — they usually describe relationships. Name each relationship and list which entities it connects.",
                    eg: "\"A customer places orders.\" → CUSTOMER PLACES ORDER\n\"An order contains products.\" → ORDER CONTAINS PRODUCT",
                    color: "bg-emerald-500/20 text-emerald-400",
                  },
                  {
                    step: "4",
                    title: "Determine cardinality",
                    desc: "For each relationship, ask: how many on each side? Think from both directions.",
                    eg: "\"Can one customer place many orders?\" → Yes → 1:N\n\"Can one order have many products?\" → Yes, and one product in many orders → M:N",
                    color: "bg-amber-500/20 text-amber-400",
                  },
                  {
                    step: "5",
                    title: "Add participation constraints",
                    desc: "For each entity in each relationship, ask: must every instance participate? If yes → total. If not → partial.",
                    eg: "Every ORDER must belong to a CUSTOMER → total on ORDER\nA CUSTOMER may exist without placing an order → partial on CUSTOMER",
                    color: "bg-rose-500/20 text-rose-400",
                  },
                  {
                    step: "6",
                    title: "Identify weak entities",
                    desc: "If an entity has no meaningful PK on its own and cannot exist without a parent, mark it as a weak entity. Its relationship with the parent is an identifying relationship.",
                    eg: "ORDER_ITEM has no ID of its own. It only makes sense as part of an ORDER. Weak entity.",
                    color: "bg-violet-500/20 text-violet-400",
                  },
                ].map(({ step, title, desc, eg, color }) => (
                  <div key={step} className="border border-border rounded-lg overflow-hidden">
                    <div className="px-5 py-3 bg-muted/40 border-b border-border flex items-center gap-3">
                      <span className={`flex-shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${color}`}>{step}</span>
                      <p className="font-semibold text-foreground text-sm">{title}</p>
                    </div>
                    <div className="px-5 py-4 space-y-2 text-sm">
                      <p className="text-foreground/80">{desc}</p>
                      <pre className="bg-[oklch(0.13_0.004_260)] border border-border rounded-lg px-4 py-2.5 text-xs text-sky-300/80 font-mono leading-5 whitespace-pre-wrap">{eg}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Mapping Rules */}
            <section id="mapping-rules">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                ER → Relational Mapping Rules
              </h2>
              <p className="mb-6">
                Once you have an ER diagram, converting it to relational tables follows a fixed set of rules.
                Each construct in the ER diagram maps to one or more tables.
              </p>

              <div className="space-y-4">

                {/* Rule 1 */}
                <RuleCard id="rule-strong" num="1" title="Strong Entity → Table">
                  <p className="text-foreground/80">Create a table with the same name. Each attribute becomes a column. The key attribute becomes the primary key.</p>
                  <SQL>{`CUSTOMER (customer_id, name, email, phone)
                    ↓
CREATE TABLE customer (
  customer_id  INT         PRIMARY KEY,
  name         VARCHAR(50) NOT NULL,
  email        VARCHAR(100),
  phone        VARCHAR(15)
);`}</SQL>
                </RuleCard>

                {/* Rule 2 */}
                <RuleCard id="rule-weak" num="2" title="Weak Entity → Table with composite PK">
                  <p className="text-foreground/80">Create a table for the weak entity. Include the parent entity's PK as a foreign key. The primary key is the combination of the parent's PK and the weak entity's partial key (or a surrogate key).</p>
                  <SQL>{`ORDER_ITEM depends on ORDER (partial key: item_no)
                    ↓
CREATE TABLE order_item (
  order_id    INT REFERENCES order(order_id) ON DELETE CASCADE,
  item_no     INT,
  product_id  INT REFERENCES product(product_id),
  qty         INT,
  price       DECIMAL(10,2),
  PRIMARY KEY (order_id, item_no)  -- composite PK
);`}</SQL>
                  <Note>ON DELETE CASCADE enforces the weak entity semantics — if the parent order is deleted, its items are deleted too.</Note>
                </RuleCard>

                {/* Rule 3 */}
                <RuleCard id="rule-1-1" num="3" title="1:1 Relationship → FK on the total participation side">
                  <p className="text-foreground/80">Add a foreign key to the table whose entity has <strong>total participation</strong> — it&apos;s the one that must always be linked. Optionally add a UNIQUE constraint to enforce the 1:1.</p>
                  <SQL>{`EMPLOYEE (1) ── HAS ── (1) PASSPORT
Employee has partial participation (not every employee has a passport).
Passport has total participation (every passport belongs to an employee).
                    ↓
CREATE TABLE passport (
  passport_id  INT         PRIMARY KEY,
  employee_id  INT         UNIQUE REFERENCES employee(employee_id),
  country      VARCHAR(50),
  expiry       DATE
);
-- FK goes on the PASSPORT table (total participation side)
-- UNIQUE ensures one passport per employee`}</SQL>
                  <Note>If both sides are total (like Student ↔ StudentCard), you can merge them into one table or use the shared PK pattern: the FK itself becomes the PK.</Note>
                </RuleCard>

                {/* Rule 4 */}
                <RuleCard id="rule-1-n" num="4" title="1:N Relationship → FK on the N side">
                  <p className="text-foreground/80">No new table needed. Add a foreign key column to the table on the <strong>many</strong> side, referencing the PK of the <strong>one</strong> side.</p>
                  <SQL>{`CUSTOMER (1) ── PLACES ── (N) ORDER
One customer places many orders. Each order belongs to one customer.
                    ↓
CREATE TABLE order (
  order_id     INT         PRIMARY KEY,
  customer_id  INT         REFERENCES customer(customer_id),  -- FK goes here (N side)
  date         DATE,
  status       VARCHAR(20)
);`}</SQL>
                  <Note>The FK always goes on the N side — the &quot;many&quot; table. Think of it as: each order needs to know which customer it belongs to.</Note>
                </RuleCard>

                {/* Rule 5 */}
                <RuleCard id="rule-m-n" num="5" title="M:N Relationship → Junction table">
                  <p className="text-foreground/80">Create a new table (junction/bridge table) with the PKs of both entities as foreign keys. Together they form the composite PK. Any attributes on the relationship itself also go into this table.</p>
                  <SQL>{`STUDENT (M) ── ENROLLS ── (N) COURSE
A student enrolls in many courses. A course has many students enrolled.
                    ↓
CREATE TABLE enrollment (
  student_id  INT  REFERENCES student(student_id),
  course_id   INT  REFERENCES course(course_id),
  grade       CHAR(2),
  enrolled_on DATE,
  PRIMARY KEY (student_id, course_id)  -- composite PK
);`}</SQL>
                  <Note>The junction table effectively decomposes the M:N into two 1:N relationships. In practice, most teams add a surrogate <span className="font-mono">enrollment_id INT PK</span> for easier referencing from other tables.</Note>
                </RuleCard>

                {/* Rule 6 */}
                <RuleCard id="rule-multival" num="6" title="Multi-valued Attribute → Separate table">
                  <p className="text-foreground/80">A multi-valued attribute (like a list of phone numbers) cannot be stored in a single column. Create a separate table with the entity&apos;s PK and the attribute value. Their combination is the PK.</p>
                  <SQL>{`EMPLOYEE has phone_numbers (multi-valued)
                    ↓
CREATE TABLE employee_phone (
  employee_id  INT     REFERENCES employee(employee_id),
  phone        VARCHAR(15),
  PRIMARY KEY (employee_id, phone)
);
-- One row per phone number. An employee with 3 phones = 3 rows.`}</SQL>
                </RuleCard>

                {/* Rule 7 */}
                <RuleCard id="rule-composite" num="7" title="Composite Attribute → Flatten into individual columns">
                  <p className="text-foreground/80">Don&apos;t store composite attributes as a single column. Split them into their individual parts — one column per sub-attribute. This makes querying and indexing much easier.</p>
                  <SQL>{`CUSTOMER has address (composite: street, city, state, zip)
                    ↓
CREATE TABLE customer (
  customer_id  INT         PRIMARY KEY,
  name         VARCHAR(50),
  -- address split into parts, not stored as one blob:
  street       VARCHAR(100),
  city         VARCHAR(50),
  state        VARCHAR(30),
  zip          VARCHAR(10)
);
-- Now you can query WHERE city = 'Mumbai' directly`}</SQL>
                </RuleCard>

                {/* Rule 8 */}
                <RuleCard id="rule-special" num="8" title="Specialization / Generalization → 3 approaches">
                  <p className="text-foreground/80">When you have a superclass with subclasses (IS-A hierarchy), there are three ways to map it to tables. Each has trade-offs.</p>

                  <div className="space-y-3">
                    {[
                      {
                        approach: "A — Single Table (Table per Hierarchy)",
                        color: "border-violet-500/30 bg-violet-500/5",
                        head: "text-violet-400",
                        sql: `-- One table for all classes, nullable columns for subclass attrs
CREATE TABLE employee (
  emp_id      INT PRIMARY KEY,
  name        VARCHAR(50),
  salary      DECIMAL,
  type        VARCHAR(20),  -- 'manager' | 'engineer' | 'secretary'
  -- manager-specific (null for others):
  dept        VARCHAR(30),
  budget      DECIMAL,
  -- engineer-specific (null for others):
  tech_stack  VARCHAR(100)
);`,
                        pros: "Simple, one join needed.",
                        cons: "Many NULLs. Subclass constraints harder to enforce.",
                      },
                      {
                        approach: "B — Table per Type (Table per Subclass)",
                        color: "border-sky-500/30 bg-sky-500/5",
                        head: "text-sky-400",
                        sql: `-- Superclass table + one table per subclass (FK = PK)
CREATE TABLE employee (emp_id INT PK, name VARCHAR, salary DECIMAL);

CREATE TABLE manager (
  emp_id  INT PRIMARY KEY REFERENCES employee(emp_id),
  dept    VARCHAR(30),
  budget  DECIMAL
);
CREATE TABLE engineer (
  emp_id      INT PRIMARY KEY REFERENCES employee(emp_id),
  tech_stack  VARCHAR(100)
);`,
                        pros: "Clean, no NULLs. Easy to add subclass constraints.",
                        cons: "Needs a JOIN to get full employee data.",
                      },
                      {
                        approach: "C — Table per Concrete Class",
                        color: "border-emerald-500/30 bg-emerald-500/5",
                        head: "text-emerald-400",
                        sql: `-- No superclass table. Each subclass has ALL attributes.
CREATE TABLE manager (
  emp_id INT PK, name VARCHAR, salary DECIMAL,  -- inherited
  dept VARCHAR, budget DECIMAL                   -- own
);
CREATE TABLE engineer (
  emp_id INT PK, name VARCHAR, salary DECIMAL,  -- inherited
  tech_stack VARCHAR                             -- own
);`,
                        pros: "No joins needed within a subclass.",
                        cons: "Superclass attributes duplicated. Hard to query across all employees.",
                      },
                    ].map(({ approach, color, head, sql, pros, cons }) => (
                      <div key={approach} className={`border ${color} rounded-lg overflow-hidden`}>
                        <p className={`px-4 py-2 text-xs font-semibold ${head} border-b border-border/50`}>{approach}</p>
                        <div className="px-4 py-3 space-y-2">
                          <SQL>{sql}</SQL>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded px-3 py-1.5">
                              <span className="text-emerald-400 font-medium">Pros: </span>
                              <span className="text-foreground/60">{pros}</span>
                            </div>
                            <div className="bg-red-500/10 border border-red-500/20 rounded px-3 py-1.5">
                              <span className="text-red-400 font-medium">Cons: </span>
                              <span className="text-foreground/60">{cons}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Note>Most real-world systems use approach B (table per type) for clean normalization, or A (single table) when performance matters and NULLs are acceptable.</Note>
                </RuleCard>

              </div>
            </section>

            {/* Worked Example */}
            <section id="worked-example">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Worked Example — E-commerce System
              </h2>
              <p className="mb-2 text-sm text-muted-foreground">
                Requirements: Customers place orders. Each order contains products. Products belong to categories. Order items track quantity and price at time of purchase.
              </p>

              {/* ER Diagram */}
              <div className="mb-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Step 1 — ER Diagram</p>
                <ERDiagram initialNodes={exNodes} initialEdges={exEdges} height={500} />
                <div className="mt-3 flex flex-wrap gap-3 text-xs">
                  {[
                    { color: "bg-violet-500/20 border-violet-500/40 text-violet-300", label: "Strong Entity" },
                    { color: "bg-violet-500/10 border-violet-500/20 text-violet-400/70", label: "Weak Entity" },
                    { color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300", label: "Relationship" },
                  ].map(({ color, label }) => (
                    <span key={label} className={`border rounded-full px-3 py-1 ${color}`}>{label}</span>
                  ))}
                  <span className="flex items-center gap-1.5 border border-border rounded-full px-3 py-1">
                    <svg width="20" height="8" viewBox="0 0 20 8"><line x1="0" y1="4" x2="20" y2="4" stroke="oklch(0.55 0.12 264)" strokeWidth="2"/></svg>
                    <span className="text-muted-foreground">Partial</span>
                  </span>
                  <span className="flex items-center gap-1.5 border border-border rounded-full px-3 py-1">
                    <svg width="20" height="8" viewBox="0 0 20 8"><line x1="0" y1="2" x2="20" y2="2" stroke="oklch(0.70 0.15 80)" strokeWidth="2"/><line x1="0" y1="6" x2="20" y2="6" stroke="oklch(0.70 0.15 80)" strokeWidth="2"/></svg>
                    <span className="text-muted-foreground">Total</span>
                  </span>
                </div>
              </div>

              {/* Resulting tables */}
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Step 2 — Resulting Relational Tables</p>
                <div className="space-y-3">
                  {[
                    {
                      table: "customer",
                      rule: "Rule 1 — Strong Entity",
                      color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
                      cols: [
                        { name: "customer_id", type: "INT", constraint: "PK" },
                        { name: "name",        type: "VARCHAR(50)", constraint: "" },
                        { name: "email",       type: "VARCHAR(100)", constraint: "UNIQUE" },
                      ],
                    },
                    {
                      table: "category",
                      rule: "Rule 1 — Strong Entity",
                      color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
                      cols: [
                        { name: "cat_id", type: "INT",         constraint: "PK" },
                        { name: "name",   type: "VARCHAR(50)", constraint: "" },
                      ],
                    },
                    {
                      table: "product",
                      rule: "Rule 1 + Rule 4 (1:N from category)",
                      color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
                      cols: [
                        { name: "product_id", type: "INT",           constraint: "PK" },
                        { name: "name",       type: "VARCHAR(100)",  constraint: "" },
                        { name: "price",      type: "DECIMAL(10,2)", constraint: "" },
                        { name: "cat_id",     type: "INT",           constraint: "FK → category" },
                      ],
                    },
                    {
                      table: "order",
                      rule: "Rule 1 + Rule 4 (1:N from customer)",
                      color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
                      cols: [
                        { name: "order_id",    type: "INT",         constraint: "PK" },
                        { name: "customer_id", type: "INT",         constraint: "FK → customer" },
                        { name: "date",        type: "DATE",        constraint: "" },
                        { name: "status",      type: "VARCHAR(20)", constraint: "" },
                      ],
                    },
                    {
                      table: "order_item",
                      rule: "Rule 2 — Weak Entity (M:N bridge)",
                      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
                      cols: [
                        { name: "order_id",   type: "INT",           constraint: "PK + FK → order" },
                        { name: "product_id", type: "INT",           constraint: "PK + FK → product" },
                        { name: "qty",        type: "INT",           constraint: "" },
                        { name: "price",      type: "DECIMAL(10,2)", constraint: "price at time of purchase" },
                      ],
                    },
                  ].map(({ table, rule, color, cols }) => (
                    <div key={table} className="border border-border rounded-lg overflow-hidden text-sm">
                      <div className="px-5 py-2.5 bg-muted/40 border-b border-border flex items-center justify-between">
                        <p className="font-mono font-semibold text-foreground/90">{table}</p>
                        <span className={`text-[10px] font-medium border rounded-full px-2 py-0.5 ${color}`}>{rule}</span>
                      </div>
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border/50">
                            <th className="text-left px-5 py-2 text-muted-foreground font-medium">Column</th>
                            <th className="text-left px-4 py-2 text-muted-foreground font-medium">Type</th>
                            <th className="text-left px-4 py-2 text-muted-foreground font-medium">Constraint</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cols.map((col) => (
                            <tr key={col.name} className="border-b border-border/30 last:border-0">
                              <td className="px-5 py-2 font-mono text-foreground/80">{col.name}</td>
                              <td className="px-4 py-2 font-mono text-muted-foreground">{col.type}</td>
                              <td className="px-4 py-2 text-muted-foreground">{col.constraint}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-muted/50 border-l-4 border-emerald-500/50 rounded-md px-5 py-4 text-sm text-foreground/70">
                <strong className="text-emerald-400">Summary of rules applied:</strong>
                <ul className="mt-2 space-y-1 text-xs list-disc list-inside">
                  <li>customer, category, product, order → <span className="text-violet-300">Rule 1</span> (strong entities)</li>
                  <li>order_item → <span className="text-violet-300">Rule 2</span> (weak entity, composite PK)</li>
                  <li>product.cat_id → <span className="text-violet-300">Rule 4</span> (1:N, FK on the N side)</li>
                  <li>order.customer_id → <span className="text-violet-300">Rule 4</span> (1:N, FK on the N side)</li>
                  <li>order_item also acts as the M:N junction → <span className="text-violet-300">Rule 5</span> pattern</li>
                </ul>
              </div>
            </section>

          </div>
        </main>

        {/* Right-side TOC */}
        <aside className="hidden lg:block w-52 flex-shrink-0">
          <div className="sticky top-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">On this page</p>
            <nav className="space-y-1">
              {sections.map(({ id, label }) => (
                <a key={id} href={`#${id}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-0.5">
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
