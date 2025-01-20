"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";

import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
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
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormData } from "@/components/utility/FormDataContext";
import { useStore } from "zustand";
import { useUserStore } from "@/store/userStore";
import { login } from "./api/login";

const loginSchema = z.object({
  usernameOrEmail: z.union([
    z.string().min(1, "Username cannot be empty"),
    z.string().email("Invalid email address"),
  ]),
  password: z.string().min(6, "Password must be at least 6 characters"),
  backend: z.string().optional(),
});

export default function LoginContainer() {
  const { setFormData } = useFormData();
  const { toast } = useToast();
  const [backendError, setBackendError] = useState<string | null>(null);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
      backend: "",
    },
  });

  const { setUser, user } = useUserStore();

  // Api Call
  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setDisableButton(false); // Disable the button when the login process starts

    const response = await login(data.usernameOrEmail, data.password);

    // const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    // const response = await fetch(`${apiUrl}/auth/login`, {
    //   method: "POST",
    //   headers: {
    //     // Authorization: `Bearer ${token?.value}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: data.usernameOrEmail,
    //     password: data.password,
    //   }),
    // });

    // console.log(response.ok);

    // const user = await response;
    // console.log(user);

    if (response) {
      // Put the user data in zustand
      setUser(response.data);
      // Toast
      toast({
        title: "Login successful",
        description: "You have successfully logged in",
      });

      console.log(response);

      // Put the token in cookie client

      setTimeout(() => {
        router.push("/projects");
      }, 2000);

      // console.log(user);
      console.log(user);
    } else {
      const error = await response.json();
      setBackendError(error.message || "Login failed");
      form.setError("backend", {
        type: "manual",
        message: error.message || "Login failed",
      });
      console.log(error);
    }

    setDisableButton(false); // Re-enable the button after the login process completes
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
              <FormField
                control={form.control}
                name="backend"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl> */}
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
            {disableButton ? (
              <Button disabled className="w-full">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="w-full" type="submit">
                Sign In
              </Button>
            )}
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
