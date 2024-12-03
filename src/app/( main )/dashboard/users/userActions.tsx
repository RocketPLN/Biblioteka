"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Construction, Lock, UserRoundX } from "lucide-react";

import { User } from "@prisma/client";
import { api } from "@/services/trpc/api";
import { Send } from "@/lib/email";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import bcrypt from "bcryptjs";
import { EmailHtml } from "@/emails/admin-email";

const UserActions = ({ user }: { user: User }) => {
  const router = useRouter();
  const { mutateAsync: updateUser } = api.User.updateUser.useMutation();
  const { mutateAsync: removeUser } = api.User.deleteUser.useMutation();

  async function Reset() {
    const pwHash = await bcrypt.hash("zse1234;", 10);
    await updateUser({ ...user, password: pwHash, verify: user.verified });
    toast.success("Udało się zresetować hasło");

    router.prefetch("/dashboard/users");
    router.push("/dashboard/users");
  }

  async function Remove() {
    await removeUser(user.id);
    toast.success("Udało się usunąc");

    const html = await EmailHtml({
      text: "Twoje Konto zostało usuniente przez administratora",
    });

    await Send({
      to: user.email,
      subject: "Twoje konto",
      html: html,
    });

    router.prefetch("/dashboard/users");
    router.push("/dashboard/users");
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full" variant="outline">
                <Lock />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Jesteś pewny że chcesz zresetować hasło
                </DialogTitle>
                <DialogDescription>
                  Po zresetowaniu hasło bedzie ustawione na zse1234;
                </DialogDescription>
              </DialogHeader>
              <DialogClose asChild>
                <div className="flex w-full justify-around gap-4">
                  <Button variant="destructive" className="w-full">
                    Nie
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={Reset}
                    className="w-full"
                  >
                    Tak
                  </Button>
                </div>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent>
          <p>Zresetuj Hasło</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="w-full">
            <Construction />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Zablokowanie Użytkownika</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full" variant="destructive">
                <UserRoundX />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Jesteś pewny że chcesz usunać to konto
                </DialogTitle>
                <DialogDescription>
                  Ten proces jest nie odwracalny
                </DialogDescription>
              </DialogHeader>
              <DialogClose asChild>
                <div className="flex w-full justify-around gap-4">
                  <Button variant="destructive" className="w-full">
                    Nie
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={Remove}
                    className="w-full"
                  >
                    Tak
                  </Button>
                </div>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent>
          <p>Zresetuj Hasło</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
};

export default UserActions;
