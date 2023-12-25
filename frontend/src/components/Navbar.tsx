"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";

const Navbar = () => {
  const localUser = localStorage.getItem("user");
  const user = localUser ? JSON.parse(localUser) : null;
  return (
    <div className="py-8 sticky z-50 top-0 inset-x-0 h-16 bg-white">
      <header className="relative bg-white">
        <MaxWidthWrapper className="flex justify-between items-center border-b-[1px] border-gray-300 pb-3">
          <div className="text-2xl font-mono">
            <Link href={"/"}>Book</Link>
          </div>
          <div className="flex justify-center items-center gap-x-4">
            <div>
              {user ? (
                <div>{user.name}</div>
              ) : (
                <div>
                  <Link href={"/login"} className={buttonVariants()}>
                    Login
                  </Link>
                </div>
              )}
            </div>
            <span className="h-6 w-px bg-gray-300" aria-hidden="true"></span>
            <div>
              <Link href={"/write"} className="font-medium text-lg">
                Write
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
