"use client";

import { RepositorieProps } from "./types";
import { Container, Alert } from "@mui/material";
import useStore from "@/store/stateStore";
import CardHorizontal from "@/components/UI/card";
import { useEffect } from "react";
import { useReposQuery, useRepoDetailsQuery } from "@/hook/useInfos";
import Loading from "@/components/UI/loading";

export default function Repositorie({ id }: RepositorieProps) {
  const {
    repos,
    commits,
    openIssues,
    loading,
    error,
    setRepos,
    setCommits,
    setOpenIssues,
    setLoading,
    setError,
  } = useStore();

  const { data: reposData, isLoading: reposLoading, error: reposError } = useReposQuery();

  const repo = repos.find((repo) => repo.id === id);

  const {
    data: repoDetails,
    isLoading: detailsLoading,
    error: detailsError,
  } = useRepoDetailsQuery(repo?.name || "");

  useEffect(() => {
    setLoading(reposLoading || detailsLoading);

    // Handle errors
    if (reposError) {
      setError(reposError.message);
    } else if (detailsError) {
      setError(detailsError.message);
    } else {
      setError(null);
    }

    if (reposData) {
      setRepos(reposData);
    }

    if (repoDetails) {
      setCommits(repoDetails.commits);
      setOpenIssues(repoDetails.openIssues);
    }
  }, [
    reposData,
    repoDetails,
    reposLoading,
    detailsLoading,
    reposError,
    detailsError,
    setRepos,
    setCommits,
    setOpenIssues,
    setLoading,
    setError,
  ]);

  if (!repo) {
    return <p>Repositório não encontrado</p>;
  }

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }


  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Repositório: {repo.full_name}</h1>
      <h3>{repo.description}</h3>
      <p><strong>Stars:</strong> {repo.stargazers_count}</p>
      <p><strong>Forks:</strong> {repo.forks_count}</p>
      <p><strong>Open Issues:</strong> {openIssues.length}</p>

      <h3>Commits:</h3>
      {commits.map((commit) => (
        <CardHorizontal
          key={commit.sha}
          full_name={commit.commit.message || "Unknown"}
        />
      ))}

      <h3>Open Issues:</h3>
      {openIssues.length > 0 ? (
        <ul>
          {openIssues.map((issue) => (
            <li key={issue.id}>{issue.title}</li>
          ))}
        </ul>
      ) : (
        <p>No open issues</p>
      )}
    </Container>
  );
}