import Image from "next/image";
import logo from "../../../public/logo.svg";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import roles from "@/utils/roles";
import { userDataActions } from "@/redux-store/userDataSlice";
import { usePathname } from "next/navigation";
const Header = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userData);
  useEffect(() => {
    const local_user = JSON.parse(localStorage.getItem("user"));
    dispatch(userDataActions.saveUserData({ ...local_user }));
  }, []);
  const role = user.role;

  return (
    <header className="bg-white h-14 py-2 px-5 flex items-center justify-between border-b w-full transition-[top] duration-500 shadow-xl">
      <div className="logo">
        <Image src={logo} alt="header-logo" width="150" height={"100"} />
      </div>
      <nav className="navigation flex gap-5">
        {pathname != "/auth/sign-in" && pathname != "/auth/sign-up" && (
          <Link
            className={`border-b-2 ${
              pathname.includes("dashboard")
                ? "border-black"
                : "border-transparent"
            } `}
            href={
              role == roles.ADMIN
                ? "/admin/dashboard"
                : role == roles.USER
                ? "/user/dashboard"
                : "/store-owner/dashboard"
            }
          >
            Dashboard
          </Link>
        )}
        {role === roles.ADMIN && (
          <>
            <Link
              className={`border-b-2 ${
                pathname.includes("/admin/users")
                  ? "border-black"
                  : "border-transparent"
              } `}
              href="/admin/users"
            >
              Users
            </Link>
            <Link
              className={`border-b-2 ${
                pathname.includes("/admin/store")
                  ? "border-black"
                  : "border-transparent"
              } `}
              href="/admin/store"
            >
              Store
            </Link>
          </>
        )}
        {pathname != "/auth/sign-in" && pathname != "/auth/sign-up" && (
          <Link
            className={`border-b-2 ${
              pathname.includes("/auth/account")
                ? "border-black"
                : "border-transparent"
            } `}
            href={"/auth/account"}
          >
            Account
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
