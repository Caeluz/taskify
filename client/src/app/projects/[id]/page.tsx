import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Users, ClipboardList, CirclePlus } from "lucide-react";

export default function showProject({ params }: { params: { id: number } }) {
  return (
    <div>
      <div className="flex flex-row justify-between space-x-4 p-6 text-[#3b82f6] font-medium">
        <div className="flex flex-row space-x-4">
          <div className="flex flex-row space-x-2">
            <ClipboardList />
            <div>Tasks</div>
          </div>
          <div className="flex flex-row space-x-2">
            <Users />
            <div>Members</div>
          </div>
          <div className="flex flex-row space-x-2">
            <Settings />
            <div>Settings</div>
          </div>
        </div>
        <Button className="bg-[#3b82f6] text-white ">
          <CirclePlus className="w-4 mr-2" />
          Add Column
        </Button>
      </div>

      <Separator className="bg-[#C4C4C4]" />
      <div className="p-6 flex gap-4 w-full h-[calc(100vh-168px)] overflow-auto">
        <div className="border rounded-lg border-[#D9D9D9] p-6 min-w-96 h-fit">
          {/* Header */}
          {/* <div className="border border-ra"></div> */}
          <div className="text-lg py-4">PENDING (2)</div>
          <Separator className="bg-[#C4C4C4]" />
          {/* Content */}
          <div className="py-4 grid gap-5">
            <Card className="">
              <CardHeader>
                <div className="flex justify-left">
                  <Badge
                    className=" text-black  rounded-xl justify-center flex mb-4"
                    variant="green"
                  >
                    LOW
                  </Badge>
                </div>
                <CardTitle>Creating Index Products Endpoint</CardTitle>
                <CardDescription className="">Card Description</CardDescription>
              </CardHeader>
              <CardContent>May 23, 2024 - May 30, 2024</CardContent>
              <CardFooter className="flex flex-row justify-between">
                <div className="whitespace-nowrap">test</div>
                <div className="flex flex-row space-x-[-12px]">
                  <Avatar className="whitespace-nowrap">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <Avatar className="whitespace-nowrap">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <Avatar className="whitespace-nowrap">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </div>
              </CardFooter>
            </Card>
            <Card className="">
              <CardHeader>
                <div className="flex justify-left">
                  <Badge
                    className=" text-black  rounded-xl justify-center flex mb-4"
                    variant="green"
                  >
                    LOW
                  </Badge>
                </div>
                <CardTitle>Creating Index Products Endpoint</CardTitle>
                <CardDescription className="">Card Description</CardDescription>
              </CardHeader>
              <CardContent>May 23, 2024 - May 30, 2024</CardContent>
              <CardFooter className="flex flex-row space-x-4 justify-between">
                <div className="whitespace-nowrap">test</div>
                <Avatar className="whitespace-nowrap">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </CardFooter>
            </Card>
            <Card className="">
              <CardHeader>
                <div className="flex justify-left">
                  <Badge
                    className=" text-black  rounded-xl justify-center flex"
                    variant="green"
                  >
                    LOW
                  </Badge>
                </div>
                <CardTitle>Card Title</CardTitle>
                <CardDescription className="">Card Description</CardDescription>
              </CardHeader>
              <CardContent>May 23, 2024 - May 30, 2024</CardContent>
              <CardFooter className="flex flex-row space-x-4 justify-between">
                <div className="whitespace-nowrap">test</div>
                <Avatar className="whitespace-nowrap">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </CardFooter>
            </Card>
            <Card className="">
              <CardHeader>
                <div className="flex justify-left">
                  <Badge
                    className=" text-black  rounded-xl justify-center flex"
                    variant="green"
                  >
                    LOW
                  </Badge>
                </div>
                <CardTitle>Card Title</CardTitle>
                <CardDescription className="">Card Description</CardDescription>
              </CardHeader>
              <CardContent>May 23, 2024 - May 30, 2024</CardContent>
              <CardFooter className="flex flex-row space-x-4 justify-between">
                <div className="whitespace-nowrap">test</div>
                <Avatar className="whitespace-nowrap">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="border rounded-lg border-[#D9D9D9] p-6 min-w-96 h-fit">
          {/* Header */}
          {/* <div className="border border-ra"></div> */}
          <div className="text-lg py-4">PENDING 2</div>
          <Separator className="bg-[#C4C4C4]" />
          {/* Content */}
          <div className="p-4 grid gap-5">
            <Card className="">
              <CardHeader>
                <div className="flex justify-left">
                  <Badge
                    className=" text-black  rounded-xl justify-center flex"
                    variant="green"
                  >
                    LOW
                  </Badge>
                </div>
                <CardTitle>Card Title</CardTitle>
                <CardDescription className="">Card Description</CardDescription>
              </CardHeader>
              <CardContent>May 23, 2024 - May 30, 2024</CardContent>
              <CardFooter className="flex flex-row space-x-4 justify-between">
                <div className="whitespace-nowrap">test</div>
                <Avatar className="whitespace-nowrap">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </CardFooter>
            </Card>
            <Card className="">
              <CardHeader>
                <div className="flex justify-left">
                  <Badge
                    className=" text-black  rounded-xl justify-center flex"
                    variant="green"
                  >
                    LOW
                  </Badge>
                </div>
                <CardTitle>Card Title</CardTitle>
                <CardDescription className="">Card Description</CardDescription>
              </CardHeader>
              <CardContent>May 23, 2024 - May 30, 2024</CardContent>
              <CardFooter className="flex flex-row space-x-4 justify-between">
                <div className="whitespace-nowrap">test</div>
                <Avatar className="whitespace-nowrap">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="border rounded-lg border-[#D9D9D9] p-6 min-w-96 h-fit">
          {/* Header */}
          {/* <div className="border border-ra"></div> */}
          <div className="text-lg py-4">PENDING 2</div>
          <Separator className="bg-[#C4C4C4]" />
          {/* Content */}
          <div className="p-4 grid gap-5">
            <Card className="">
              <CardHeader>
                <div className="flex justify-left">
                  <Badge
                    className=" text-black  rounded-xl justify-center flex"
                    variant="green"
                  >
                    LOW
                  </Badge>
                </div>
                <CardTitle>Card Title</CardTitle>
                <CardDescription className="">Card Description</CardDescription>
              </CardHeader>
              <CardContent>May 23, 2024 - May 30, 2024</CardContent>
              <CardFooter className="flex flex-row space-x-4 justify-between">
                <div className="whitespace-nowrap">test</div>
                <Avatar className="whitespace-nowrap">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </CardFooter>
            </Card>
            <Card className="">
              <CardHeader>
                <div className="flex justify-left">
                  <Badge
                    className=" text-black  rounded-xl justify-center flex"
                    variant="green"
                  >
                    LOW
                  </Badge>
                </div>
                <CardTitle>Card Title</CardTitle>
                <CardDescription className="">Card Description</CardDescription>
              </CardHeader>
              <CardContent>May 23, 2024 - May 30, 2024</CardContent>
              <CardFooter className="flex flex-row space-x-4 justify-between">
                <div className="whitespace-nowrap">test</div>
                <Avatar className="whitespace-nowrap">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="border rounded-lg border-[#D9D9D9] p-6 min-w-96 h-fit">
          {/* Header */}
          {/* <div className="border border-ra"></div> */}
          <div className="text-lg py-4">PENDING 2</div>
          <Separator className="bg-[#C4C4C4]" />
          {/* Content */}
          <div className="p-4 grid gap-5">
            <Card className="">
              <CardHeader>
                <div className="flex justify-left">
                  <Badge
                    className=" text-black  rounded-xl justify-center flex"
                    variant="green"
                  >
                    LOW
                  </Badge>
                </div>
                <CardTitle>Card Title</CardTitle>
                <CardDescription className="">Card Description</CardDescription>
              </CardHeader>
              <CardContent>May 23, 2024 - May 30, 2024</CardContent>
              <CardFooter className="flex flex-row space-x-4 justify-between">
                <div className="whitespace-nowrap">test</div>
                <Avatar className="whitespace-nowrap">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </CardFooter>
            </Card>
            <Card className="">
              <CardHeader>
                <div className="flex justify-left">
                  <Badge
                    className=" text-black  rounded-xl justify-center flex"
                    variant="green"
                  >
                    LOW
                  </Badge>
                </div>
                <CardTitle>Card Title</CardTitle>
                <CardDescription className="">Card Description</CardDescription>
              </CardHeader>
              <CardContent>May 23, 2024 - May 30, 2024</CardContent>
              <CardFooter className="flex flex-row space-x-4 justify-between">
                <div className="whitespace-nowrap">test</div>
                <Avatar className="whitespace-nowrap">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="border rounded-lg border-[#D9D9D9] p-6 min-w-96 h-fit">
          {/* Header */}
          {/* <div className="border border-ra"></div> */}
          <div className="text-lg py-4">PENDING 2</div>
          <Separator className="bg-[#C4C4C4]" />
          {/* Content */}
          <div className="p-4 grid gap-5">
            <Card className="">
              <CardHeader>
                <div className="flex justify-left">
                  <Badge
                    className=" text-black  rounded-xl justify-center flex"
                    variant="green"
                  >
                    LOW
                  </Badge>
                </div>
                <CardTitle>Card Title</CardTitle>
                <CardDescription className="">Card Description</CardDescription>
              </CardHeader>
              <CardContent>May 23, 2024 - May 30, 2024</CardContent>
              <CardFooter className="flex flex-row space-x-4 justify-between">
                <div className="whitespace-nowrap">test</div>
                <Avatar className="whitespace-nowrap">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </CardFooter>
            </Card>
            <Card className="">
              <CardHeader>
                <div className="flex justify-left">
                  <Badge
                    className=" text-black  rounded-xl justify-center flex"
                    variant="green"
                  >
                    LOW
                  </Badge>
                </div>
                <CardTitle>Card Title</CardTitle>
                <CardDescription className="">Card Description</CardDescription>
              </CardHeader>
              <CardContent>May 23, 2024 - May 30, 2024</CardContent>
              <CardFooter className="flex flex-row space-x-4 justify-between">
                <div className="whitespace-nowrap">test</div>
                <Avatar className="whitespace-nowrap">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="border rounded-lg border-[#D9D9D9] p-6 min-w-96 h-fit">
          {/* Header */}
          {/* <div className="border border-ra"></div> */}
          <div className="text-lg py-4">COMPLETED 2</div>
          <Separator className="bg-[#C4C4C4]" />
          {/* Content */}
          <div className="p-4 grid gap-5">
            <Card className="">
              <CardHeader>
                <div className="flex justify-left">
                  <Badge
                    className=" text-black  rounded-xl justify-center flex"
                    variant="green"
                  >
                    LOW
                  </Badge>
                </div>
                <CardTitle>Card Title</CardTitle>
                <CardDescription className="">Card Description</CardDescription>
              </CardHeader>
              <CardContent>May 23, 2024 - May 30, 2024</CardContent>
              <CardFooter className="flex flex-row space-x-4 justify-between">
                <div className="whitespace-nowrap">test</div>
                <Avatar className="whitespace-nowrap">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </CardFooter>
            </Card>
            <Card className="">
              <CardHeader>
                <div className="flex justify-left">
                  <Badge
                    className=" text-black  rounded-xl justify-center flex"
                    variant="green"
                  >
                    LOW
                  </Badge>
                </div>
                <CardTitle>Card Title</CardTitle>
                <CardDescription className="">Card Description</CardDescription>
              </CardHeader>
              <CardContent>May 23, 2024 - May 30, 2024</CardContent>
              <CardFooter className="flex flex-row space-x-4 justify-between">
                <div className="whitespace-nowrap">test</div>
                <Avatar className="whitespace-nowrap">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
