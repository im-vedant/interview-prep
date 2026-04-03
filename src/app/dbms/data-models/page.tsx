"use client";

import ERDiagram from "@/components/er-diagram-loader";
import type { Node, Edge } from "@xyflow/react";

const sections = [
  { id: "what-is-a-data-model", label: "What is a Data Model?" },
  { id: "types-of-data-models", label: "Types of Data Models" },
  { id: "schema-vs-data-model", label: "Schema vs Data Model" },
  { id: "er-model", label: "ER Model" },
  { id: "er-components", label: "ER Components" },
  { id: "participation", label: "Participation Constraints" },
  { id: "er-diagram-example", label: "ER Diagram Example" },
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
                    </div>

                  </div>
                </div>

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
