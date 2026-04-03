"use client";

import dynamic from "next/dynamic";
import type { Node, Edge } from "@xyflow/react";
import { MarkerType } from "@xyflow/react";

const ERDiagram = dynamic(() => import("./er-diagram"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[340px] rounded-xl border border-border bg-[oklch(0.13_0.004_260)] flex items-center justify-center text-muted-foreground text-sm animate-pulse">
      Loading diagram…
    </div>
  ),
});

export { MarkerType };
export type { Node, Edge };
export default ERDiagram;
