export interface User {
  avatar_url: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  login: string | null;
}

export interface Repo {
  full_name: string;
  id: number;
  name: string;
  description: string | null;
  stargazers_count?: number;
  forks_count?: number;
  language?: string | null;
  open_issues_count?: number | undefined;
}

export interface Commit {
  sha: string;
  committer?: { name?: string };
  commit: { message: string };
}

export interface Issue {
  id: number;
  title: string;
  state: string;
}

export interface StoreState {
  user: User | null;
  repos: Repo[];
  commits: Commit[];
  openIssues: Issue[];
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setRepos: (repos: Repo[]) => void;
  setCommits: (commits: Commit[]) => void;
  setOpenIssues: (openIssues: Issue[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}