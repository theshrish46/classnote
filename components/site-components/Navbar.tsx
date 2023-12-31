import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import { ModeToggle } from "../mode-toggle";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { cookies } from "next/headers";
import { decodedToken } from "@/lib/jwt-token";
import { logout } from "@/app/actions/auth-action";
import MobileNav from "./MobileNav";

const Navbar = async () => {
  const token = cookies().get("accessToken");
  const decoded: any = token ? decodedToken(token?.value) : null;
  return (
    <div className="bg-white dark:bg-black sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white dark:bg-black">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200 dark:border-gray-800">
            <div className="flex h-16 items-center">
              <div className="ml-4 flex lg:ml-0 justify-between w-full">
                <Link
                  href={"/"}
                  className="flex justify-center items-center gap-x-1 md:gap-x-3 hover:text-blue-700 transition-all duration-150"
                >
                  <Icons.logo size={10} />
                  <p className="text-sm font-bold">classnote</p>
                </Link>
                <div className="flex justify-center items-center gap-x-2 md:hidden">
                  <ModeToggle />
                  <MobileNav />
                </div>
                <div className="hidden md:flex justify-center items-center gap-x-3">
                  <ModeToggle />
                  <Link
                    href={"/write"}
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "font-semibold text-lg"
                    )}
                  >
                    Write
                  </Link>
                  {decoded && decoded.id ? (
                    <>
                      <form action={logout}>
                        <Button
                          className={cn(
                            buttonVariants({
                              size: "sm",
                              variant: "destructive",
                            })
                          )}
                        >
                          Logout
                        </Button>
                      </form>
                    </>
                  ) : (
                    <Link
                      href={"/auth"}
                      className={cn(
                        buttonVariants({
                          size: "sm",
                          variant: "link",
                        })
                      )}
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};
export default Navbar;
