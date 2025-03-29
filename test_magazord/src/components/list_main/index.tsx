"use client";

import useStore from "@/store/stateStore";
import CardHorizontal from "../UI/card";
import React, { useEffect, useState } from "react";
import Loading from "@/components/UI/loading";
import { Repo } from "@/store/types";
import Chip from "@mui/material/Chip";
import RepoIcon from "@/components/UI/icons/repoIcon";
import StarIcon from "../UI/icons/starIcon";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useReposQuery } from "@/hook/useInfos";

export default function ListMain() {
  const { repos, loading, error, setRepos, setLoading, setError } = useStore();
  const [filteredRepos, setFilteredRepos] = useState<Repo[]>(repos);
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();

  const { data: reposData, isLoading, error: queryError } = useReposQuery();

  useEffect(() => {
    setLoading(isLoading);
    if (queryError) {
      setError(queryError.message);
    } else if (reposData) {
      setRepos(reposData);
      setFilteredRepos(reposData);
      setError(null);
    }
  }, [reposData, isLoading, queryError, setRepos, setLoading, setError]);


  useEffect(() => {
    setFilteredRepos(repos);
  }, [repos]);

  const filterRepos = (filter: (repo: Repo) => boolean) => {
    const filtered = repos.filter(filter);
    setFilteredRepos(filtered);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = (e.target as HTMLInputElement).value;
      filterRepos((repo) =>
        repo.full_name.toLowerCase().includes(value.toLowerCase())
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = (id: number) => {
    router.push(`/home/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div
        className="filter-buttons flex gap-4"
        style={{ marginBottom: "1rem" }}
      >
        <button
          onClick={() => setFilteredRepos(repos)}
          style={{
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
          className="flex items-center gap-2"
        >
          <RepoIcon /> Repositories <Chip label={repos.length} />
        </button>
        <button
          onClick={() =>
            filterRepos(
              (repo) =>
                repo.stargazers_count !== undefined && repo.stargazers_count > 0
            )
          }
          style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          className="flex items-center gap-2"
        >
          <StarIcon /> Starred{" "}
          <Chip
            label={
              repos.filter(
                (repo) =>
                  repo.stargazers_count !== undefined &&
                  repo.stargazers_count > 0
              ).length
            }
          />
        </button>
      </div>

      <TextField
        id="search-field"
        label="Search Here"
        variant="standard"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleSearch}
      />

      {filteredRepos.map((repo: Repo) => (
        <div
          key={repo.id}
          onClick={() => handleClick(repo.id)}
          style={{ cursor: "pointer" }}
        >
          <CardHorizontal
            key={repo.id}
            full_name={repo.full_name}
            description={repo.description}
            stargazers_count={repo.stargazers_count}
            forks_count={repo.forks_count}
          />
        </div>
      ))}
    </div>
  );
}
