"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormData } from "@/components/utility/FormDataContext";

const loginSchema = z.object({
  usernameOrEmail: z.union([
    z.string().min(1, "Username cannot be empty"),
    z.string().email("Invalid email address"),
  ]),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginContainer() {
  const { setFormData } = useFormData();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  // Api Call
  async function onSubmit(data: z.infer<typeof loginSchema>) {
    // setFormData(data);
    
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
            <CardDescription>
              Enter your username or email and password to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="usernameOrEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="usernameOrEmail">
                      Username or Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Username or Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  variant="link"
                  size="sm"
                  className="text-muted-foreground"
                >
                  Forgot Password?
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between flex-col">
            <Button className="w-full" type="submit">
              Sign In
            </Button>
            <Button
              variant="link"
              size="sm"
              className="pt-4 text-muted-foreground"
            >
              Don&apos;t have an account? Sign Up
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
