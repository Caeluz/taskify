import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock } from "lucide-react";

export default function TaskCardDialogContent() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Implement User authentication</DialogTitle>
        <div className="flex flex-row gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Due July 15</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>4:00 PM</span>
          </div>
        </div>
        <DialogDescription className="mt-5">
          Implement user authentication using Auth0. This will allow users to
          sign in and access the application. This will also allow us to track
          user activity and provide a more personalized experience.
        </DialogDescription>
      </DialogHeader>
      {/* Body */}
      <div className="mt-6">
        {/* Assigned To section */}
        <div>
          <h4>Assigned To</h4>
          <div className="mt-2 flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
        {/* Attachments */}
        <div>
          <h4>Attachments</h4>
        </div>
        {/* Comments */}
        <div className="mt-4">
          <h4>Comments</h4>
          <div className="mt-2 space-y-4">
            {/* Singular Comment */}
            <div className="flex items-start gap-4 ">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="rounded-md border bg-background p-3">
                  <p>
                    Great work! I think we can improve the user experience by
                    adding a loading spinner when the user is signing in.
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">2 days ago</div>
              </div>
            </div>
            <div className="flex items-start gap-4 ">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="rounded-md border bg-background p-3">
                  <p>
                    Great work! I think we can improve the user experience by
                    adding a loading spinner when the user is signing in.
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">2 days ago</div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Textarea
              placeholder="Add a comment..."
              className="min-h-[100px]"
            />
            <div className="mt-2 flex justify-end gap-2">
              <Button variant="ghost">Cancel</Button>
              <Button>Post Comment</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
