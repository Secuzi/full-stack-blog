import { useEffect, useState } from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    const getTokenFunc = async () => {
      const token = await getToken();
      console.log(token);
    };
    getTokenFunc();
  }, []);

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image src="logo.png" alt="Company Logo" width={32} height={32} />
        <span>HeyBlogger</span>
      </Link>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setOpen((prevState) => !prevState)}
        >
          {open ? "X" : "☰"}
        </div>
        {/* Mobile Link list */}
        <div
          className={`w-full h-screen flex flex-col items-center justify-center absolute gap-8 font-medium text-lg top-16 bg-[#e6e6ff] transition-all ease-in-out ${
            open ? "-right-0" : "-right-[100%]"
          }`}
        >
          <Link to="/">Home</Link>
          <Link to="/">Trending</Link>
          <Link to="/">Most Popular</Link>
          <Link to="/">About</Link>
          <Link to="/">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Log in 👋
            </button>
          </Link>
        </div>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>

        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Log in 👋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
