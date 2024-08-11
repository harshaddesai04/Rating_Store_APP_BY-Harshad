import Image from "next/image";
import logo from "../../../public/logo.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import roles from "@/utils/roles";
import { userDataActions } from "@/redux-store/userDataSlice";
import { redirect, usePathname } from "next/navigation";
import { useRouter } from "next/router";
const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userData);
  useEffect(() => {
    const local_user = JSON.parse(localStorage.getItem("user"));
    dispatch(userDataActions.saveUserData({ ...local_user }));
    document.cookie = "username=John Doe";
  }, []);
  const role = user.role;
  // const role = roles.ADMIN;
  // const [isMenuActive, setIsMenuActive] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(-1);
  const [top, setTop] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentPos = window.scrollY;
      if (currentPos < prevScrollPos) {
        setTop(0);
      } else {
        // setTop(isMenuActive ? 0 : -5);
        setTop(-5);
      }
      setPrevScrollPos(currentPos);
    };
    window?.addEventListener("scroll", handleScroll);
    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <header
      // style={{ top: `${top}rem` }}
      className="bg-white h-14 py-2 px-5 flex items-center justify-between border-b w-full transition-[top] duration-500 shadow-xl"
    >
      <div className="logo">
        <Image src={logo} alt="header-logo" width="150" height={"100"} />
      </div>
      <nav className="navigation flex gap-5">
        {pathname != "/auth/sign-in" && pathname != "/auth/sign-up" && (
          <Link
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
            <Link href="/admin/users">Users</Link>
            <Link href="/admin/store">Store</Link>
            <Link href="/user/dashboard">Rate a store</Link>
          </>
        )}
        {pathname != "/auth/sign-in" && pathname != "/auth/sign-up" && (
          <Link href={"/auth/account"}>Account</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
