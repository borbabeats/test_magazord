import { useQuery } from "@tanstack/react-query";
import { Octokit } from "@octokit/core";
import { User, Repo, Commit, Issue } from "@/store/types";

const octokit = new Octokit({ auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN });

const fetchUser = async (): Promise<User> => {
  const response = await octokit.request("GET /user", {
    headers: { "X-GitHub-Api-Version": "2022-11-28" },
  });
  return {
    avatar_url: response.data.avatar_url,
    name: response.data.name || null,
    bio: response.data.bio || null,
    company: response.data.company || null,
    location: response.data.location || null,
    login: response.data.login || null,
  };
};

const fetchRepos = async (): Promise<Repo[]> => {
  const user = await fetchUser();
  const username = user.login;
  const response = await octokit.request("GET /users/{username}/repos", {
    username: username ?? '',
    headers: { "X-GitHub-Api-Version": "2022-11-28" },
  });
  return response.data.map((repo: Repo) => ({
    full_name: repo.name,
    id: repo.id,
    name: repo.name,
    description: repo.description || null,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    language: repo.language || null,
    open_issues_count: repo.open_issues_count,
  }));
};

const fetchRepoDetails = async (repoName: string): Promise<{ commits: Commit[]; openIssues: Issue[] }> => {
  const user = await fetchUser();
  const username = user.login;
  const [commitsResponse, issuesResponse] = await Promise.all([
    octokit.request("GET /repos/{owner}/{repo}/commits", {
      owner: username ?? '',
      repo: repoName,
    }),
    octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: username ?? '',
      repo: repoName,
    }),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const commits: Commit[] = commitsResponse.data.map((commit: any) => ({
    sha: commit.sha,
    committer: { name: commit.committer?.name || "Desconhecido" },
    commit: { message: commit.commit.message },
  }));

  const openIssues: Issue[] = issuesResponse.data.map((issue: Issue) => ({
    id: issue.id,
    title: issue.title,
    state: issue.state,
  }));

  return { commits, openIssues };
};

// Hooks do React Query
export const useUserQuery = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000,
  });

export const useReposQuery = () =>
  useQuery({
    queryKey: ["repos"],
    queryFn: fetchRepos,
    staleTime: 5 * 60 * 1000,
  });

export const useRepoDetailsQuery = (repoName: string) =>
  useQuery({
    queryKey: ["repoDetails", repoName],
    queryFn: () => fetchRepoDetails(repoName),
    enabled: !!repoName,
    staleTime: 5 * 60 * 1000,
  });