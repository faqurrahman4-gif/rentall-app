import { Outlet } from "react-router-dom";

export default function OwnerLayout() {
  return (
    <div className="app-shell flex flex-col">
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
    </div>
  );
}
