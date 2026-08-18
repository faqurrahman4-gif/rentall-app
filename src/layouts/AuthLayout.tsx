import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="app-shell flex flex-col">
      <div className="flex flex-1 flex-col px-6 py-8">
        <Outlet />
      </div>
    </div>
  );
}
