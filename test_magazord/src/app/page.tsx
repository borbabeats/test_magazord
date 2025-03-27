import Homepage from "@/layout/homepage"
import Header from "@/components/UI/header"
import { Suspense } from "react"

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header title="Profile" />
      <Homepage />
    </Suspense>
  )
}