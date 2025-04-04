import { Link, useParams } from "react-router-dom";
import Image from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

export default function SinglePostPage() {
  const { slug } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "Loading...";
  if (error) return "Something went wrong... " + error.message;
  if (!data) return "Post not found!";

  return (
    <div className="flex flex-col gap-8">
      {/* Detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link to="" className="text-blue-800">
              {data.user.username}
            </Link>
            <span>on</span>
            <Link to="" className="text-blue-800">
              {data.category}
            </Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>

        {data.img && (
          <div className="hidden lg:block w-2/5">
            <Image src={data.img} width="600" className="rounded-2xl" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            ullam, possimus id quia, sapiente quis ab autem nemo eveniet quo
            cupiditate sequi iste iure dignissimos accusantium minima doloribus
            officia, soluta nisi necessitatibus debitis provident. Libero rerum
            magni similique pariatur asperiores minus, rem numquam laborum sequi
            maiores illo ex necessitatibus tempore. Deserunt culpa assumenda
            officia facilis laboriosam eos laborum dicta! Quos quis tempora
            quidem laboriosam. Quia eaque nihil nemo omnis dicta debitis unde ea
            alias, blanditiis consequuntur quidem nulla molestias ratione ex
            vel! Sint deleniti ipsam voluptas voluptatibus, hic dolores
            aspernatur voluptate optio rem laudantium deserunt quibusdam magni
            impedit, quam unde.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            ullam, possimus id quia, sapiente quis ab autem nemo eveniet quo
            cupiditate sequi iste iure dignissimos accusantium minima doloribus
            officia, soluta nisi necessitatibus debitis provident. Libero rerum
            magni similique pariatur asperiores minus, rem numquam laborum sequi
            maiores illo ex necessitatibus tempore. Deserunt culpa assumenda
            officia facilis laboriosam eos laborum dicta! Quos quis tempora
            quidem laboriosam. Quia eaque nihil nemo omnis dicta debitis unde ea
            alias, blanditiis consequuntur quidem nulla molestias ratione ex
            vel! Sint deleniti ipsam voluptas voluptatibus, hic dolores
            aspernatur voluptate optio rem laudantium deserunt quibusdam magni
            impedit, quam unde.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            ullam, possimus id quia, sapiente quis ab autem nemo eveniet quo
            cupiditate sequi iste iure dignissimos accusantium minima doloribus
            officia, soluta nisi necessitatibus debitis provident. Libero rerum
            magni similique pariatur asperiores minus, rem numquam laborum sequi
            maiores illo ex necessitatibus tempore. Deserunt culpa assumenda
            officia facilis laboriosam eos laborum dicta! Quos quis tempora
            quidem laboriosam. Quia eaque nihil nemo omnis dicta debitis unde ea
            alias, blanditiis consequuntur quidem nulla molestias ratione ex
            vel! Sint deleniti ipsam voluptas voluptatibus, hic dolores
            aspernatur voluptate optio rem laudantium deserunt quibusdam magni
            impedit, quam unde.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            ullam, possimus id quia, sapiente quis ab autem nemo eveniet quo
            cupiditate sequi iste iure dignissimos accusantium minima doloribus
            officia, soluta nisi necessitatibus debitis provident. Libero rerum
            magni similique pariatur asperiores minus, rem numquam laborum sequi
            maiores illo ex necessitatibus tempore. Deserunt culpa assumenda
            officia facilis laboriosam eos laborum dicta! Quos quis tempora
            quidem laboriosam. Quia eaque nihil nemo omnis dicta debitis unde ea
            alias, blanditiis consequuntur quidem nulla molestias ratione ex
            vel! Sint deleniti ipsam voluptas voluptatibus, hic dolores
            aspernatur voluptate optio rem laudantium deserunt quibusdam magni
            impedit, quam unde.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            ullam, possimus id quia, sapiente quis ab autem nemo eveniet quo
            cupiditate sequi iste iure dignissimos accusantium minima doloribus
            officia, soluta nisi necessitatibus debitis provident. Libero rerum
            magni similique pariatur asperiores minus, rem numquam laborum sequi
            maiores illo ex necessitatibus tempore. Deserunt culpa assumenda
            officia facilis laboriosam eos laborum dicta! Quos quis tempora
            quidem laboriosam. Quia eaque nihil nemo omnis dicta debitis unde ea
            alias, blanditiis consequuntur quidem nulla molestias ratione ex
            vel! Sint deleniti ipsam voluptas voluptatibus, hic dolores
            aspernatur voluptate optio rem laudantium deserunt quibusdam magni
            impedit, quam unde.
          </p>
        </div>
        {/* Menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              {data.user.img && (
                <Image
                  src={data.user.img}
                  className="w-12 h-12 rounded-full object-cover"
                  width="48"
                  height="48"
                />
              )}
              <Link className="text-blue-800">{data.user.username}</Link>
            </div>
            <p className="text-sm text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="flex gap-2">
              <Link>
                <Image src="facebook.svg" />
              </Link>
              <Link>
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuActions />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="" className="underline">
              All
            </Link>
            <Link to="" className="underline">
              Web Design
            </Link>
            <Link to="" className="underline">
              Development
            </Link>
            <Link to="" className="underline">
              Databases
            </Link>
            <Link to="" className="underline">
              Search Engines
            </Link>
            <Link to="" className="underline">
              Marketing
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data.post._id} />
    </div>
  );
}
