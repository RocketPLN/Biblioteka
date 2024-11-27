import Link from "next/link";
import { auth } from "@/services/auth";

import SearchBar from "@/components/navbar/Searchbar";
import { Button } from "@/components/ui/button";
import UserDropdown from "./UserDropdown";

async function Navbar() {
  const session = await auth();
  const user = session?.user;

  // TODO: dokonczyc

  return (
    <>
      {!user?.verified && (
        <div className="sticky left-0 top-0 m-0 border-b-2 border-destructive bg-destructive text-center text-lg text-background">
          <div className="flex justify-center gap-4 bg-foreground/60 py-2">
            Twój email nie jest zweryfikowany.
            <Link href="/verify" className="text-primary/80">
              Zweryfikuj
            </Link>
          </div>
        </div>
      )}
      <nav className="flex items-center justify-between border bg-muted/30 p-2 px-6">
        <span className="bg-gradient-to-r from-primary to-primary/45 bg-clip-text text-3xl font-bold italic text-transparent">
          Biblioteka
        </span>
        <SearchBar />
        {user ? (
          <UserDropdown user={user} />
        ) : (
          <div className="flex gap-2">
            <Link href="/sign-in">
              <Button variant="outline">Zaloguj się</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="link" className="bg-muted/50">
                Zarejstruj się
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
