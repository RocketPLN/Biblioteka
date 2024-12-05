import { server } from "@/services/trpc/server";

import { ChartConfig } from "@/components/ui/chart";
import Chart from "./components/chart";
import DashboardCard from "./components/card";
import { auth } from "@/services/auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth();

  if (!session?.user || !session.user.roles.includes("ADMIN")) {
    redirect("/");
  }

  const users = await server.User.getUsers();
  const orders = await server.Orders.getAllOrders();

  const year = new Date().getFullYear();
  const monthList = getMonthList();
  const chartData_Users = monthList.short.map((month) => {
    return {
      month: `${month}`,
      users: users.filter(
        (user) =>
          user.createdAt.toLocaleDateString("default", {
            month: "short",
            year: "numeric",
          }) === `${month} ${year}`,
      ).length,
    };
  });

  const chartData_Books = monthList.short.map((month) => {
    return {
      month: `${month}`,
      books: orders.filter(
        (order) =>
          new Date(order.createdAt).toLocaleDateString("default", {
            month: "short",
            year: "numeric",
          }) === `${month} ${year}`,
      ).length,
    };
  });

  const chartConfig_Users = {
    users: {
      label: "Users",
      color: "hsl(var(--muted-foreground))",
    },
  } satisfies ChartConfig;

  const chartConfig_Books = {
    books: {
      label: "Books",
      color: "hsl(var(--muted-foreground))",
    },
  } satisfies ChartConfig;

  return (
    <div className="grid w-full grid-cols-2 grid-rows-2 justify-items-center gap-x-4 gap-y-2">
      <style>{`
        body {
          overflow:hidden;
        }
      `}</style>
      <div className="w-full">
        <Chart
          title="Utworzeni Użytkownicy"
          description={"W roku: " + year}
          chartConfig={chartConfig_Users}
          chartData={chartData_Users}
          barKey="users"
          dataKey="month"
          footer={`W całym roku utworzono: ${users.filter((user) => user.createdAt.getFullYear() === year).length}`}
        />
      </div>
      <div className="w-full">
        <Chart
          title="Wypożyczone książki"
          description={"W roku: " + year}
          chartConfig={chartConfig_Books}
          chartData={chartData_Books}
          barKey="books"
          dataKey="month"
          footer={`W całym roku wypożyczono: ${orders.filter((order) => new Date(order.createdAt).getFullYear() === year).length}`}
        />
      </div>
      <div className="h-full w-full">
        <DashboardCard
          title="Panel Użytkowników"
          description="Tu możesz dodawać, usuwać, blokować użytkowników"
          link="users"
        />
      </div>
      <div className="h-full w-full">
        <DashboardCard
          title="Panel Książek"
          description="Tu możesz dodawać, modyfikować ksiązki"
          link="books"
        />
      </div>
    </div>
  );
};

export default Dashboard;

function getMonthList() {
  const year = new Date().getFullYear();
  const long = [...Array(12).keys()].map((i) =>
    new Date(year, i).toLocaleDateString("default", { month: "long" }),
  );
  const short = [...Array(12).keys()].map((i) =>
    new Date(year, i).toLocaleDateString("default", { month: "short" }),
  );

  return { long, short };
}
