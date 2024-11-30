"use client";

import { usePathname } from "next/navigation";

import {
  Breadcrumb as BreadC,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Breadcrumb() {
  const pathname = usePathname()
    .split("/")
    .filter((i) => i);
  const lastItem = pathname.at(pathname.length - 1);

  return (
    <BreadC>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {pathname.map((path, index) => (
          <div className="flex items-center gap-1.5 sm:gap-2.5" key={index}>
            <BreadcrumbItem>
              {path !== lastItem ? (
                <BreadcrumbLink className="capitalize" href={`/${path}`}>
                  {path}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="capitalize">{path}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {path !== lastItem && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </BreadC>
  );
}

export default Breadcrumb;
