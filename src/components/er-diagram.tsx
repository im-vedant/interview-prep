"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  NodeProps,
  EdgeProps,
  getBezierPath,
  EdgeLabelRenderer,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/* ─── Entity Node ─────────────────────────────────────────────── */
const accentMap = {
  violet: { border: "border-violet-500/40", header: "bg-violet-500/20 border-violet-500/30", text: "text-violet-300", badge: "text-violet-400/60 border-violet-400/25", handle: "!bg-violet-400 !border-violet-600", outline: "oklch(0.50 0.12 264 / 0.45)" },
  amber:  { border: "border-amber-500/40",  header: "bg-amber-500/20 border-amber-500/30",   text: "text-amber-300",  badge: "text-amber-400/60 border-amber-400/25",   handle: "!bg-amber-400 !border-amber-600",   outline: "oklch(0.50 0.12 80 / 0.45)"   },
  sky:    { border: "border-sky-500/40",    header: "bg-sky-500/20 border-sky-500/30",       text: "text-sky-300",    badge: "text-sky-400/60 border-sky-400/25",       handle: "!bg-sky-400 !border-sky-600",       outline: "oklch(0.50 0.12 210 / 0.45)"  },
};

function EntityNode({ data }: NodeProps) {
  const d = data as { label: string; attrs: { name: string; pk?: boolean; fk?: boolean }[]; weak?: boolean; accent?: "violet" | "amber" | "sky" };
  const c = accentMap[d.accent ?? "violet"];
  return (
    <div
      className={`rounded-xl bg-[oklch(0.20_0.006_260)] shadow-lg min-w-[150px] overflow-hidden border ${c.border}`}
      style={d.weak ? { outline: `2px solid ${c.outline}`, outlineOffset: "3px" } : undefined}
    >
      <div className={`${c.header} px-4 py-2.5 border-b`}>
        <div className="flex items-center gap-2">
          <p className={`${c.text} font-semibold text-sm tracking-wide`}>{d.label}</p>
          {d.weak && <span className={`text-[9px] font-medium ${c.badge} border rounded px-1 py-0.5 leading-none`}>weak</span>}
        </div>
      </div>
      <div className="px-4 py-2 space-y-1.5">
        {d.attrs.map((a) => (
          <div key={a.name} className="flex items-center gap-2 text-xs">
            {a.pk && <span className="text-amber-400 font-bold text-[10px] leading-none bg-amber-400/10 border border-amber-400/30 rounded px-1 py-0.5">PK</span>}
            {a.fk && <span className="text-sky-400 font-bold text-[10px] leading-none bg-sky-400/10 border border-sky-400/30 rounded px-1 py-0.5">FK</span>}
            {!a.pk && !a.fk && <span className="w-5" />}
            <span className={a.pk ? "text-amber-300" : a.fk ? "text-sky-300" : "text-[oklch(0.85_0.005_260)]"}>{a.name}</span>
          </div>
        ))}
      </div>
      <Handle type="source" position={Position.Right} className={`${c.handle} !w-2.5 !h-2.5`} />
      <Handle type="target" position={Position.Left} className={`${c.handle} !w-2.5 !h-2.5`} />
      <Handle type="source" position={Position.Left} id="left" className={`${c.handle} !w-2.5 !h-2.5`} />
      <Handle type="target" position={Position.Right} id="rightTarget" className={`${c.handle} !w-2.5 !h-2.5`} />
      <Handle type="source" position={Position.Bottom} id="bottom" className={`${c.handle} !w-2.5 !h-2.5`} />
      <Handle type="target" position={Position.Top} id="top" className={`${c.handle} !w-2.5 !h-2.5`} />
    </div>
  );
}

/* ─── Specialization Node (circle with d / o) ─────────────────── */
function SpecializationNode({ data }: NodeProps) {
  const d = data as { specType: "d" | "o" };
  return (
    <div className="relative flex items-center justify-center w-10 h-10">
      <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full">
        <circle cx="20" cy="20" r="18" fill="oklch(0.18 0.02 80)" stroke="oklch(0.65 0.15 80)" strokeWidth="1.5" />
      </svg>
      <span className="relative z-10 text-amber-300 text-sm font-bold italic">{d.specType}</span>
      <Handle type="target" position={Position.Top} id="top" className="!bg-amber-400 !border-amber-600 !w-2 !h-2" />
      <Handle type="source" position={Position.Left} id="left" className="!bg-amber-400 !border-amber-600 !w-2 !h-2" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-amber-400 !border-amber-600 !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-amber-400 !border-amber-600 !w-2 !h-2" />
    </div>
  );
}

/* ─── Relationship Node ───────────────────────────────────────── */
function RelationshipNode({ data }: NodeProps) {
  const d = data as { label: string };
  return (
    <div className="relative flex items-center justify-center w-28 h-12">
      <svg viewBox="0 0 112 48" className="absolute inset-0 w-full h-full">
        <polygon points="56,2 110,24 56,46 2,24" fill="oklch(0.18 0.025 160)" stroke="oklch(0.55 0.15 160)" strokeWidth="1.5" />
      </svg>
      <span className="relative z-10 text-emerald-300 text-xs font-semibold text-center leading-tight px-3">{d.label}</span>
      <Handle type="source" position={Position.Right} className="!bg-emerald-400 !border-emerald-600 !w-2.5 !h-2.5" />
      <Handle type="target" position={Position.Left} className="!bg-emerald-400 !border-emerald-600 !w-2.5 !h-2.5" />
      <Handle type="source" position={Position.Left} id="left" className="!bg-emerald-400 !border-emerald-600 !w-2.5 !h-2.5" />
      <Handle type="target" position={Position.Right} id="rightTarget" className="!bg-emerald-400 !border-emerald-600 !w-2.5 !h-2.5" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-emerald-400 !border-emerald-600 !w-2.5 !h-2.5" />
      <Handle type="target" position={Position.Top} id="top" className="!bg-emerald-400 !border-emerald-600 !w-2.5 !h-2.5" />
    </div>
  );
}

/* ─── Double Edge (total participation) ──────────────────────── */
function DoubleEdge({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, label, style }: EdgeProps) {
  const [, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const angle = Math.atan2(targetY - sourceY, targetX - sourceX);
  const ox = Math.cos(angle + Math.PI / 2) * 3;
  const oy = Math.sin(angle + Math.PI / 2) * 3;
  const [p1] = getBezierPath({ sourceX: sourceX + ox, sourceY: sourceY + oy, sourcePosition, targetX: targetX + ox, targetY: targetY + oy, targetPosition });
  const [p2] = getBezierPath({ sourceX: sourceX - ox, sourceY: sourceY - oy, sourcePosition, targetX: targetX - ox, targetY: targetY - oy, targetPosition });
  return (
    <>
      <path d={p1} fill="none" style={style as React.CSSProperties} />
      <path d={p2} fill="none" style={style as React.CSSProperties} />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{ transform: `translate(-50%,-50%) translate(${labelX}px,${labelY}px)`, position: "absolute", pointerEvents: "none" }}
          >
            <span style={{ color: "oklch(0.72 0.16 80)", background: "oklch(0.18 0.006 260)", padding: "1px 5px", borderRadius: 3, fontSize: 11, fontWeight: 700 }}>
              {label as string}
            </span>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

/* ─── Aggregation Box Node ────────────────────────────────────── */
function AggregationBoxNode({ data }: NodeProps) {
  const d = data as { label: string };
  return (
    <div className="w-full h-full rounded-xl border-2 border-dashed border-violet-400/30 bg-violet-500/5 relative pointer-events-none">
      <span className="absolute bottom-2 right-3 text-[10px] text-violet-400/40 font-medium uppercase tracking-widest select-none">
        {d.label}
      </span>
      <Handle type="target" position={Position.Left} id="left" className="!bg-violet-400 !border-violet-600 !w-2.5 !h-2.5 pointer-events-auto" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-violet-400 !border-violet-600 !w-2.5 !h-2.5 pointer-events-auto" />
      <Handle type="target" position={Position.Top} id="top" className="!bg-violet-400 !border-violet-600 !w-2.5 !h-2.5 pointer-events-auto" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-violet-400 !border-violet-600 !w-2.5 !h-2.5 pointer-events-auto" />
    </div>
  );
}

const nodeTypes = { entity: EntityNode, relationship: RelationshipNode, specialization: SpecializationNode, aggbox: AggregationBoxNode };
const edgeTypes = { double: DoubleEdge };

/* ─── ERDiagram Component ─────────────────────────────────────── */
interface ERDiagramProps {
  initialNodes: Node[];
  initialEdges: Edge[];
  height?: number;
}

export default function ERDiagram({ initialNodes, initialEdges, height = 340 }: ERDiagramProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const onInit = useCallback(() => {}, []);
  return (
    <div style={{ height }} className="w-full rounded-xl border border-border overflow-hidden bg-[oklch(0.13_0.004_260)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        panOnDrag
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="oklch(0.35 0.005 260)" />
      </ReactFlow>
    </div>
  );
}
