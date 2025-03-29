import Repositorie from "@/layout/repositorie";
import Header from "@/components/UI/header"
import { Suspense } from "react"

export default function Repo({ params }: { params: { id: string } }) {

  const id = Number(params.id)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header title="Reposi" />
      <Repositorie id={id} full_name={""}  />
    </Suspense>
  )
}