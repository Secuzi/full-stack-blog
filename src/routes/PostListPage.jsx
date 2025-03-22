import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";

export default function PostListPage() {
  return (
    <div>
      <h1 className="mb-8 text-2xl">Development Blog</h1>
      <div className="flex gap-8 ">
        <div>
          <PostList />
        </div>
        <div>
          <SideMenu />
        </div>
      </div>
    </div>
  );
}
