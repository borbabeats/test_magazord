import { create } from "zustand";
import { Octokit } from "@octokit/core";
import { Repo, StoreState } from "./types";

const octokit = new Octokit({ auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN });


const useStore = create<StoreState>((set) => ({
  user: null,
  repos: [],
  loading: false,
  error: null,
  
  fetchUser: async () => {
    set({ loading: true, error: null });
    
    try {
      const response = await octokit.request('GET /user', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      
      set({ 
        user: {
          name: response.data.name,
          avatar_url: response.data.avatar_url,
          bio: response.data.bio,
          company: response.data.company,
          location: response.data.location,
          login: response.data.login
        },
        loading: false 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao buscar informações do usuário";
      set({ error: errorMessage, loading: false });
    }
  },

  fetchRepos: async () => {
    set({ loading: true, error: null });
    
    try {
      const response = await octokit.request("GET /users/{username}/repos", {
        username: 'borbabeats',
        headers: { "X-GitHub-Api-Version": "2022-11-28" },
      });

      if (!response.data) {
        throw new Error("Repositórios não encontrados");
      }
      
      set({ 
        repos: response.data.map((repo: Repo) => ({
          id: repo.id,
          full_name: repo.full_name,
          html_url: repo.html_url,
          name: repo.name,
          description: repo.description,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          language: repo.language
        })),
        loading: false 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao buscar repositórios";
      set({ error: errorMessage, loading: false });
    }
  }
}));

export default useStore;