import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import UserActions from "./userActions";
import UserAdd from "./userAdd";

import { auth } from "@/services/auth";
import { server } from "@/services/trpc/server";
import { redirect } from "next/navigation";


async function Page() {
  const users = await server.User.getUsers();
  const session = await auth();

  if (!session?.user || !session.user.roles.includes("ADMIN")) {
    redirect("/");
  }

  return (
    <div className="grid w-full grid-cols-3 place-items-center gap-3 rounded-sm border bg-muted/70 p-2 pb-4 drop-shadow-md md:grid-cols-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="col-span-full w-3/5">
            Dodaj Użytkownika
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Dodaj nowego użytkownika</DialogTitle>
            <DialogDescription>
              Utworzony przez ciebie użytkownik bedzie miał domyślne hasło
              <b>
                <i> zse1234;</i>
              </b>
            </DialogDescription>
          </DialogHeader>
          <UserAdd />
        </DialogContent>
      </Dialog>
      <TooltipProvider>
        {users.map((user) => (
          <div
            key={user.id}
            className="relative flex size-full w-full flex-col rounded-sm border bg-muted p-3 drop-shadow-md"
          >
            {user.roles.includes("ADMIN") && (
              <>
                <span className="absolute left-1 top-1 inline-flex size-3 animate-ping rounded-full bg-primary opacity-75" />
                <span className="absolute left-1 top-1 inline-flex h-3 w-3 rounded-full bg-primary" />
              </>
            )}
            {user.banned && (
              <>
                <span className="absolute left-1 top-1 inline-flex size-3 animate-ping rounded-full bg-destructive opacity-75" />
                <span className="absolute left-1 top-1 inline-flex h-3 w-3 rounded-full bg-destructive" />
              </>
            )}
            <p className="text-center text-lg font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="truncate">{user.email}</p>
            <p>
              Zweryfikowany:{" "}
              <i>
                <b>{user.verified ? "Tak" : "Nie"}</b>
              </i>
            </p>
            <Separator className="my-2" />
            {user.id === session?.user.id ? (
              <p className="text-center font-semibold">Twoje Konto</p>
            ) : (
              <div className="grid grid-cols-3 gap-x-2 gap-y-1">
                <p className="col-span-full text-center font-semibold">Opcje</p>
                <UserActions user={user} />
              </div>
            )}
          </div>
        ))}
      </TooltipProvider>
    </div>
  );
}

export default Page;
