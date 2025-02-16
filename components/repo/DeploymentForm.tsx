"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { branchT, createDeploymentT } from "@/lib/types"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { buildDeploymentFormSchema } from "@/lib/zodSchemas"
import { useCreateDeployemnt } from "@/lib/hooks/deploymentHook"
import { toast } from "sonner"

const DeploymentForm = ({
  branches,
  repoName,
}: {
  branches: branchT[]
  repoName: string
}) => {
  const { mutateAsync: createDeployment, isPending } =
    useCreateDeployemnt(repoName)
  const form = useForm<createDeploymentT>({
    resolver: zodResolver(buildDeploymentFormSchema(branches)),
    defaultValues: {
      name: "",
      autoDeploy: false,
      envFile: "",
    },
  })

  const onSubmit = (data: createDeploymentT) =>
    toast.promise(createDeployment(data), {
      loading: "Creating deployment...",
      success: () => "Deployment created successfully",
      error: () => "Something went wrong",
    })

  return (
    <div className="w-[480px] m-auto p-4 border-2 rounded-xl">
      <div className="text-center font-bold text-xl">
        &quot;{repoName}&quot; Deployment
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>

                <FormControl>
                  <Input required {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="autoDeploy"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Automatice Deployment</FormLabel>

                  <FormControl className="flex items-center">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>

                <Select
                  required
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a branch to deploy" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch.name} value={branch.name}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="envFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Environment Variables</FormLabel>

                <FormControl>
                  <Textarea {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            Deploy
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default DeploymentForm
