import { Outlet, Link } from "react-router-dom";
import Header from "./Header";

export default function DefaultLayout() {
  return (
    <div>
      <div className="mb-2">
        <Header />
      </div>
      <div className="container h-100">
        <Outlet />
      </div>
    </div>
  );
}