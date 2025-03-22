import { Link } from "react-router-dom";
import Image from "./Image";

export default function PostListItem() {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="md:hidden xl:block xl:w-1/3">
        <Image
          src="postImg.jpeg"
          className="rounded-2xl object-cover"
          width="735"
        />
      </div>
      {/* Details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to="/test" className="text-4xl font-semibold">
          Lorem ipsum dolor sit amet.
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link className="text-blue-800">John Doe</Link>
          <span>on</span>
          <Link className="text-blue-800">Web Design</Link>
          <span>2 days ago</span>
        </div>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque velit
          fugiat placeat quaerat, repellendus repudiandae accusamus voluptas,
          esse recusandae hic voluptatum odio ipsum quidem ad, rem corporis
          voluptatibus deserunt unde?
        </p>
        <Link to="/test" className="underline text-sm text-blue-800">
          Read more
        </Link>
      </div>
    </div>
  );
}
