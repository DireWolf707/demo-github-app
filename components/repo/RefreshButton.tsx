"use client"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "../ui/button"
import { RefreshCcwIcon } from "lucide-react"

const RefreshButton = ({ disabled }: { disabled: boolean }) => {
  const queryClient = useQueryClient()

  return (
    <Button
      variant="outline"
      size="icon"
      disabled={disabled}
      onClick={() =>
        queryClient.invalidateQueries({
          queryKey: ["repos"],
        })
      }
    >
      <RefreshCcwIcon />
    </Button>
  )
}

export default RefreshButton
