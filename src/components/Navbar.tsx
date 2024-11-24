"use client";

import { useSession } from "next-auth/react";

function Navbar() {
  const user = useSession().data?.user;
  // TODO: dokonczyc

  return (
    <nav className="flex w-screen items-center justify-between border bg-muted/30 p-2 px-6">
      <span className="bg-gradient-to-r from-primary to-primary/45 bg-clip-text text-3xl font-bold text-transparent">
        Biblioteka
      </span>
      <span>SearchBar ????</span>
      <div>{user?.firstName + " " + user?.lastName}</div>
    </nav>
  );
}

export default Navbar;
