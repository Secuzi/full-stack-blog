import Image from "./Image";

export default function Comment() {
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      {/* User Info */}
      <div className="flex items-center gap-4">
        <Image
          src="userImg.jpeg"
          className="w-10 h-10 rounded-full object-cover"
          width="40"
        />
        <span className="font-medium">John Doe</span>
        <span className="text-sm text-gray-500">2 days ago</span>
      </div>

      {/* Description */}
      <div className="mt-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
          laboriosam labore nemo harum eius quia recusandae officia aliquid,
          omnis nesciunt placeat corrupti quasi voluptatibus dolore, architecto
          vitae nostrum minima voluptates.
        </p>
      </div>
    </div>
  );
}
