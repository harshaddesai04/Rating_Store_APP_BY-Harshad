import { NextResponse } from "next/server";
import roles from "./utils/roles";
export function middleware(request) {
  let cookie = request.cookies.get("userData");
  let pathname = request.nextUrl.pathname;
  if (cookie) {
    let role = JSON.parse(cookie.value).role;

    switch (role) {
      case roles.ADMIN:
        if (/store-owner|user/.test(pathname)) {
          if (!pathname.includes("/dashboard")) {
            const absoluteURL = new URL(
              "/admin/dashboard",
              request.nextUrl.origin
            );
            return NextResponse.redirect(absoluteURL.toString());
          }
        }
        break;
      case roles.USER:
        if (/admin|store-owner/.test(pathname)) {
          const absoluteURL = new URL(
            "/user/dashboard",
            request.nextUrl.origin
          );
          return NextResponse.redirect(absoluteURL.toString());
        }
        break;
      case roles.STOREOW:
        if (/admin|user/.test(pathname)) {
          const absoluteURL = new URL(
            "/store-owner/dashboard",
            request.nextUrl.origin
          );
          return NextResponse.redirect(absoluteURL.toString());
        }
        break;
    }
  }
}
/*
access cookies in middleware:
  let cookie = request.cookies.get("userData");
console.log(cookie.name, cookie.value);
    console.log(request.nextUrl.origin); get base url

*/
