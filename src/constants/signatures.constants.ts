export interface UserSignature {
  id: string;
  title: string;
  date: string;
  type: "drawn" | "uploaded";
  status: "Active";
}

export const USER_SIGNATURE: UserSignature = {
  id: "sig-1",
  title: "Ajay Kuwnar — Signature",
  date: "Created May 12, 2025",
  type: "drawn",
  status: "Active",
};
