import { Outlet } from "react-router-dom";
import BottomNav from "../components/ui/BottomNav";

export default function MainLayout() {
  return (
    <div className="app-shell flex flex-col">
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
