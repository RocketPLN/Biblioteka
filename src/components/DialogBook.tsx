"use client";

import { BookmarkPlus } from "lucide-react";

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
import { api } from "@/services/trpc/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DialogBook = ({ userId, bookId, disabled}: { userId: string; bookId: string, disabled: boolean }) => {
  const router = useRouter();
  const { data } = api.Orders.getAllOrders.useQuery();
  const order = api.Orders.createOrder.useMutation();

  async function onClick() {
    if (data?.find((order) => order.booksId === bookId && !order.completed)) {
      toast.error("Próbujesz dodać książke która jest już wypożyczona");
    }
    await order.mutateAsync({ booksId: bookId, userId: userId });
    toast.success("Dodano pomyślnie");
    router.prefetch(`/book/${bookId}`);
    router.push(`/book/${bookId}`);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex w-4/5 items-center py-6 text-2xl" disabled={disabled}>
          Wypożycz <BookmarkPlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Jesteś pewny</DialogTitle>
          <DialogDescription>
            Jesteś pewny, że chcesz wypożyczyć tą książke?
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <div className="flex w-full justify-around">
            <Button variant="destructive" className="w-2/5">
              Nie
            </Button>
            <Button className="w-2/5" variant="outline" onClick={onClick}>
              Tak
            </Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBook;
