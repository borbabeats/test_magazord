"use client";

import useStore from "@/store/stateStore";
import CardHorizontal from "./card";
import React, { useEffect } from "react";
import Loading from "../UI/loading";
import { ListMainProps } from "./types";
import { Repo } from "@/store/types";
import { useState } from "react";
import Chip from "@mui/material/Chip";
import RepoIcon from "@/components/UI/icons/repoIcon";
import StarIcon from "../UI/icons/starIcon";
import { TextField } from "@mui/material";

export default function ListMain() {
  const { repos, loading, error, fetchRepos }: ListMainProps = useStore();
  const [filteredRepos, setFilteredRepos] = useState<Repo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchRepos();
  }, []);

  useEffect(() => {
    setFilteredRepos(repos);
  }, [repos]);

  const showAllRepos = () => {
    setFilteredRepos(repos);
  };

  const showStarredRepos = () => {
    const starred = repos.filter((repo: Repo) => repo.stargazers_count > 0);
    setFilteredRepos(starred);
  };

  const showSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const filtered = repos.filter((repo: Repo) =>
        repo.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRepos(filtered);
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    if (error) {
      return <p>{error}</p>;
    }
  }
  console.log("respos", repos);
  return (
    <div className="flex flex-col gap-4 w-full">
      <div
        className="filter-buttons flex gap-4"
        style={{ marginBottom: "1rem" }}
      >
        <button
          onClick={showAllRepos}
          style={{ marginRight: "1rem", padding: "0.5rem 1rem" }}
          className="flex items-center gap-2"
        >
          <RepoIcon /> Repositories <Chip label={repos.length} />
        </button>
        <button
          onClick={showStarredRepos}
          style={{ padding: "0.5rem 1rem" }}
          className="flex items-center gap-2"
        >
          <StarIcon /> Starred{" "}
          <Chip
            label={repos.filter((repo) => repo.stargazers_count > 0).length}
          />
        </button>
      </div>

      {/* TextField */}
      <TextField
        id="standard-basic"
        label="Search"
        variant="standard"
        onChange={showSearch}
        onKeyDown={handleEnterKey}
      />

      {filteredRepos.map((repo: Repo) => (
        <CardHorizontal
          key={repo.id}
          full_name={repo.full_name}
          html_url={repo.html_url}
          description={repo.description}
          stargazers_count={repo.stargazers_count}
          forks_count={repo.forks_count}
        />
      ))}
    </div>
  );
}
