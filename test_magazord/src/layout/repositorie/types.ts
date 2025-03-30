import { Commit, Issue } from "@/store/types";

export interface RepositorieProps {
    id: number;
    full_name: string;
    commits: Commit[];
    openIssues: Issue[];
}