import { Repo } from "@/store/types";

export interface ListMainProps {
  repos: Repo[];
  loading: boolean;
  error: string | null;
  fetchRepos: () => void;
}
