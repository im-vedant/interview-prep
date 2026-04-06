"use client";

import ERDiagram from "@/components/er-diagram-loader";
import type { Node, Edge } from "@xyflow/react";

const sections = [
  { id: "what-is-a-data-model", label: "What is a Data Model?" },
  { id: "types-of-data-models", label: "Types of Data Models" },
  { id: "schema-vs-data-model", label: "Schema vs Data Model" },
  { id: "rdbms", label: "RDBMS" },
  { id: "er-model", label: "ER Model" },
  { id: "er-notation", label: "ER Notation Reference" },
  { id: "er-components", label: "ER Components" },
  { id: "relationship-types", label: "Relationship Types" },
  { id: "participation", label: "Participation Constraints" },
  { id: "er-diagram-example", label: "ER Diagram Example" },
  { id: "extended-er", label: "Extended ER (EER)" },
];

/* ─── University ER Diagram ───────────────────────────────────── */
const uniNodes: Node[] = [
  // Top row: M:N chain (Student ↔ Course via Enrollment weak entity)
  {
    id: "student",
    type: "entity",
    position: { x: 20, y: 20 },
    data: { label: "STUDENT", attrs: [{ name: "student_id", pk: true }, { name: "name" }, { name: "email" }] },
  },
  { id: "enrolls", type: "relationship", position: { x: 210, y: 36 }, data: { label: "ENROLLS" } },
  {
    id: "enrollment",
    type: "entity",
    position: { x: 340, y: 20 },
    data: {
      label: "ENROLLMENT",
      weak: true,
      attrs: [{ name: "student_id", fk: true }, { name: "course_id", fk: true }, { name: "grade" }],
    },
  },
  { id: "isfor", type: "relationship", position: { x: 530, y: 36 }, data: { label: "IS FOR" } },
  {
    id: "course",
    type: "entity",
    position: { x: 660, y: 20 },
    data: { label: "COURSE", attrs: [{ name: "course_id", pk: true }, { name: "title" }, { name: "credits" }] },
  },

  // Bottom-left: 1:1 branch (Student → StudentCard weak entity)
  { id: "has", type: "relationship", position: { x: 44, y: 250 }, data: { label: "HAS" } },
  {
    id: "student_card",
    type: "entity",
    position: { x: 20, y: 360 },
    data: {
      label: "STUDENT CARD",
      weak: true,
      attrs: [{ name: "card_no" }, { name: "student_id", fk: true }, { name: "valid_until" }],
    },
  },

  // Bottom-right: 1:N branch (Course → Department)
  { id: "offeredby", type: "relationship", position: { x: 681, y: 250 }, data: { label: "OFFERED BY" } },
  {
    id: "department",
    type: "entity",
    position: { x: 660, y: 360 },
    data: { label: "DEPARTMENT", attrs: [{ name: "dept_id", pk: true }, { name: "name" }, { name: "building" }] },
  },
];

const singleStyle = { stroke: "oklch(0.55 0.12 264)", strokeWidth: 1.5 };
const totalStyle  = { stroke: "oklch(0.70 0.15 80)",  strokeWidth: 1.5 };
const singleLbl   = { fill: "oklch(0.75 0.08 264)", fontSize: 11, fontWeight: 700 };
const totalLbl    = { fill: "oklch(0.72 0.16 80)",  fontSize: 11, fontWeight: 700 };
const lblBg       = { fill: "oklch(0.18 0.006 260)", fillOpacity: 1 };

const uniEdges: Edge[] = [
  // M:N: Student ↔ Course via Enrollment (weak)
  // — STUDENT has partial participation (can exist without enrolling)
  // — ENROLLMENT has total participation in both (must always link a student AND a course)
  { id: "s-enrolls",   source: "student",    target: "enrolls",    type: "default", label: "1", style: singleStyle, labelStyle: singleLbl, labelBgStyle: lblBg },
  { id: "enrolls-e",   source: "enrolls",    target: "enrollment", type: "double",  label: "N", style: totalStyle,  labelStyle: totalLbl,  labelBgStyle: lblBg },
  { id: "e-isfor",     source: "enrollment", target: "isfor",      type: "double",  label: "N", style: totalStyle,  labelStyle: totalLbl,  labelBgStyle: lblBg },
  { id: "isfor-c",     source: "isfor",      target: "course",     type: "default", label: "1", style: singleStyle, labelStyle: singleLbl, labelBgStyle: lblBg },

  // 1:1: Student ↔ Student Card (weak)
  // — both sides total: every student must have a card, every card must belong to a student
  { id: "s-has",  source: "student",      target: "has",          sourceHandle: "bottom",                           type: "double", label: "1", style: totalStyle, labelStyle: totalLbl, labelBgStyle: lblBg },
  { id: "has-sc", source: "has",          target: "student_card", sourceHandle: "bottom", targetHandle: "top",      type: "double", label: "1", style: totalStyle, labelStyle: totalLbl, labelBgStyle: lblBg },

  // 1:N: Department → Course
  // — COURSE has total participation (every course must belong to a department)
  // — DEPARTMENT has partial participation (a dept can exist with no courses yet)
  { id: "c-offeredby",    source: "course",     target: "offeredby",  sourceHandle: "bottom",                       type: "double",  label: "N", style: totalStyle,  labelStyle: totalLbl,  labelBgStyle: lblBg },
  { id: "offeredby-dept", source: "offeredby",  target: "department", sourceHandle: "bottom", targetHandle: "top",  type: "default", label: "1", style: singleStyle, labelStyle: singleLbl, labelBgStyle: lblBg },
];

/* ─── Participation Diagram ───────────────────────────────────── */
const participationNodes: Node[] = [
  {
    id: "customer",
    type: "entity",
    position: { x: 30, y: 80 },
    data: {
      label: "CUSTOMER",
      attrs: [
        { name: "customer_id", pk: true },
        { name: "name" },
        { name: "email" },
      ],
    },
  },
  {
    id: "has",
    type: "relationship",
    position: { x: 270, y: 93 },
    data: { label: "HAS" },
  },
  {
    id: "loan",
    type: "entity",
    position: { x: 470, y: 80 },
    data: {
      label: "LOAN",
      attrs: [
        { name: "loan_id", pk: true },
        { name: "amount" },
        { name: "customer_id", fk: true },
      ],
    },
  },
];

const partialEdgeStyle = { stroke: "oklch(0.55 0.12 264)", strokeWidth: 1.5 };
const totalEdgeStyle  = { stroke: "oklch(0.72 0.16 80)",  strokeWidth: 1.5 };

/* ─── EER Specialization Diagram ─────────────────────────────── */
const eerNodes: Node[] = [
  {
    id: "employee",
    type: "entity",
    position: { x: 160, y: 20 },
    data: { label: "EMPLOYEE", accent: "amber", attrs: [{ name: "emp_id", pk: true }, { name: "name" }, { name: "salary" }, { name: "hire_date" }] },
  },
  { id: "spec", type: "specialization", position: { x: 215, y: 190 }, data: { specType: "d" } },
  {
    id: "manager",
    type: "entity",
    position: { x: 20, y: 300 },
    data: { label: "MANAGER", accent: "sky", attrs: [{ name: "dept" }, { name: "budget" }] },
  },
  {
    id: "engineer",
    type: "entity",
    position: { x: 360, y: 300 },
    data: { label: "ENGINEER", accent: "sky", attrs: [{ name: "tech_stack" }, { name: "projects" }] },
  },
];

const isaStyle = { stroke: "oklch(0.58 0.005 260)", strokeWidth: 1.5 };

const eerEdges: Edge[] = [
  { id: "emp-spec", source: "employee", target: "spec",     sourceHandle: "bottom", targetHandle: "top",   style: isaStyle },
  { id: "spec-mgr", source: "spec",     target: "manager",  sourceHandle: "left",   targetHandle: "top",   style: isaStyle },
  { id: "spec-eng", source: "spec",     target: "engineer", sourceHandle: "right",  targetHandle: "top",   style: isaStyle },
];

/* ─── Aggregation Diagram ─────────────────────────────────────── */
const aggNodes: Node[] = [
  // Dashed box wrapping the inner relationship (zIndex behind)
  {
    id: "aggbox",
    type: "aggbox",
    position: { x: 270, y: 20 },
    zIndex: -1,
    draggable: false,
    style: { width: 490, height: 195 },
    data: { label: "aggregation" },
  },
  // Outside: MANAGER connects via SUPERVISES to the whole box
  {
    id: "mgr_agg",
    type: "entity",
    position: { x: 20, y: 75 },
    data: { label: "MANAGER", accent: "sky", attrs: [{ name: "emp_id", pk: true }, { name: "name" }, { name: "dept" }] },
  },
  { id: "supervises", type: "relationship", position: { x: 185, y: 103 }, data: { label: "SUPERVISES" } },
  // Inside box: EMPLOYEE — WORKS ON — PROJECT
  {
    id: "emp_agg",
    type: "entity",
    position: { x: 290, y: 48 },
    data: { label: "EMPLOYEE", accent: "amber", attrs: [{ name: "emp_id", pk: true }, { name: "name" }] },
  },
  { id: "works_on", type: "relationship", position: { x: 480, y: 88 }, data: { label: "WORKS ON" } },
  {
    id: "proj_agg",
    type: "entity",
    position: { x: 610, y: 48 },
    data: { label: "PROJECT", attrs: [{ name: "proj_id", pk: true }, { name: "title" }] },
  },
];

const aggLineStyle = { stroke: "oklch(0.55 0.12 264)", strokeWidth: 1.5 };

const aggEdges: Edge[] = [
  // Inside the box
  { id: "emp-works",   source: "emp_agg",   target: "works_on",  style: aggLineStyle },
  { id: "works-proj",  source: "works_on",  target: "proj_agg",  style: aggLineStyle },
  // MANAGER supervises the aggregated unit (connects to the box)
  { id: "mgr-sup",     source: "mgr_agg",   target: "supervises", style: aggLineStyle },
  { id: "sup-aggbox",  source: "supervises", target: "aggbox", targetHandle: "left", style: aggLineStyle },
];

const participationEdges: Edge[] = [
  {
    id: "c-has",
    source: "customer",
    target: "has",
    type: "default",
    label: "partial",
    style: partialEdgeStyle,
    labelStyle: { fill: "oklch(0.65 0.12 210)", fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: "oklch(0.18 0.006 260)", fillOpacity: 1 },
  },
  {
    id: "has-loan",
    source: "has",
    target: "loan",
    type: "double",
    label: "total",
    style: totalEdgeStyle,
    labelStyle: { fill: "oklch(0.72 0.16 80)", fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: "oklch(0.18 0.006 260)", fillOpacity: 1 },
  },
];

export default function DataModels() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16 flex gap-12">

        {/* Main content */}
        <main className="flex-1 min-w-0">

          {/* Header */}
          <div className="mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/30 rounded-full px-3 py-1">
              DBMS · Data Models
            </span>
            <h1 className="mt-4 text-4xl tracking-tight text-foreground font-heading">
              Data Models & ER Model
            </h1>
            <p className="mt-4 text-xl text-muted-foreground leading-relaxed">
              Before building a database, you need a blueprint. Data models are that blueprint.
            </p>
          </div>

          <div className="space-y-14 text-foreground/80 text-base leading-7">

            {/* What is a Data Model */}
            <section id="what-is-a-data-model">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                What is a Data Model?
              </h2>
              <p className="mb-4">
                A <strong>data model</strong>{" "}is an abstract representation of how data is organised,
                stored, and related to each other in a database. It defines the structure of the data,
                the operations you can perform on it, and the constraints it must follow.
              </p>
              <p className="mb-4">
                Think of it like an architectural blueprint. Before a building is constructed,
                an architect draws a plan — where the rooms are, how they connect, what fits where.
                A data model does the same for a database before any actual tables are created.
              </p>
              <div className="grid grid-cols-3 gap-3 text-sm">
                {[
                  { label: "Structure", desc: "What data exists and how it is organised — tables, documents, trees.", color: "border-l-sky-500/60 text-sky-400" },
                  { label: "Operations", desc: "What you can do with the data — query, insert, update, delete.", color: "border-l-violet-500/60 text-violet-400" },
                  { label: "Constraints", desc: "Rules the data must follow — unique keys, not-null, foreign keys.", color: "border-l-emerald-500/60 text-emerald-400" },
                ].map(({ label, desc, color }) => (
                  <div key={label} className={`border border-border border-l-4 ${color.split(" ")[0]} rounded-lg p-4`}>
                    <p className={`font-semibold text-sm ${color.split(" ")[1]}`}>{label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Types of Data Models */}
            <section id="types-of-data-models">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Types of Data Models
              </h2>
              <p className="mb-8 text-foreground/80">
                Data models are split into three levels based on how abstract they are — from a
                high-level business view down to the actual bits on disk.
              </p>

              <div className="space-y-4 text-sm">
                {[
                  {
                    num: "1",
                    name: "Conceptual Data Model",
                    color: "border-l-violet-500/60",
                    titleColor: "text-violet-400",
                    numColor: "bg-violet-500/20 text-violet-400",
                    who: "Business stakeholders & analysts",
                    desc: "The highest, most abstract level. Describes what data exists and what the relationships between them are — without worrying about how it will be stored or which database will be used. It is technology-independent and meant for planning and communication.",
                    focus: "What data do we need and how does it relate?",
                    tool: "ER Diagram (Entity-Relationship Diagram)",
                    eg: "Before building a hospital system, you identify: Patient, Doctor, Appointment, Ward — and draw how they connect. No tables, no columns, just the big picture.",
                  },
                  {
                    num: "2",
                    name: "Logical Data Model",
                    color: "border-l-sky-500/60",
                    titleColor: "text-sky-400",
                    numColor: "bg-sky-500/20 text-sky-400",
                    who: "DBAs & backend developers",
                    desc: "The middle level. Takes the conceptual model and adds structure — defines tables, columns, data types, primary keys, foreign keys, and constraints. Still independent of the physical storage — it doesn't care whether data is on SSD or HDD, or how it is indexed.",
                    focus: "What tables, columns, and relationships exist?",
                    tool: "Relational schema, ER-to-table mapping",
                    eg: "Patient(patient_id INT PK, name VARCHAR(50), dob DATE) — Doctor(doctor_id INT PK, name VARCHAR(50), dept VARCHAR(30)) — Appointment(appt_id INT PK, patient_id FK, doctor_id FK, date DATE)",
                  },
                  {
                    num: "3",
                    name: "Physical Data Model",
                    color: "border-l-emerald-500/60",
                    titleColor: "text-emerald-400",
                    numColor: "bg-emerald-500/20 text-emerald-400",
                    who: "Database engineers & sysadmins",
                    desc: "The lowest level. Describes how data is actually stored on disk — file formats, storage blocks, indexes, partitioning, compression, and access paths. This is specific to the database engine being used and is managed by the DBMS itself.",
                    focus: "How is data physically stored and retrieved?",
                    tool: "B-tree indexes, tablespaces, storage files",
                    eg: "Patient records stored as a clustered B+ tree indexed on patient_id. Name stored as CHAR(50) at byte offset 0. Index file maps patient_id → disk block pointer.",
                  },
                ].map(({ num, name, color, titleColor, numColor, who, desc, focus, tool, eg }) => (
                  <div key={name} className={`border border-border border-l-4 ${color} rounded-lg overflow-hidden`}>
                    <div className="px-5 py-3 bg-muted/40 border-b border-border flex items-center gap-3">
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${numColor}`}>{num}</span>
                      <p className={`font-semibold ${titleColor}`}>{name}</p>
                      <span className="ml-auto text-xs text-muted-foreground">{who}</span>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                      <p className="text-foreground/80">{desc}</p>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-card border border-border rounded-lg p-3">
                          <p className="text-muted-foreground font-medium mb-1">Focus</p>
                          <p className="text-foreground/80 italic">&ldquo;{focus}&rdquo;</p>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-3">
                          <p className="text-muted-foreground font-medium mb-1">Tool / Representation</p>
                          <p className="text-foreground/80">{tool}</p>
                        </div>
                      </div>
                      <div className="bg-muted/50 border-l-4 border-amber-500/50 rounded-md px-4 py-2 text-muted-foreground">
                        <span className="font-medium text-amber-400">Example: </span>{eg}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Flow diagram */}
              <div className="mt-8 flex items-center gap-2 text-sm flex-wrap justify-center">
                {[
                  { label: "Conceptual", sub: "What?", color: "bg-violet-500/10 border-violet-500/40 text-violet-400" },
                  { label: "Logical", sub: "Which tables?", color: "bg-sky-500/10 border-sky-500/40 text-sky-400" },
                  { label: "Physical", sub: "How stored?", color: "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" },
                ].map(({ label, sub, color }, i, arr) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`border rounded-lg px-4 py-2 text-center ${color}`}>
                      <p className="font-semibold text-xs">{label}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{sub}</p>
                    </div>
                    {i < arr.length - 1 && <span className="text-muted-foreground text-lg">→</span>}
                  </div>
                ))}
              </div>
            </section>

            {/* Schema vs Data Model */}
            <section id="schema-vs-data-model">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Schema vs Data Model
              </h2>
              <p className="mb-6">
                These two are often confused. Here&apos;s the clear difference:
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm mb-8">
                <div className="border border-border border-l-4 border-l-violet-500/60 rounded-lg p-5">
                  <p className="font-semibold text-violet-400 mb-2">Data Model</p>
                  <p className="text-foreground/80">
                    The general approach or style — defines <em>how</em> data is structured conceptually.
                    It is the theory.
                  </p>
                  <p className="mt-3 text-muted-foreground text-xs">
                    e.g. &ldquo;Use tables and rows&rdquo; or &ldquo;Use JSON documents&rdquo;
                  </p>
                </div>
                <div className="border border-border border-l-4 border-l-sky-500/60 rounded-lg p-5">
                  <p className="font-semibold text-sky-400 mb-2">Schema</p>
                  <p className="text-foreground/80">
                    The actual specific blueprint for <em>your</em> database using that model —
                    exact tables, column names, types, and constraints. It is the implementation.
                  </p>
                  <p className="mt-3 text-muted-foreground text-xs">
                    e.g. <code>Employee(emp_id INT, name VARCHAR(50), dept_id INT)</code>
                  </p>
                </div>
              </div>

              {/* Analogy */}
              <div className="bg-card border border-border rounded-lg overflow-hidden text-sm mb-6">
                <div className="px-5 py-3 bg-muted/40 border-b border-border">
                  <p className="font-semibold text-amber-400">Analogy — LEGO</p>
                </div>
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="px-5 py-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Data Model</p>
                    <p className="text-foreground/80">The concept of building with LEGO — bricks connect in a specific way, you follow certain rules.</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Schema</p>
                    <p className="text-foreground/80">The specific design you built — 3 rooms, 2 doors, exact dimensions. Your particular structure using those rules.</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 border-l-4 border-emerald-500/50 rounded-md px-5 py-4 text-foreground/80">
                <strong>One line:</strong>{" "}the data model is the <em>theory</em>, the schema is the <em>application of that theory to your specific database</em>.
              </div>
            </section>

            {/* RDBMS */}
            <section id="rdbms">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                RDBMS
              </h2>
              <p className="mb-4">
                A <strong>Relational Database Management System (RDBMS)</strong>{" "}is a DBMS that implements
                the <em>relational data model</em> — it stores data in <strong>tables (relations)</strong>,
                where each row is a tuple and each column is an attribute. Tables are linked to each other
                through <strong>foreign keys</strong>.
              </p>
              <p className="mb-6 text-foreground/80">
                SQL (Structured Query Language) is the standard language used to interact with an RDBMS —
                to create tables, insert rows, query data, and enforce constraints.
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div className="border border-border rounded-lg p-5 space-y-3">
                  <p className="font-semibold text-violet-400 text-sm">Core Properties</p>
                  <ul className="space-y-2 text-xs text-foreground/80">
                    {[
                      { label: "Tables", desc: "Data organised in rows and columns. Each table represents one entity type." },
                      { label: "Primary Key", desc: "Uniquely identifies each row. Cannot be NULL or duplicate." },
                      { label: "Foreign Key", desc: "A column that references the primary key of another table — enforces referential integrity." },
                      { label: "SQL", desc: "Standardised language for querying and managing relational data." },
                      { label: "ACID", desc: "Transactions are Atomic, Consistent, Isolated, and Durable." },
                    ].map(({ label, desc }) => (
                      <li key={label} className="flex gap-2">
                        <span className="flex-shrink-0 text-violet-400 font-semibold">{label}:</span>
                        <span className="text-muted-foreground">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-border rounded-lg p-5 space-y-3">
                  <p className="font-semibold text-sky-400 text-sm">Popular RDBMS Systems</p>
                  <div className="space-y-2 text-xs">
                    {[
                      { name: "PostgreSQL", note: "Open-source, feature-rich, widely used in production." },
                      { name: "MySQL", note: "Open-source, fast, popular in web stacks (LAMP/LEMP)." },
                      { name: "SQLite", note: "Serverless, file-based, embedded in mobile & desktop apps." },
                      { name: "Oracle DB", note: "Enterprise-grade, feature-heavy, used in large organisations." },
                      { name: "SQL Server", note: "Microsoft&apos;s RDBMS, integrates tightly with the .NET ecosystem." },
                    ].map(({ name, note }) => (
                      <div key={name} className="flex items-start gap-2 border border-border rounded-lg px-3 py-2 bg-muted/30">
                        <span className="text-sky-400 font-semibold flex-shrink-0">{name}</span>
                        <span className="text-muted-foreground">{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 border-l-4 border-emerald-500/50 rounded-md px-5 py-4 text-sm text-foreground/80">
                <strong>RDBMS vs DBMS:</strong>{" "}Every RDBMS is a DBMS, but not every DBMS is an RDBMS.
                MongoDB (document store) and Redis (key-value store) are DBMSes but not RDBMSes —
                they do not use the relational model.
              </div>
            </section>

            {/* ER Model */}
            <section id="er-model">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                ER Model
              </h2>
              <p className="mb-4">
                The <strong>Entity-Relationship (ER) Model</strong>{" "}is the most widely used
                conceptual data model. It gives you a visual language to represent the real world
                as <em>entities</em> (things), their{" "}
                <em>attributes</em> (properties), and the <em>relationships</em> between them —
                before you write a single line of SQL.
              </p>
              <p className="mb-6">
                The output of ER modelling is an <strong>ER Diagram</strong>{" "}— a blueprint you hand
                to a developer who then translates it into actual tables.
              </p>

              <div className="grid grid-cols-3 gap-3 text-sm mb-6">

                {/* Entity — Rectangle */}
                <div className="border border-border border-l-4 border-l-violet-500/60 rounded-lg p-4">
                  <p className="font-semibold text-sm text-violet-400 mb-3">Entity</p>
                  <div className="flex justify-center mb-3">
                    <svg width="110" height="44" viewBox="0 0 110 44">
                      <rect x="4" y="4" width="102" height="36" rx="3"
                        fill="oklch(0.18 0.015 264)" stroke="oklch(0.55 0.15 264)" strokeWidth="1.5" />
                      <text x="55" y="27" textAnchor="middle" fill="oklch(0.78 0.1 264)" fontSize="12" fontWeight="600">Patient</text>
                    </svg>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">A real-world object or concept we store data about.</p>
                  <p className="text-xs text-foreground/50 italic">Patient, Doctor, Order</p>
                </div>

                {/* Attribute — Oval */}
                <div className="border border-border border-l-4 border-l-sky-500/60 rounded-lg p-4">
                  <p className="font-semibold text-sm text-sky-400 mb-3">Attribute</p>
                  <div className="flex justify-center mb-3">
                    <svg width="110" height="44" viewBox="0 0 110 44">
                      <ellipse cx="55" cy="22" rx="50" ry="18"
                        fill="oklch(0.18 0.015 210)" stroke="oklch(0.55 0.14 210)" strokeWidth="1.5" />
                      <text x="55" y="27" textAnchor="middle" fill="oklch(0.78 0.1 210)" fontSize="12" fontWeight="600">name</text>
                    </svg>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">A property or characteristic of an entity.</p>
                  <p className="text-xs text-foreground/50 italic">name, dob, phone</p>
                </div>

                {/* Relationship — Diamond */}
                <div className="border border-border border-l-4 border-l-emerald-500/60 rounded-lg p-4">
                  <p className="font-semibold text-sm text-emerald-400 mb-3">Relationship</p>
                  <div className="flex justify-center mb-3">
                    <svg width="110" height="44" viewBox="0 0 110 44">
                      <polygon points="55,3 106,22 55,41 4,22"
                        fill="oklch(0.18 0.025 160)" stroke="oklch(0.55 0.15 160)" strokeWidth="1.5" />
                      <text x="55" y="27" textAnchor="middle" fill="oklch(0.78 0.1 160)" fontSize="11" fontWeight="600">BOOKS</text>
                    </svg>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">An association between two or more entities.</p>
                  <p className="text-xs text-foreground/50 italic">Patient BOOKS Appointment</p>
                </div>

              </div>
            </section>

            {/* ER Notation Reference */}
            <section id="er-notation">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                ER Diagram — Notation Reference
              </h2>
              <p className="mb-6 text-foreground/80 text-sm">
                Every element in an ER diagram has a standard shape. This is the complete cheat sheet.
              </p>

              <div className="space-y-6">

                {/* Entities */}
                <div>
                  <span className="inline-block text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded px-2 py-0.5 mb-3">Entities</span>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border border-border rounded-lg p-4 bg-muted/20 flex flex-col items-center gap-2">
                      <svg viewBox="0 0 160 64" className="w-full max-w-[160px]">
                        <rect x="8" y="10" width="144" height="44" rx="3" fill="oklch(0.18 0.015 80)" stroke="oklch(0.65 0.15 80)" strokeWidth="1.5"/>
                        <text x="80" y="37" textAnchor="middle" fill="oklch(0.85 0.1 80)" fontSize="12" fontWeight="600">STUDENT</text>
                      </svg>
                      <p className="font-semibold text-sm text-amber-400 text-center">Strong Entity</p>
                      <p className="text-xs text-muted-foreground text-center leading-4">Independent. Has its own primary key. Drawn as a plain rectangle.</p>
                    </div>
                    <div className="border border-border rounded-lg p-4 bg-muted/20 flex flex-col items-center gap-2">
                      <svg viewBox="0 0 160 64" className="w-full max-w-[160px]">
                        <rect x="8" y="10" width="144" height="44" rx="3" fill="oklch(0.18 0.015 80)" stroke="oklch(0.65 0.15 80)" strokeWidth="1.5"/>
                        <rect x="15" y="17" width="130" height="30" rx="2" fill="none" stroke="oklch(0.65 0.15 80)" strokeWidth="1"/>
                        <text x="80" y="36" textAnchor="middle" fill="oklch(0.85 0.1 80)" fontSize="11" fontWeight="600">ENROLLMENT</text>
                      </svg>
                      <p className="font-semibold text-sm text-amber-400 text-center">Weak Entity</p>
                      <p className="text-xs text-muted-foreground text-center leading-4">No PK of its own. Depends on parent. Drawn as a double rectangle.</p>
                    </div>
                  </div>
                </div>

                {/* Relationships */}
                <div>
                  <span className="inline-block text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-0.5 mb-3">Relationships</span>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border border-border rounded-lg p-4 bg-muted/20 flex flex-col items-center gap-2">
                      <svg viewBox="0 0 160 64" className="w-full max-w-[160px]">
                        <polygon points="80,4 156,32 80,60 4,32" fill="oklch(0.18 0.025 160)" stroke="oklch(0.55 0.15 160)" strokeWidth="1.5"/>
                        <text x="80" y="37" textAnchor="middle" fill="oklch(0.78 0.1 160)" fontSize="11" fontWeight="600">ENROLLS</text>
                      </svg>
                      <p className="font-semibold text-sm text-emerald-400 text-center">Relationship</p>
                      <p className="text-xs text-muted-foreground text-center leading-4">Association between two entities. Drawn as a diamond.</p>
                    </div>
                    <div className="border border-border rounded-lg p-4 bg-muted/20 flex flex-col items-center gap-2">
                      <svg viewBox="0 0 160 64" className="w-full max-w-[160px]">
                        <polygon points="80,4 156,32 80,60 4,32" fill="oklch(0.18 0.025 160)" stroke="oklch(0.55 0.15 160)" strokeWidth="1.5"/>
                        <polygon points="80,13 144,32 80,51 16,32" fill="none" stroke="oklch(0.55 0.15 160)" strokeWidth="1"/>
                        <text x="80" y="37" textAnchor="middle" fill="oklch(0.78 0.1 160)" fontSize="10" fontWeight="600">BELONGS TO</text>
                      </svg>
                      <p className="font-semibold text-sm text-emerald-400 text-center">Identifying Relationship</p>
                      <p className="text-xs text-muted-foreground text-center leading-4">Links a weak entity to its parent. Drawn as a double diamond.</p>
                    </div>
                  </div>
                </div>

                {/* Attributes */}
                <div>
                  <span className="inline-block text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20 rounded px-2 py-0.5 mb-3">Attributes</span>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border border-border rounded-lg p-4 bg-muted/20 flex flex-col items-center gap-2">
                      <svg viewBox="0 0 160 64" className="w-full max-w-[160px]">
                        <ellipse cx="80" cy="32" rx="72" ry="26" fill="oklch(0.18 0.015 210)" stroke="oklch(0.55 0.14 210)" strokeWidth="1.5"/>
                        <text x="80" y="37" textAnchor="middle" fill="oklch(0.78 0.1 210)" fontSize="12" fontWeight="500">name</text>
                      </svg>
                      <p className="font-semibold text-sm text-sky-400 text-center">Simple Attribute</p>
                      <p className="text-xs text-muted-foreground text-center leading-4">A basic single-valued property. Plain ellipse.</p>
                    </div>
                    <div className="border border-border rounded-lg p-4 bg-muted/20 flex flex-col items-center gap-2">
                      <svg viewBox="0 0 160 64" className="w-full max-w-[160px]">
                        <ellipse cx="80" cy="32" rx="72" ry="26" fill="oklch(0.18 0.015 210)" stroke="oklch(0.55 0.14 210)" strokeWidth="1.5"/>
                        <text x="80" y="37" textAnchor="middle" fill="oklch(0.78 0.1 210)" fontSize="12" fontWeight="600" textDecoration="underline">student_id</text>
                      </svg>
                      <p className="font-semibold text-sm text-sky-400 text-center">Key Attribute</p>
                      <p className="text-xs text-muted-foreground text-center leading-4">Uniquely identifies the entity. Ellipse with underlined text.</p>
                    </div>
                    <div className="border border-border rounded-lg p-4 bg-muted/20 flex flex-col items-center gap-2">
                      <svg viewBox="0 0 160 64" className="w-full max-w-[160px]">
                        <ellipse cx="80" cy="32" rx="72" ry="26" fill="oklch(0.18 0.015 210)" stroke="oklch(0.55 0.14 210)" strokeWidth="1.5" strokeDasharray="5 3"/>
                        <text x="80" y="37" textAnchor="middle" fill="oklch(0.78 0.1 210)" fontSize="12" fontWeight="500">age</text>
                      </svg>
                      <p className="font-semibold text-sm text-sky-400 text-center">Derived Attribute</p>
                      <p className="text-xs text-muted-foreground text-center leading-4">Computed from another attribute. Dashed ellipse. e.g. age from dob.</p>
                    </div>
                    <div className="border border-border rounded-lg p-4 bg-muted/20 flex flex-col items-center gap-2">
                      <svg viewBox="0 0 160 64" className="w-full max-w-[160px]">
                        <ellipse cx="80" cy="32" rx="72" ry="26" fill="oklch(0.18 0.015 210)" stroke="oklch(0.55 0.14 210)" strokeWidth="1.5"/>
                        <ellipse cx="80" cy="32" rx="60" ry="18" fill="none" stroke="oklch(0.55 0.14 210)" strokeWidth="1"/>
                        <text x="80" y="37" textAnchor="middle" fill="oklch(0.78 0.1 210)" fontSize="11" fontWeight="500">phone_nos</text>
                      </svg>
                      <p className="font-semibold text-sm text-sky-400 text-center">Multi-valued Attribute</p>
                      <p className="text-xs text-muted-foreground text-center leading-4">Can hold multiple values. Double ellipse. e.g. multiple phone numbers.</p>
                    </div>
                    <div className="border border-border rounded-lg p-4 bg-muted/20 flex flex-col items-center gap-2">
                      <svg viewBox="0 0 160 92" className="w-full max-w-[160px]">
                        {/* Parent ellipse */}
                        <ellipse cx="80" cy="20" rx="64" ry="17" fill="oklch(0.18 0.015 210)" stroke="oklch(0.55 0.14 210)" strokeWidth="1.5"/>
                        <text x="80" y="25" textAnchor="middle" fill="oklch(0.78 0.1 210)" fontSize="11" fontWeight="500">full_name</text>
                        {/* Connecting lines from bottom of parent to top of children */}
                        <line x1="80" y1="37" x2="28" y2="62" stroke="oklch(0.45 0.1 210)" strokeWidth="1.2"/>
                        <line x1="80" y1="37" x2="80" y2="62" stroke="oklch(0.45 0.1 210)" strokeWidth="1.2"/>
                        <line x1="80" y1="37" x2="132" y2="62" stroke="oklch(0.45 0.1 210)" strokeWidth="1.2"/>
                        {/* Child ellipses */}
                        <ellipse cx="28" cy="75" rx="26" ry="13" fill="oklch(0.18 0.015 210)" stroke="oklch(0.45 0.1 210)" strokeWidth="1.2"/>
                        <ellipse cx="80" cy="75" rx="26" ry="13" fill="oklch(0.18 0.015 210)" stroke="oklch(0.45 0.1 210)" strokeWidth="1.2"/>
                        <ellipse cx="132" cy="75" rx="26" ry="13" fill="oklch(0.18 0.015 210)" stroke="oklch(0.45 0.1 210)" strokeWidth="1.2"/>
                        <text x="28"  y="79" textAnchor="middle" fill="oklch(0.68 0.08 210)" fontSize="9">first</text>
                        <text x="80"  y="79" textAnchor="middle" fill="oklch(0.68 0.08 210)" fontSize="9">middle</text>
                        <text x="132" y="79" textAnchor="middle" fill="oklch(0.68 0.08 210)" fontSize="9">last</text>
                      </svg>
                      <p className="font-semibold text-sm text-sky-400 text-center">Composite Attribute</p>
                      <p className="text-xs text-muted-foreground text-center leading-4">Can be split into sub-parts. Parent ellipse branches into child ellipses.</p>
                    </div>
                  </div>
                </div>

                {/* Participation Lines */}
                <div>
                  <span className="inline-block text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded px-2 py-0.5 mb-3">Participation Lines</span>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border border-border rounded-lg p-4 bg-muted/20 flex flex-col items-center gap-2">
                      <svg viewBox="0 0 160 64" className="w-full max-w-[160px]">
                        <line x1="10" y1="32" x2="150" y2="32" stroke="oklch(0.55 0.12 264)" strokeWidth="3"/>
                      </svg>
                      <p className="font-semibold text-sm text-violet-400 text-center">Partial Participation</p>
                      <p className="text-xs text-muted-foreground text-center leading-4">Entity may or may not participate. Single line.</p>
                    </div>
                    <div className="border border-border rounded-lg p-4 bg-muted/20 flex flex-col items-center gap-2">
                      <svg viewBox="0 0 160 64" className="w-full max-w-[160px]">
                        <line x1="10" y1="26" x2="150" y2="26" stroke="oklch(0.70 0.15 80)" strokeWidth="3"/>
                        <line x1="10" y1="38" x2="150" y2="38" stroke="oklch(0.70 0.15 80)" strokeWidth="3"/>
                      </svg>
                      <p className="font-semibold text-sm text-violet-400 text-center">Total Participation</p>
                      <p className="text-xs text-muted-foreground text-center leading-4">Every entity must participate. Double line.</p>
                    </div>
                  </div>
                </div>

                {/* EER */}
                <div>
                  <span className="inline-block text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded px-2 py-0.5 mb-3">Extended ER</span>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border border-border rounded-lg p-4 bg-muted/20 flex flex-col items-center gap-2">
                      <svg viewBox="0 0 160 64" className="w-full max-w-[160px]">
                        <circle cx="80" cy="32" r="26" fill="oklch(0.18 0.02 80)" stroke="oklch(0.65 0.15 80)" strokeWidth="1.5"/>
                        <text x="80" y="39" textAnchor="middle" fill="oklch(0.82 0.14 80)" fontSize="16" fontWeight="700" fontStyle="italic">d</text>
                      </svg>
                      <p className="font-semibold text-sm text-amber-400 text-center">Specialization (Disjoint)</p>
                      <p className="text-xs text-muted-foreground text-center leading-4"><span className="text-amber-400 font-mono">d</span> = entity can be in only one subclass.</p>
                    </div>
                    <div className="border border-border rounded-lg p-4 bg-muted/20 flex flex-col items-center gap-2">
                      <svg viewBox="0 0 160 64" className="w-full max-w-[160px]">
                        <circle cx="80" cy="32" r="26" fill="oklch(0.18 0.02 80)" stroke="oklch(0.65 0.15 80)" strokeWidth="1.5"/>
                        <text x="80" y="39" textAnchor="middle" fill="oklch(0.82 0.14 80)" fontSize="16" fontWeight="700" fontStyle="italic">o</text>
                      </svg>
                      <p className="font-semibold text-sm text-amber-400 text-center">Specialization (Overlapping)</p>
                      <p className="text-xs text-muted-foreground text-center leading-4"><span className="text-amber-400 font-mono">o</span> = entity can be in multiple subclasses.</p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* ER Components */}
            <section id="er-components">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                ER Components in Detail
              </h2>

              <div className="space-y-6">

                {/* Entities */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-5 py-3 bg-violet-500/10 border-b border-border flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-violet-500/20 border border-violet-500/30 flex-shrink-0" />
                    <p className="font-semibold text-violet-400 text-sm">Entities & Entity Sets</p>
                  </div>
                  <div className="px-5 py-4 text-sm space-y-3">
                    <p className="text-foreground/80">
                      An <strong>entity</strong>{" "}is a distinct object in the real world — something
                      you can uniquely identify. A <strong>entity set</strong>{" "}is the collection of
                      all entities of the same type (like a table).
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-muted/40 rounded-lg p-4 border border-violet-500/20">
                        <p className="text-violet-400 font-semibold mb-2">Strong Entity</p>
                        <p className="text-foreground/80 text-xs leading-5">
                          Has its own <strong>primary key</strong> — can be uniquely identified
                          without depending on anything else. It exists on its own.
                        </p>
                        <div className="mt-3 bg-muted/60 border border-border rounded-md px-3 py-2 text-xs space-y-2">
                          <p className="text-amber-400 font-medium">Example — Apartment Building</p>
                          <p className="text-foreground/70 leading-5">
                            A <span className="text-violet-300 font-mono">Building</span> has a unique{" "}
                            <span className="text-amber-300 font-mono">building_id</span>. You can refer
                            to &ldquo;Building B-7&rdquo; without knowing anything else about it.
                            It stands completely on its own.
                          </p>
                        </div>
                      </div>
                      <div className="bg-muted/40 rounded-lg p-4 border border-sky-500/20">
                        <p className="text-sky-400 font-semibold mb-2">Weak Entity</p>
                        <p className="text-foreground/80 text-xs leading-5">
                          Has <strong>no primary key of its own</strong>. Its identity depends on a
                          parent strong entity — if the parent is deleted, it ceases to exist.
                        </p>
                        <div className="mt-3 bg-muted/60 border border-border rounded-md px-3 py-2 text-xs space-y-2">
                          <p className="text-amber-400 font-medium">Example — Flat inside a Building</p>
                          <p className="text-foreground/70 leading-5">
                            <span className="text-sky-300 font-mono">Flat 304</span> means nothing on its own —
                            every building has a Flat 304. It only makes sense as{" "}
                            <span className="text-sky-300 font-mono">B-7 / Flat 304</span>. Tear down Building B-7
                            and all its flats disappear with it.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attributes */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-5 py-3 bg-sky-500/10 border-b border-border flex items-center gap-3">
                    <span className="w-6 h-5 rounded-full border border-sky-500/40 bg-sky-500/10 flex-shrink-0" />
                    <p className="font-semibold text-sky-400 text-sm">Attribute Types</p>
                  </div>
                  <div className="px-5 py-4">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {[
                        { name: "Simple", desc: "Cannot be divided further.", eg: "age, phone" },
                        { name: "Composite", desc: "Can be broken into sub-parts.", eg: "full_name → first + last" },
                        { name: "Single-valued", desc: "Holds one value per entity.", eg: "dob, employee_id" },
                        { name: "Multi-valued", desc: "Can hold multiple values.", eg: "phone_numbers, skills" },
                        { name: "Derived", desc: "Computed from another attribute.", eg: "age derived from dob" },
                        { name: "Key attribute", desc: "Uniquely identifies an entity.", eg: "student_id, email" },
                      ].map(({ name, desc, eg }) => (
                        <div key={name} className="bg-muted/40 rounded-lg p-3 border border-border">
                          <p className="text-sky-400 font-medium mb-1">{name}</p>
                          <p className="text-muted-foreground">{desc}</p>
                          <p className="text-foreground/50 mt-1 italic">{eg}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Relationships & Cardinality */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-5 py-3 bg-emerald-500/10 border-b border-border flex items-center gap-3">
                    <svg width="24" height="16" viewBox="0 0 24 16" className="flex-shrink-0">
                      <polygon points="12,1 23,8 12,15 1,8" fill="oklch(0.18 0.025 160)" stroke="oklch(0.55 0.15 160)" strokeWidth="1.5" />
                    </svg>
                    <p className="font-semibold text-emerald-400 text-sm">Relationships & Cardinality</p>
                  </div>
                  <div className="px-5 py-4 text-sm space-y-6">

                    {/* Cardinality */}
                    <div className="space-y-3">
                      <p className="text-foreground/80">
                        <strong>Cardinality</strong>{" "}defines how many entities on one side can relate to how many on the other.
                      </p>
                      <div className="space-y-2 text-xs">
                        {[
                          {
                            ratio: "1 : 1",
                            label: "One-to-One",
                            desc: "One entity on each side.",
                            eg: "A person has one passport. A passport belongs to one person.",
                            color: "text-violet-400 bg-violet-500/10 border-violet-500/30",
                          },
                          {
                            ratio: "1 : N",
                            label: "One-to-Many",
                            desc: "One entity relates to many on the other side.",
                            eg: "A customer places many orders. Each order belongs to one customer.",
                            color: "text-sky-400 bg-sky-500/10 border-sky-500/30",
                          },
                          {
                            ratio: "M : N",
                            label: "Many-to-Many",
                            desc: "Many entities relate to many on the other side.",
                            eg: "A student enrolls in many courses. A course has many students.",
                            color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
                          },
                        ].map(({ ratio, label, desc, eg, color }) => (
                          <div key={ratio} className="flex items-start gap-3 border border-border rounded-lg p-3 bg-muted/30">
                            <span className={`flex-shrink-0 font-bold rounded border px-2 py-1 font-mono ${color}`}>{ratio}</span>
                            <div>
                              <p className="font-semibold text-foreground/90">{label}</p>
                              <p className="text-muted-foreground mt-0.5">{desc}</p>
                              <p className="text-foreground/50 mt-1 italic">{eg}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Participation */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-foreground/80">
                          <strong>Participation constraint</strong>{" "}tells you whether every entity in a set <em>must</em>{" "}take part in a relationship or if it&apos;s optional.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">

                        {/* Total */}
                        <div className="border border-amber-500/20 rounded-lg p-4 bg-muted/30 space-y-2">
                          <div className="flex items-center gap-2 mb-1">
                            <svg width="52" height="16" viewBox="0 0 52 16">
                              <line x1="2" y1="8" x2="50" y2="8" stroke="oklch(0.72 0.16 80)" strokeWidth="2.5" />
                              <line x1="2" y1="4" x2="50" y2="4" stroke="oklch(0.72 0.16 80)" strokeWidth="2.5" />
                            </svg>
                            <p className="text-amber-400 font-semibold">Total Participation</p>
                          </div>
                          <p className="text-muted-foreground leading-5">
                            <strong>Every</strong> entity must participate. No entity can be left out of the relationship. Shown as a <strong>double line</strong> in ER diagrams.
                          </p>
                          <div className="bg-muted/60 border border-border rounded-md px-3 py-2 space-y-1">
                            <p className="text-amber-400 font-medium">Example</p>
                            <p className="text-foreground/70 leading-5">
                              Every <span className="text-violet-300 font-mono">Loan</span> must be
                              taken by some <span className="text-violet-300 font-mono">Customer</span>.
                              A loan cannot exist in the system without being linked to a customer — no orphan loans allowed.
                            </p>
                          </div>
                        </div>

                        {/* Partial */}
                        <div className="border border-sky-500/20 rounded-lg p-4 bg-muted/30 space-y-2">
                          <div className="flex items-center gap-2 mb-1">
                            <svg width="52" height="16" viewBox="0 0 52 16">
                              <line x1="2" y1="8" x2="50" y2="8" stroke="oklch(0.65 0.14 210)" strokeWidth="2.5" />
                            </svg>
                            <p className="text-sky-400 font-semibold">Partial Participation</p>
                          </div>
                          <p className="text-muted-foreground leading-5">
                            <strong>Some</strong> entities may not participate. Participation is optional. Shown as a <strong>single line</strong> in ER diagrams.
                          </p>
                          <div className="bg-muted/60 border border-border rounded-md px-3 py-2 space-y-1">
                            <p className="text-amber-400 font-medium">Example</p>
                            <p className="text-foreground/70 leading-5">
                              Not every <span className="text-violet-300 font-mono">Customer</span> has
                              taken a <span className="text-violet-300 font-mono">Loan</span>.
                              A customer can exist in the bank&apos;s system without ever borrowing money.
                            </p>
                          </div>
                        </div>

                      </div>

                      <ERDiagram
                        initialNodes={participationNodes}
                        initialEdges={participationEdges}
                        height={220}
                      />

                      <div className="flex gap-4 text-xs">
                        <span className="flex items-center gap-2">
                          <svg width="32" height="10" viewBox="0 0 32 10">
                            <line x1="0" y1="5" x2="32" y2="5" stroke="oklch(0.55 0.12 264)" strokeWidth="2" />
                          </svg>
                          <span className="text-muted-foreground">Single line — partial participation</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <svg width="32" height="10" viewBox="0 0 32 10">
                            <line x1="0" y1="3" x2="32" y2="3" stroke="oklch(0.72 0.16 80)" strokeWidth="2" />
                            <line x1="0" y1="7" x2="32" y2="7" stroke="oklch(0.72 0.16 80)" strokeWidth="2" />
                          </svg>
                          <span className="text-muted-foreground">Double line — total participation</span>
                        </span>
                      </div>

                      <div className="bg-muted/50 border-l-4 border-emerald-500/50 rounded-md px-4 py-3 text-xs text-foreground/70">
                        <span className="text-emerald-400 font-semibold">Together: </span>
                        In the Loan example — <span className="text-amber-300">Loan has total participation</span> (every loan must belong to someone) and{" "}
                        <span className="text-sky-300">Customer has partial participation</span> (not every customer needs a loan).
                      </div>

                      <div className="bg-muted/50 border-l-4 border-amber-500/50 rounded-md px-4 py-2.5 text-xs text-foreground/70 space-y-1">
                        <p><span className="text-amber-400 font-semibold">Key fact: </span>A <strong>weak entity always has total participation</strong>{" "}in its identifying relationship — it must always be linked to its parent strong entity.</p>
                        <p>The <strong>parent side is usually partial</strong> — the parent can exist before any weak entities are created under it.</p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* Relationship Types */}
            <section id="relationship-types">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Relationship Types — by Degree
              </h2>
              <p className="mb-6 text-foreground/80">
                The <strong>degree</strong> of a relationship is the number of entity sets that participate in it.
                Most relationships are binary, but ER supports unary and ternary too.
              </p>

              <div className="space-y-4 text-sm">

                {/* Binary */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-5 py-3 bg-violet-500/10 border-b border-border flex items-center gap-3">
                    <span className="flex-shrink-0 font-mono text-xs font-bold bg-violet-500/20 text-violet-400 border border-violet-500/30 rounded px-2 py-0.5">Degree 2</span>
                    <p className="font-semibold text-violet-400 text-sm">Binary Relationship</p>
                    <span className="ml-auto text-xs text-muted-foreground">Most common</span>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    <p className="text-foreground/80 text-xs leading-5">
                      Two entity sets participate. This covers the standard 1:1, 1:N, and M:N cardinalities
                      you see in almost every ER diagram.
                    </p>
                    <div className="flex justify-center py-2">
                      <svg viewBox="0 0 280 80" className="w-full max-w-sm">
                        {/* Entity A */}
                        <rect x="4" y="25" width="76" height="30" rx="3" fill="oklch(0.18 0.015 264)" stroke="oklch(0.55 0.15 264)" strokeWidth="1.5"/>
                        <text x="42" y="45" textAnchor="middle" fill="oklch(0.78 0.1 264)" fontSize="10" fontWeight="600">STUDENT</text>
                        {/* Line A to diamond */}
                        <line x1="80" y1="40" x2="100" y2="40" stroke="oklch(0.55 0.12 264)" strokeWidth="1.5"/>
                        {/* Diamond */}
                        <polygon points="140,20 180,40 140,60 100,40" fill="oklch(0.18 0.025 160)" stroke="oklch(0.55 0.15 160)" strokeWidth="1.5"/>
                        <text x="140" y="45" textAnchor="middle" fill="oklch(0.78 0.1 160)" fontSize="9" fontWeight="600">ENROLLS</text>
                        {/* Line diamond to B */}
                        <line x1="180" y1="40" x2="200" y2="40" stroke="oklch(0.55 0.12 264)" strokeWidth="1.5"/>
                        {/* Entity B */}
                        <rect x="200" y="25" width="76" height="30" rx="3" fill="oklch(0.18 0.015 264)" stroke="oklch(0.55 0.15 264)" strokeWidth="1.5"/>
                        <text x="238" y="45" textAnchor="middle" fill="oklch(0.78 0.1 264)" fontSize="10" fontWeight="600">COURSE</text>
                      </svg>
                    </div>
                    <p className="text-xs text-muted-foreground text-center italic">Student ENROLLS in Course — two entities, one relationship</p>
                  </div>
                </div>

                {/* Unary */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-5 py-3 bg-sky-500/10 border-b border-border flex items-center gap-3">
                    <span className="flex-shrink-0 font-mono text-xs font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded px-2 py-0.5">Degree 1</span>
                    <p className="font-semibold text-sky-400 text-sm">Unary (Recursive) Relationship</p>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    <p className="text-foreground/80 text-xs leading-5">
                      Only one entity set participates — the entity relates to itself.
                      Used to model hierarchies or self-referencing data within the same table.
                    </p>
                    <div className="flex justify-center py-2">
                      <svg viewBox="0 0 270 115" className="w-full max-w-sm">
                        {/* Entity EMPLOYEE: right edge=110, center=(60,33), bottom-center=(60,48) */}
                        <rect x="10" y="18" width="100" height="30" rx="3" fill="oklch(0.18 0.015 264)" stroke="oklch(0.55 0.15 264)" strokeWidth="1.5"/>
                        <text x="60" y="38" textAnchor="middle" fill="oklch(0.78 0.1 264)" fontSize="10" fontWeight="600">EMPLOYEE</text>
                        {/* Supervisor — straight horizontal line */}
                        <line x1="110" y1="33" x2="178" y2="33" stroke="oklch(0.55 0.12 264)" strokeWidth="1.5"/>
                        {/* Subordinate — U-shaped cubic bezier going below */}
                        <path d="M 60 48 C 60 102 210 102 210 54" fill="none" stroke="oklch(0.55 0.12 264)" strokeWidth="1.5"/>
                        {/* Diamond MANAGES center=(210,33) */}
                        <polygon points="210,12 242,33 210,54 178,33" fill="oklch(0.18 0.025 160)" stroke="oklch(0.55 0.15 160)" strokeWidth="1.5"/>
                        <text x="210" y="38" textAnchor="middle" fill="oklch(0.78 0.1 160)" fontSize="9" fontWeight="600">MANAGES</text>
                        {/* Role labels */}
                        <text x="144" y="26" textAnchor="middle" fill="oklch(0.58 0.08 264)" fontSize="8" fontStyle="italic">supervisor</text>
                        <text x="135" y="108" textAnchor="middle" fill="oklch(0.58 0.08 264)" fontSize="8" fontStyle="italic">subordinate</text>
                      </svg>
                    </div>
                    <p className="text-xs text-muted-foreground text-center italic">EMPLOYEE MANAGES EMPLOYEE — same entity on both sides</p>
                    <div className="bg-muted/40 border border-border rounded-lg p-3 text-xs">
                      <p className="text-sky-400 font-medium mb-1.5">Other examples</p>
                      <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                        <li>PERSON IS_MARRIED_TO PERSON — 1:1 unary</li>
                        <li>CATEGORY CONTAINS CATEGORY — 1:N (parent/child categories)</li>
                        <li>EMPLOYEE REFERS EMPLOYEE — referral programs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Ternary */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="px-5 py-3 bg-emerald-500/10 border-b border-border flex items-center gap-3">
                    <span className="flex-shrink-0 font-mono text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded px-2 py-0.5">Degree 3</span>
                    <p className="font-semibold text-emerald-400 text-sm">Ternary Relationship</p>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    <p className="text-foreground/80 text-xs leading-5">
                      Three entity sets participate in a single relationship diamond. Used when an
                      association only makes sense with all three entities together — you can&apos;t split it
                      into two binary relationships without losing information.
                    </p>
                    <div className="flex justify-center py-2">
                      <svg viewBox="0 0 280 210" className="w-full max-w-sm">
                        {/* Top entity: DOCTOR */}
                        <rect x="85" y="5" width="110" height="30" rx="3" fill="oklch(0.18 0.015 264)" stroke="oklch(0.55 0.15 264)" strokeWidth="1.5"/>
                        <text x="140" y="25" textAnchor="middle" fill="oklch(0.78 0.1 264)" fontSize="10" fontWeight="600">DOCTOR</text>
                        {/* Line: Doctor → Diamond */}
                        <line x1="140" y1="35" x2="140" y2="85" stroke="oklch(0.55 0.12 264)" strokeWidth="1.5"/>
                        {/* Diamond PRESCRIBES center (140, 110) */}
                        <polygon points="140,85 176,110 140,135 104,110" fill="oklch(0.18 0.025 160)" stroke="oklch(0.55 0.15 160)" strokeWidth="1.5"/>
                        <text x="140" y="115" textAnchor="middle" fill="oklch(0.78 0.1 160)" fontSize="8.5" fontWeight="600">PRESCRIBES</text>
                        {/* Line: Diamond left → PATIENT */}
                        <line x1="104" y1="110" x2="45" y2="165" stroke="oklch(0.55 0.12 264)" strokeWidth="1.5"/>
                        {/* Line: Diamond right → MEDICINE */}
                        <line x1="176" y1="110" x2="235" y2="165" stroke="oklch(0.55 0.12 264)" strokeWidth="1.5"/>
                        {/* Bottom-left entity: PATIENT */}
                        <rect x="0" y="165" width="90" height="30" rx="3" fill="oklch(0.18 0.015 264)" stroke="oklch(0.55 0.15 264)" strokeWidth="1.5"/>
                        <text x="45" y="185" textAnchor="middle" fill="oklch(0.78 0.1 264)" fontSize="10" fontWeight="600">PATIENT</text>
                        {/* Bottom-right entity: MEDICINE */}
                        <rect x="190" y="165" width="90" height="30" rx="3" fill="oklch(0.18 0.015 264)" stroke="oklch(0.55 0.15 264)" strokeWidth="1.5"/>
                        <text x="235" y="185" textAnchor="middle" fill="oklch(0.78 0.1 264)" fontSize="10" fontWeight="600">MEDICINE</text>
                      </svg>
                    </div>
                    <p className="text-xs text-muted-foreground text-center italic">
                      DOCTOR PRESCRIBES MEDICINE to PATIENT — all three are needed to make sense of the relationship
                    </p>
                    <div className="bg-muted/40 border border-amber-500/20 rounded-lg p-3 text-xs space-y-1.5">
                      <p className="text-amber-400 font-medium">Why not two binary relationships?</p>
                      <p className="text-muted-foreground leading-5">
                        &ldquo;DOCTOR PRESCRIBES MEDICINE&rdquo; and &ldquo;DOCTOR TREATS PATIENT&rdquo; are two different facts.
                        The ternary captures a third fact: <em>which medicine was prescribed to which patient by which doctor</em> — in one atomic tuple.
                        Split into binaries and you lose that linkage.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-5 bg-card border border-border rounded-lg overflow-hidden text-xs">
                <div className="px-5 py-3 bg-muted/40 border-b border-border">
                  <p className="font-semibold text-foreground">Summary — Relationship Degree</p>
                </div>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="px-4 py-2 text-left text-muted-foreground font-medium">Degree</th>
                      <th className="px-4 py-2 text-left text-muted-foreground font-medium">Name</th>
                      <th className="px-4 py-2 text-left text-muted-foreground font-medium">Entities involved</th>
                      <th className="px-4 py-2 text-left text-muted-foreground font-medium">Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { deg: "1", name: "Unary", ent: "1 (self-referencing)", eg: "EMPLOYEE MANAGES EMPLOYEE" },
                      { deg: "2", name: "Binary", ent: "2", eg: "STUDENT ENROLLS COURSE" },
                      { deg: "3", name: "Ternary", ent: "3", eg: "DOCTOR PRESCRIBES MEDICINE to PATIENT" },
                    ].map(({ deg, name, ent, eg }) => (
                      <tr key={deg} className="hover:bg-muted/20">
                        <td className="px-4 py-2.5 font-mono text-violet-400 font-bold">{deg}</td>
                        <td className="px-4 py-2.5 text-foreground/80">{name}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{ent}</td>
                        <td className="px-4 py-2.5 text-muted-foreground font-mono text-[10px]">{eg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ER Diagram Example */}
            <section id="er-diagram-example">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                ER Diagram — University System
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                A university where students enroll in courses, each course belongs to a department,
                and every student is issued a student card. This single diagram covers all three
                cardinality types, weak entities, and both participation constraints. Drag nodes to explore.
              </p>

              <ERDiagram
                initialNodes={uniNodes}
                initialEdges={uniEdges}
                height={520}
              />

              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-3 text-xs">
                {[
                  { color: "bg-violet-500/20 border-violet-500/40 text-violet-300", label: "Strong Entity" },
                  { color: "bg-violet-500/10 border-violet-500/20 text-violet-400/70", label: "Weak Entity (double outline)" },
                  { color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300", label: "Relationship (Diamond)" },
                  { color: "bg-amber-500/20 border-amber-500/40 text-amber-300", label: "PK — Primary Key" },
                  { color: "bg-sky-500/20 border-sky-500/40 text-sky-300", label: "FK — Foreign Key" },
                ].map(({ color, label }) => (
                  <span key={label} className={`border rounded-full px-3 py-1 ${color}`}>{label}</span>
                ))}
                <span className="flex items-center gap-1.5 border border-border rounded-full px-3 py-1">
                  <svg width="22" height="8" viewBox="0 0 22 8"><line x1="0" y1="4" x2="22" y2="4" stroke="oklch(0.55 0.12 264)" strokeWidth="2"/></svg>
                  <span className="text-muted-foreground">Partial participation</span>
                </span>
                <span className="flex items-center gap-1.5 border border-border rounded-full px-3 py-1">
                  <svg width="22" height="8" viewBox="0 0 22 8"><line x1="0" y1="2" x2="22" y2="2" stroke="oklch(0.70 0.15 80)" strokeWidth="2"/><line x1="0" y1="6" x2="22" y2="6" stroke="oklch(0.70 0.15 80)" strokeWidth="2"/></svg>
                  <span className="text-muted-foreground">Total participation</span>
                </span>
              </div>

              {/* What this diagram covers */}
              <div className="mt-6 space-y-2 text-sm">
                <p className="text-muted-foreground font-medium text-xs uppercase tracking-widest mb-3">What this diagram covers</p>
                {[
                  {
                    tag: "M : N",
                    tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
                    rel: "Student ↔ Course via ENROLLMENT",
                    desc: "Many students enroll in many courses. ENROLLMENT is a weak entity — it has no meaning without both a student and a course. It has total participation in both relationships (double lines).",
                  },
                  {
                    tag: "1 : 1",
                    tagColor: "text-violet-400 bg-violet-500/10 border-violet-500/30",
                    rel: "Student ↔ STUDENT CARD",
                    desc: "Every student is issued exactly one card. Every card belongs to exactly one student. Both sides are total participation — neither can exist without the other.",
                  },
                  {
                    tag: "1 : N",
                    tagColor: "text-sky-400 bg-sky-500/10 border-sky-500/30",
                    rel: "Department → Course via OFFERED BY",
                    desc: "One department offers many courses. Every course must belong to a department (total on Course side — double line). A department can exist without offering courses yet (partial on Department side — single line).",
                  },
                ].map(({ tag, tagColor, rel, desc }) => (
                  <div key={tag} className="flex items-start gap-3 border border-border rounded-lg p-3 bg-muted/20">
                    <span className={`flex-shrink-0 font-mono text-[11px] font-bold rounded border px-2 py-1 ${tagColor}`}>{tag}</span>
                    <div>
                      <p className="text-foreground/80 font-medium text-xs">{rel}</p>
                      <p className="text-muted-foreground text-xs mt-1 leading-5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Extended ER */}
            <section id="extended-er">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Extended ER (EER)
              </h2>
              <p className="mb-6 text-foreground/80">
                Basic ER handles most scenarios but falls short when modelling real-world hierarchies —
                like different types of employees or vehicles. <strong>Extended ER</strong>{" "}adds three
                concepts on top: specialization, generalization, and aggregation.
              </p>

              <div className="space-y-8">

                {/* Specialization vs Generalization */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="border border-amber-500/20 rounded-lg p-5 space-y-3">
                    <p className="font-semibold text-amber-400">Specialization</p>
                    <p className="text-foreground/80 text-xs leading-5">
                      <strong>Top-down.</strong>{" "}Start with a general entity and break it into more specific subtypes.
                      Each subtype inherits all attributes of the parent and adds its own.
                    </p>
                    <div className="bg-muted/50 border border-border rounded-md px-3 py-2 text-xs text-foreground/60">
                      EMPLOYEE → MANAGER, ENGINEER, SECRETARY
                      <br />Start broad, go specific.
                    </div>
                  </div>
                  <div className="border border-sky-500/20 rounded-lg p-5 space-y-3">
                    <p className="font-semibold text-sky-400">Generalization</p>
                    <p className="text-foreground/80 text-xs leading-5">
                      <strong>Bottom-up.</strong>{" "}Start with specific entities that share common attributes and
                      merge them into a single general superclass.
                    </p>
                    <div className="bg-muted/50 border border-border rounded-md px-3 py-2 text-xs text-foreground/60">
                      CAR, TRUCK, BIKE → VEHICLE
                      <br />Start specific, go broad.
                    </div>
                  </div>
                </div>

                {/* IS-A Diagram */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Specialization Diagram — Employee
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    The circle shows the constraint type — <span className="text-amber-400 font-medium">d</span> = disjoint (an employee can be either a Manager OR an Engineer, not both).
                    MANAGER and ENGINEER inherit <span className="text-amber-300 font-mono text-[11px]">emp_id, name, salary, hire_date</span> from EMPLOYEE and add their own attributes.
                  </p>
                  <ERDiagram initialNodes={eerNodes} initialEdges={eerEdges} height={420} />
                </div>

                {/* Constraints */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground">Specialization Constraints</p>
                  <p className="text-xs text-muted-foreground mb-2">Two independent constraints that apply to every specialization:</p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {[
                      {
                        title: "Disjoint  (d)",
                        color: "text-amber-400 border-amber-500/20",
                        desc: "An entity can belong to only ONE subclass at a time.",
                        eg: "An employee is either a Manager OR an Engineer — never both.",
                      },
                      {
                        title: "Overlapping  (o)",
                        color: "text-violet-400 border-violet-500/20",
                        desc: "An entity can belong to MULTIPLE subclasses simultaneously.",
                        eg: "A person can be both an Employee AND a Student at the same time.",
                      },
                      {
                        title: "Total",
                        color: "text-emerald-400 border-emerald-500/20",
                        desc: "Every entity in the superclass MUST belong to at least one subclass.",
                        eg: "Every vehicle must be a Car, Truck, or Bike — nothing else exists.",
                      },
                      {
                        title: "Partial",
                        color: "text-sky-400 border-sky-500/20",
                        desc: "An entity in the superclass MAY NOT belong to any subclass.",
                        eg: "An employee can just be a generic employee — not necessarily a Manager or Engineer.",
                      },
                    ].map(({ title, color, desc, eg }) => (
                      <div key={title} className={`border ${color.split(" ")[1]} rounded-lg p-3 bg-muted/30 space-y-1.5`}>
                        <p className={`font-semibold ${color.split(" ")[0]}`}>{title}</p>
                        <p className="text-muted-foreground leading-5">{desc}</p>
                        <p className="text-foreground/50 italic">{eg}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inheritance */}
                <div className="border border-border rounded-lg overflow-hidden text-sm">
                  <div className="px-5 py-3 bg-muted/40 border-b border-border">
                    <p className="font-semibold text-foreground">Inheritance</p>
                  </div>
                  <div className="px-5 py-4 space-y-3 text-xs">
                    <p className="text-foreground/80 leading-5">
                      Subclasses automatically inherit all attributes and relationships of their superclass.
                      You only define what is <em>new or different</em> in the subclass.
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { entity: "EMPLOYEE", attrs: ["emp_id PK", "name", "salary", "hire_date"], color: "text-amber-400 border-amber-500/20 bg-amber-500/5" },
                        { entity: "MANAGER", attrs: ["↑ inherits all", "dept", "budget"], color: "text-sky-400 border-sky-500/20 bg-sky-500/5" },
                        { entity: "ENGINEER", attrs: ["↑ inherits all", "tech_stack", "projects"], color: "text-sky-400 border-sky-500/20 bg-sky-500/5" },
                      ].map(({ entity, attrs, color }) => (
                        <div key={entity} className={`border ${color.split(" ")[1]} ${color.split(" ")[2]} rounded-lg p-3`}>
                          <p className={`font-semibold ${color.split(" ")[0]} mb-2`}>{entity}</p>
                          {attrs.map((a) => (
                            <p key={a} className={`font-mono text-[10px] ${a.startsWith("↑") ? "text-muted-foreground/50 italic" : "text-foreground/70"}`}>{a}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Aggregation */}
                <div className="border border-border rounded-lg overflow-hidden text-sm">
                  <div className="px-5 py-3 bg-emerald-500/10 border-b border-border">
                    <p className="font-semibold text-emerald-400">Aggregation</p>
                  </div>
                  <div className="px-5 py-4 space-y-4">

                    {/* The problem */}
                    <div className="space-y-2 text-xs">
                      <p className="text-foreground/80 leading-5">
                        Basic ER lets a relationship connect two <em>entities</em>. But what if you need a
                        relationship to connect an entity to another <em>relationship</em>? Basic ER can&apos;t do that.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-muted/40 border border-border rounded-lg p-3 space-y-1.5">
                          <p className="text-muted-foreground font-medium">Basic ER — works fine</p>
                          <p className="font-mono text-[11px] text-foreground/70">EMPLOYEE ── WORKS ON ── PROJECT</p>
                          <p className="text-muted-foreground/70 leading-4">Alice works on the App Redesign project. Simple.</p>
                        </div>
                        <div className="bg-muted/40 border border-red-500/20 rounded-lg p-3 space-y-1.5">
                          <p className="text-red-400 font-medium">New requirement — breaks basic ER</p>
                          <p className="font-mono text-[11px] text-foreground/70">A manager supervises Alice&apos;s work on App Redesign specifically.</p>
                          <p className="text-muted-foreground/70 leading-4">Not just Alice. Not just App Redesign. That specific pairing.</p>
                        </div>
                      </div>
                    </div>

                    {/* The solution */}
                    <div className="space-y-2 text-xs">
                      <p className="text-foreground/80 leading-5">
                        Aggregation solves this by drawing a <strong>dashed box</strong> around the inner
                        relationship — treating the entire EMPLOYEE–WORKS ON–PROJECT chunk as one unit.
                        Now MANAGER can have a relationship (SUPERVISES) with that whole unit.
                      </p>
                      <p className="text-muted-foreground">
                        The <span className="text-violet-400">dashed box</span> below is the aggregation.
                        SUPERVISES points into it as a whole — not at any single entity inside.
                      </p>
                    </div>

                    <ERDiagram initialNodes={aggNodes} initialEdges={aggEdges} height={280} />

                    {/* Real data example */}
                    <div className="bg-muted/40 border border-border rounded-lg p-4 space-y-3 text-xs">
                      <p className="text-muted-foreground font-medium">What the data actually looks like</p>
                      <div className="grid grid-cols-2 gap-4 font-mono text-[11px]">
                        <div className="space-y-1">
                          <p className="text-muted-foreground uppercase tracking-wide text-[10px] mb-2">WORKS_ON table</p>
                          <p className="text-foreground/60">emp_id  │ proj_id</p>
                          <p className="text-foreground/70">Alice   │ App Redesign</p>
                          <p className="text-foreground/70">Alice   │ Backend API</p>
                          <p className="text-foreground/70">Bob     │ App Redesign</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground uppercase tracking-wide text-[10px] mb-2">SUPERVISES table</p>
                          <p className="text-foreground/60">manager │ emp_id │ proj_id</p>
                          <p className="text-emerald-400/80">Carol   │ Alice  │ App Redesign</p>
                          <p className="text-emerald-400/80">Carol   │ Bob    │ App Redesign</p>
                          <p className="text-muted-foreground/50 text-[10px] mt-1">↑ points at a row in WORKS_ON, not just an employee or project</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 border-l-4 border-emerald-500/50 rounded-md px-4 py-2 text-xs text-foreground/70">
                      <span className="text-emerald-400 font-semibold">One line: </span>
                      Aggregation is when a relationship becomes so important that other things need to relate to it —
                      so you box it up and treat it like an entity.
                    </div>
                  </div>
                </div>

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
