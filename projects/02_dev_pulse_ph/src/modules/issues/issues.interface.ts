export interface IIssue {
  title: string;
  description: string;
  type: string;
  status?: "open" | "in_progress" | "resolved";
  reporter_id?: number;
}