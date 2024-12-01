"use client";

import { Button } from "@/components/ui/button";
import { checkOrders } from "@/lib/checkOrder";

function Page() {
  return (
    <div>
      <Button onClick={async () => await checkOrders()}>check</Button>
    </div>
  );
}

export default Page;
