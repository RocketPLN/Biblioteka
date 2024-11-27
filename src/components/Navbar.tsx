"use client";

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";

function Navbar() {
  const user = useSession().data?.user;
  // TODO: dokonczyc

  return (
    <nav className="flex w-screen items-center justify-between border bg-muted/30 p-2 px-6">
      <span className="bg-gradient-to-r from-primary to-primary/45 bg-clip-text text-3xl font-bold text-transparent">
        Biblioteka
      </span>
      <span>SearchBar ????</span>
      {user ? (
        <div>{user?.firstName + " " + user?.lastName}</div>
      ) : (
        <div className="flex gap-2">
          <Link href="/sign-in">
            <Button variant="outline">Zaloguj się</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="link">Zarejstruj się</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
