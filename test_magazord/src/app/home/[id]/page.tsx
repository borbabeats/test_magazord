'use client';

import Repositorie from "@/layout/repositorie";
import Header from "@/components/UI/header"
import { Suspense } from "react"
import { useParams } from "next/navigation";

export default function Repo() {
  const params = useParams()
  const id = Number(params.id)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header title="Detalhes do repositório" />
      <Repositorie id={id} full_name={""} commits={[]} openIssues={[]}  />
    </Suspense>
  )
}