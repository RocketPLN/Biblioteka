import { ReactNode } from "react";
import Breadcrumb from "./components/breadcrumb";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="p-2">
      <Breadcrumb />
      {children}
    </div>
  );
}

export default Layout;
