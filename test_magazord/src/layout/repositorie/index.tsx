"use client";

import { RepositorieProps } from "./types";
import { Container, Alert, TextField } from "@mui/material";
import useStore from "@/store/stateStore";
import CardHorizontal from "@/components/UI/card";
import { useEffect, useState } from "react";
import { useReposQuery, useRepoDetailsQuery } from "@/hook/useInfos";
import Loading from "@/components/UI/loading";
import { Commit } from "@/store/types";
import Button from "@/components/UI/button";
import { BsArrowBarLeft } from "react-icons/bs";

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

  const {
    data: reposData,
    isLoading: reposLoading,
    error: reposError,
  } = useReposQuery();

  const repo = repos.find((repo) => repo.id === id);

  const {
    data: repoDetails,
    isLoading: detailsLoading,
    error: detailsError,
  } = useRepoDetailsQuery(repo?.name || "");

  const [inputValue, setInputValue] = useState<string>("");
  const [filteredCommit, setFilteredCommit] = useState<Commit[]>(commits);

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
      setFilteredCommit(repoDetails.commits);
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

  useEffect(() => {
    setFilteredCommit(commits);
  }, [commits]);

  const filterCommit = (filter: (commit: Commit) => boolean) => {
    const filtered = commits.filter(filter);
    setFilteredCommit(filtered);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = (e.target as HTMLInputElement).value;
      filterCommit((commit) =>
        commit.commit.message.toLowerCase().includes(value.toLowerCase())
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

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

  const backToHome = () => {
    window.location.href = "/home";
  };

  return (
    <Container>
      <div className="flex flex-col items-start gap-5 my-4">
        <Button onClick={backToHome} label="Voltar" icon={<BsArrowBarLeft />} />
        <h1>
          Informações sobre:{" "}
          <span className="text-cyan-500">{repo.full_name}</span>
        </h1>
        <h4>{repo.description}</h4>
        <div className="flex flex-row justify-center gap-5">
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-bold text-cyan-500">
              {repo.stargazers_count}
            </h3>
            <p>Stars</p>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-bold text-cyan-500">
              {repo.forks_count}
            </h3>
            <p>Forks</p>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-bold text-cyan-500">
              {openIssues.length}
            </h3>
            <p>Open Issues</p>
          </div>
        </div>
      </div>

      <TextField
      className="w-75"
        id="search-field"
        label="Search Here"
        variant="standard"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleSearch}
      />

      <h3>Commits:</h3>
      <div className="flex flex-col gap-4 w-full">
        {filteredCommit.map((commit) => (
          <CardHorizontal
            key={commit.sha}
            full_name={commit.commit.message || "Unknown"}
          />
        ))}
      </div>

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
