import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, UserPlus, Check, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TaskMember {
  id: string;
  username: string;
  avatar?: string;
}

interface AssignedToSectionProps {
  members?: TaskMember[];
  projectMembers?: Array<{ id: string; username: string; avatar?: string }>;
  onUpdateMembers: (members: TaskMember[]) => Promise<void>;
}

export default function AssignedToSection({
  members = [], // Provide default empty array
  projectMembers = [], // Provide default empty array
  onUpdateMembers,
}: AssignedToSectionProps) {
  const [isManagingMembers, setIsManagingMembers] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<TaskMember[]>(members);
  const [searchQuery, setSearchQuery] = useState("");

  // console.log("members", members);

  useEffect(() => {
    if (isManagingMembers) {
      setSelectedMembers(members);
    }
  }, [isManagingMembers, members]);

  // Filter out already selected members from available members
  const availableMembers =
    projectMembers?.filter(
      (pm) => !selectedMembers.some((sm) => sm.username === pm.username)
    ) || [];

  const handleAddMember = (memberId: string) => {
    const memberToAdd = projectMembers?.find((m) => m.id === memberId);
    if (memberToAdd) {
      setSelectedMembers([...selectedMembers, memberToAdd]);
    }
  };

  const handleRemoveMember = (memberId: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== memberId));
  };

  const handleSaveMembers = async () => {
    await onUpdateMembers(selectedMembers);
    setIsManagingMembers(false);
  };

  const filteredAvailableMembers = availableMembers.filter((member) =>
    member.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <h4 className="text-lg font-medium">Assigned Members</h4>
        </div>
        <Dialog open={isManagingMembers} onOpenChange={setIsManagingMembers}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Manage Members
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Manage Task Members</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Search and Add Members */}
              <div className="space-y-2">
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />

                <div className="max-h-48 overflow-y-auto border rounded-md">
                  {filteredAvailableMembers.length > 0 ? (
                    filteredAvailableMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-2 hover:bg-muted cursor-pointer"
                        onClick={() => handleAddMember(member.id)}
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.username[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{member.username}</span>
                        </div>
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-center text-muted-foreground">
                      No available members found
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Members */}
              <div>
                <h5 className="text-sm font-medium mb-2">Selected Members</h5>
                <div className="space-y-2">
                  {selectedMembers.length > 0 ? (
                    selectedMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-2 bg-muted rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.username[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{member.username}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-center text-muted-foreground">
                      No members selected
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsManagingMembers(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveMembers}>
                  <Check className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Member Avatars Display */}
      <div className="flex flex-wrap items-center gap-2">
        {members.length > 0 ? (
          members.map((member) => (
            <TooltipProvider key={member.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar} alt={member.username} />
                    <AvatarFallback>
                      {member.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>{member.username}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No members assigned</p>
        )}
      </div>
    </div>
  );
}
