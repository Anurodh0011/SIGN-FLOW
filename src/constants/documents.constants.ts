export interface DocumentItem {
  id: string;
  name: string;
  type: string;
  date: string;
  status: 'Draft' | 'Signed' | 'Pending';
  size: string;
}

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  { id: 'doc-1', name: 'Vendor Agreement.pdf', type: 'PDF', date: 'May 24, 2025', status: 'Draft', size: '2.4 MB' },
  { id: 'doc-2', name: 'Employment Contract.pdf', type: 'PDF', date: 'May 21, 2025', status: 'Signed', size: '1.8 MB' },
  { id: 'doc-3', name: 'NDA — Northstar Labs.pdf', type: 'PDF', date: 'May 18, 2025', status: 'Signed', size: '890 KB' },
  { id: 'doc-4', name: 'Project Proposal.pdf', type: 'PDF', date: 'May 14, 2025', status: 'Draft', size: '3.1 MB' },
  { id: 'doc-5', name: 'Master Services Agreement.pdf', type: 'PDF', date: 'May 10, 2025', status: 'Signed', size: '4.2 MB' },
  { id: 'doc-6', name: 'Consulting Addendum.pdf', type: 'PDF', date: 'May 02, 2025', status: 'Signed', size: '1.1 MB' },
];

export const DASHBOARD_METRICS = [
  { label: 'Total documents', value: '24', icon: 'file' as const },
  { label: 'Draft documents', value: '6', icon: 'edit' as const },
  { label: 'Signed documents', value: '18', icon: 'check' as const },
  { label: 'My signature', value: 'Active', icon: 'pen' as const },
];
