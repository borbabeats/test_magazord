"use client";

import useStore from "@/store/stateStore";
import { useEffect } from "react";
import Loading from "../UI/loading";
import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import EnterpriseIcon from "../UI/icons/enterpriseIcon";
import { useUserQuery } from "@/hook/useInfos";

export default function Sidebar() {
  const { user, loading, error, setUser, setLoading, setError } = useStore();

  const { data: userData, isLoading, error: queryError } = useUserQuery();

  useEffect(() => {
    setLoading(isLoading);
    if (queryError) {
      setError(queryError.message);
    } else if (userData) {
      setUser(userData);
      setError(null);
    }
  }, [userData, isLoading, queryError, setUser, setLoading, setError]);

  if (loading) {
    return <Loading />;
  } else {
    if (error) {
      return <p>{error}</p>;
    }
  }

  return (
    <div className="flex flex-col items-center text-center w-75 self-center md:self-start">
      {user && (
        <>
          <Image
            src={user.avatar_url}
            alt={user.name || "User"}
            width={150}
            height={150}
            className="rounded-full border-2 border-white shadow"
          />
          <h4 className="text-xl font-bold text-[#262626] mb-1">{user.name}</h4>
          <p className="text-[#989898] mb-3 italic">{user.bio}</p>

          <span className="text-[#0587FF] mb-3 flex gap-2 items-center"><EnterpriseIcon />{user.company}</span>
          <span className="text-[#0587FF] mb-3 flex gap-2 items-center" >
            <FiMapPin />
            {user.location}
          </span>
        </>
      )}
    </div>
  );
}
