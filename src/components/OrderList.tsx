"use client";

import Image from "next/image";
import { Books, Orders } from "@prisma/client";
import { useRouter } from "next/navigation";

import { api } from "@/services/trpc/api";

import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

const OrderList = ({
  orders,
  completed = false,
}: {
  orders: ({ book: Books } & Orders)[];
  completed?: boolean;
}) => {
  const router = useRouter();
  const updateOrder = api.Orders.updateOrder.useMutation();

  async function ReturnBook(id: string) {
    await updateOrder.mutateAsync(id);
    router.prefetch("/me");
    router.push("/me");
  }

  return (
    <ScrollArea className="h-5/6 w-full">
      {orders.map((order) => (
        <div
          key={order.id}
          className="my-3 grid w-full grid-cols-3 place-items-center gap-y-3 rounded-sm border bg-muted p-2 drop-shadow-md"
        >
          <span>
            Wypożyczono: <br />
            {new Date(order.createdAt).toLocaleDateString()}
          </span>
          <div className="flex w-1/2 justify-center gap-x-4">
            <div className="flex w-1/3 items-center justify-center overflow-hidden rounded-md bg-white">
              <Image
                src="https://wolnelektury.pl/media/book/cover_clean/saint-exupery-maly-ksiaze_uaQHsUD.jpg"
                alt={order.book.title}
                width={0}
                height={0}
                sizes="100%"
                className="w-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-bold capitalize">
                {order.book.title}
              </span>
              <span className="text-lg font-semibold text-muted-foreground">
                {order.book.author}
              </span>
            </div>
          </div>
          <span>
            {completed ? "Wzrócono: " : "Wzrot:"} <br />
            {new Date(order.deadline).toLocaleDateString()}
          </span>
          {!completed && (
            <Button
              className="col-span-full w-1/2 text-lg font-semibold"
              onClick={() => ReturnBook(order.id)}
            >
              Oddaj
            </Button>
          )}
        </div>
      ))}
    </ScrollArea>
  );
};

export default OrderList;
