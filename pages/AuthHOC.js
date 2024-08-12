import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import roles from "@/utils/roles";

const AuthHOC = (Component) => {
  return function CheckRole(props) {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useSelector((state) => state.userData);
    const role = user.role;
    switch (role) {
      case roles.ADMIN:
        if (/store-owner|user\//.test(pathname)) {
          router.replace("/admin/dashboard");
        }
        break;
      case roles.USER:
        if (/admin|store-owner/.test(pathname)) {
          router.replace("/user/dashboard");
        }
        break;
      case roles.STOREOW:
        if (/admin|user\//.test(pathname)) {
          router.replace("/store-owner/dashboard");
        }
        break;
    }
    return <Component {...props} />;
  };
};

export default AuthHOC;
