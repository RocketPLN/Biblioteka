import { auth } from "@/services/auth";
import { server } from "@/services/trpc/server";

import OrderList from "@/components/OrderList";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Page = async () => {
  const session = await auth();
  const orders = await server.Orders.getOrders(session?.user.id as string);
  const finishedOrders = orders.filter((order) => order.completed === true);
  const uncompletedOrders = orders.filter((order) => order.completed !== true);

  return (
    <div className="h-screen w-full p-4">
      <style>{`
        body {
          overflow:hidden;
        }
      `}</style>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50} className="flex flex-col items-center">
          <h1 className="py-4 text-3xl font-extrabold text-secondary-foreground">
            Obecnie wypożyczone
          </h1>
          <OrderList orders={uncompletedOrders} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={50}
          className="flex flex-col items-center bg-secondary/40"
        >
          <h1 className="py-4 text-3xl font-extrabold text-secondary-foreground">
            Historia wypożyczeń
          </h1>
          <OrderList orders={finishedOrders} completed />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Page;
