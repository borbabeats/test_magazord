import { Octokit } from "@octokit/core";

export default async function Home() {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const response = await octokit.request("GET /users/{username}/repos", {
    username: "borbabeats",
    headers: { "X-GitHub-Api-Version": "2022-11-28" },
  });

  return (
    <div>
      <h1>Repositórios de borbabeats</h1>
      <ul>
        {response.data.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}
