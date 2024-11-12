import { useState, useEffect } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComboBox } from "@/components/ui/combo-box";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Forms
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { useParams } from "next/navigation";
import { fetchUsers } from "./api/users";

interface ProjectMember {
  id: string;
  username: string;
  email?: string;
}

const formSchema = z.object({
  username: z.number(),
  // email: z.string().email(),
  role: z.string(),
  memberIds: z.array(z.number()),
});

export default function AddMembersDialogContent() {
  // For api
  const [users, setUsers] = useState<{ value: number; label: string }[]>([]);
  // For form
  const [formUser, setFormUser] = useState<{ value: number; label: string }>();
  const [currentProjectMembers, setCurrentProjectMembers] = useState<
    ProjectMember[]
  >([]);
  let { id: projectId } = useParams<{ id: string }>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    fetchAndSetUsers();
  }, []);

  async function fetchAndSetUsers() {
    try {
      // const data = await fetchProjectMembers(projectId);
      const response = await fetchUsers();
      const data = response.data.map(
        (user: { id: number; username: string }) => ({
          value: user.id,
          label: user.username,
        })
      );
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(users);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  // Filter out users who are already selected
  const availableUsers = users.filter(
    // (user) => !currentProjectMembers.includes(user.value)
    (user) =>
      !currentProjectMembers.some((member) => member.username === user.value.toString())
  );

  console.log("current", currentProjectMembers);
  console.log("formUser", formUser);

  return (
    <DialogContent className="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Add Team members</DialogTitle>
        <DialogDescription>
          Add multiple team members to your project. Fill out their details and
          add them to the list.
        </DialogDescription>
      </DialogHeader>
      {/* Body */}
      <div className="flex gap-6">
        <div className="flex-1">
          <h3 className="mb-4 text-sm font-medium">New Member Details</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        {/* <Input placeholder="username" {...field} /> */}
                        <ComboBox
                          choices={availableUsers}
                          {...field}
                          value={field.value}
                          // onChange={field.onChange}
                          onChange={(value) => {
                            field.onChange(value);
                            const selectedUser = users.find(
                              (user) => user.value === value
                            );
                            console.log("selectedUser", value);
                            setFormUser(selectedUser);
                          }}

                          // multiple
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <ComboBox
                            choices={[
                              { label: "test", value: "test" },
                              {
                                label: "test_2",
                                value: "test_2",
                              },
                            ]}
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6"
                onClick={() => {
                  setCurrentProjectMembers([
                    ...currentProjectMembers,
                    {
                      // id: form.getValues("username.label"),
                      id: formUser?.value?.toString() || "",
                      username: formUser?.label || "",
                      // username: form.getValues("username"),
                      // email: form.getValues("email"),
                    },
                  ]);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add to List
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex-1 border-l pl-6">
          <h3 className="mb-4 text-sm font-medium">Team Members to Add</h3>
          <ScrollArea className="h-[300px] pr-4">
            {currentProjectMembers.map(
              (currentProjectMember: ProjectMember) => (
                <div
                  key={currentProjectMember.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center">
                    {/* User Details Aligned to the Left */}
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {currentProjectMember.username}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {/* {projectMember.email} */}
                      </p>
                    </div>
                  </div>

                  {/* Trash Icon Aligned to the Right */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCurrentProjectMembers(
                        currentProjectMembers.filter(
                          (member) => member.id !== currentProjectMember.id
                        )
                      );
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )
            )}
          </ScrollArea>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        {/* <Button onClick={handleSubmit} disabled={members.length === 0}> */}
        <Button>
          Add {currentProjectMembers.length} Member
          {currentProjectMembers.length !== 1 ? "s" : ""} to Project
        </Button>
      </div>
    </DialogContent>
  );
}