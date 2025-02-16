"use client"
import React from "react"
import { Button } from "../ui/button"
import { APP_LINK } from "@/lib/constants"
import { useRouter } from "next/navigation"

const AppInstallButton = ({
  repos,
  disabled,
}: {
  repos: boolean
  disabled: boolean
}) => {
  const router = useRouter()

  if (!repos)
    return (
      <Button disabled={disabled} onClick={() => router.push(APP_LINK)}>
        Install GitHub App
      </Button>
    )

  return (
    <Button disabled={disabled} onClick={() => router.push(APP_LINK)}>
      Update GitHub App
    </Button>
  )
}

export default AppInstallButton
