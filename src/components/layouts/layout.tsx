import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mx-auto p-4 py-10 max-w-[1400px] min-h-screen">
      {children}
    </div>
  );
};
