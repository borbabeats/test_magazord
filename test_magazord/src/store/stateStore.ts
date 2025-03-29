import { create } from "zustand";
import { StoreState, User, Repo, Commit, Issue } from "./types";

const useStore = create<StoreState>((set) => ({
  user: null,
  repos: [],
  commits: [],
  openIssues: [],
  loading: false,
  error: null,

  setUser: (user: User | null) => set({ user }),
  setRepos: (repos: Repo[]) => set({ repos }),
  setCommits: (commits: Commit[]) => set({ commits }),
  setOpenIssues: (openIssues: Issue[]) => set({ openIssues }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  reset: () =>
    set({
      user: null,
      repos: [],
      commits: [],
      openIssues: [],
      loading: false,
      error: null,
    }),
}));

export default useStore;