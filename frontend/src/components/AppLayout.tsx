import { FC, Suspense } from "react";
import AppSidebar from "./AppSidebar";
import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppFallback from "./AppFallback";
import AppFooter from "./AppFooter";

const AppLayout: FC = () => {
  return (
    <div className="flex w-screen">
      <AppSidebar />
      <div className="max-h-screen w-full relative overflow-y-scroll transition-all ease-in-out bg-[url('@/assets/images/services_bg.jpg')] bg-contain">
        <AppHeader />
        <main className="relative min-h-[calc(100vh-60px)] !w-full">
          <Suspense fallback={<AppFallback />}>
            <Outlet />
          </Suspense>
        </main>
        <AppFooter />
      </div>
    </div>
  );
};

export default AppLayout;
