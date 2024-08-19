"use client";
import { useFormData } from "@/components/utility/FormDataContext";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ComboBox } from "@/components/ui/combo-box";

const formSchema = z
  .object({
    schoolYearStart: z.coerce.number().int().min(2000).max(9999),
    schoolYearEnd: z.coerce.number().int().min(2000).max(9999),
    schoolSemester: z.enum(["firstSemester", "secondSemester"], {
      required_error: "Please select a semester.",
    }),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    department: z.string().min(2, {
      message: "Department must be at least 2 characters.",
    }),
    position: z.string().min(1, {
      message: "Position is required.",
    }),
    team: z.string().min(1, {
      message: "Team is required.",
    }),
  })
  .refine((data) => data.schoolYearEnd > data.schoolYearStart, {
    message: "School year end must be after school year start.",
    path: ["schoolYearEnd"],
  });

const semester = [
  { label: "First Semester", value: "firstSemester" },
  { label: "Second Semester", value: "secondSemester" },
];

interface FormSectionProps {
  onSubmit: (data: any) => void;
}

export interface formDataProps {
  schoolYearStart: number;
  schoolYearEnd: number;
  schoolSemester: string;
  username: string;
  department: string;
  position: string;
  team: string;
}

export default function FormSection() {
  const { setFormData } = useFormData();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolYearStart: 2000,
      schoolYearEnd: 2001,
      schoolSemester: undefined,
      username: "",
      department: "",
      position: "",
      team: "",
    },
  });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log(values);
  // }

  return (
    <div className="p-4 flex-1">
      <h1 className="text-xl">Personal Information</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(setFormData)} className="space-y-2 ">
          <div className="grid grid-cols-2 gap-x-4">
            <FormField
              control={form.control}
              name="schoolYearStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Start</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Year Start"
                      {...field}
                      type="number"
                      min="2000"
                      max="2100"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the start year (e.g., 2024)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="schoolYearEnd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year End</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Year End"
                      {...field}
                      type="number"
                      min="2000"
                      max="2100"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the end year (e.g., 2025)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="schoolSemester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Semester</FormLabel>
                  <FormControl>
                    <ComboBox
                      choices={semester}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>Test</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormDescription>Test</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input placeholder="department" {...field} />
                  </FormControl>
                  <FormDescription>Test</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="position" {...field} />
                  </FormControl>
                  <FormDescription>Test</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="team"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team</FormLabel>
                  <FormControl>
                    <Input placeholder="team" {...field} />
                  </FormControl>
                  <FormDescription>Test</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
