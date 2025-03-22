import { Link } from "react-router-dom";
import Search from "./Search";
export default function SideMenu() {
  return (
    <div className="sticky px-4 h-max top-8">
      <h2 className="mb-4 text-sm font-medium">Search</h2>
      <Search />
      {/* Filters */}
      <h2 className="mt-8 mb-4 text-sm font-medium">Filters</h2>
      <div className="flex flex-col gap-2 text-sm">
        <label
          htmlFor="newest"
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name="sort"
            id="newest"
            value="newest"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800 "
          />
          Newest
        </label>
        <label
          htmlFor="popular"
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name="sort"
            id="popular"
            value="popular"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800 "
          />
          Most Popular
        </label>

        <label
          htmlFor="trending"
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name="sort"
            id="trending"
            value="trending"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800 "
          />
          Trending
        </label>

        <label
          htmlFor="oldest"
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name="sort"
            id="oldest"
            value="oldest"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800 "
          />
          Oldest
        </label>
      </div>

      {/* Categories */}

      <h2 className="mt-8 mb-4 text-sm font-medium">Categories</h2>
      <div className="flex flex-col gap-2 text-sm">
        <Link className="underline" to="/posts">
          All
        </Link>
        <Link className="underline" to="/posts?cat=web-design">
          Web Design
        </Link>
        <Link className="underline" to="/posts?cat=development">
          Development
        </Link>
        <Link className="underline" to="/posts?cat=databases">
          Databases
        </Link>
        <Link className="underline" to="/posts?cat=seo">
          Search Engines
        </Link>
        <Link className="underline" to="/posts?cat=marketing">
          Marketing
        </Link>
      </div>
    </div>
  );
}
