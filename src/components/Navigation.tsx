import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";

export const Navigation = () => {
  return (
    <>
      <nav className="bg-white border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="shrink-0">
              <h1 className="text-xl text-white font-semibold ">
                Next.js app
              </h1>
            </div>
            <div className="flext items-center gap-4">
              <SignedOut>
                <SignInButton>
                  <button className="px-2 py-1 text-sm border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700">Signin</button>
                </SignInButton>

                <SignUpButton>
                  <button className="px-2 py-1 text-sm border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700">Signup</button>
                </SignUpButton>
              </SignedOut>
              {/* <UserButton /> */}
              <SignedIn>
                <Link href="/user-profile" className="px-2">
                  Profile
                </Link>
                <SignOutButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
