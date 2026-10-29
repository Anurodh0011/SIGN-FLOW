import dynamic from "next/dynamic";

export const DynamicEditorView = dynamic(
  () => import("@/views/editorView"),
  { ssr: false }
);

export const DynamicCleanModal = dynamic(
  () => import("@/components/elements/CleanModal"),
  { ssr: false }
);
