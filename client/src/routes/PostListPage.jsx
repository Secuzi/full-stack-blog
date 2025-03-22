import { useState } from "react";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";

export default function PostListPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1 className="mb-8 text-2xl">Development Blog</h1>
      <button
        onClick={() => setOpen((prevVal) => !prevVal)}
        className="bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl md:hidden mb-4"
      >
        {open ? "Close" : "Filter or Search"}
      </button>
      <div className="flex flex-col-reverse md:flex-row gap-8 ">
        <div>
          <PostList />
        </div>
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SideMenu />
        </div>
      </div>
    </div>
  );
}
