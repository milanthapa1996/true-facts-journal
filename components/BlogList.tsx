"use client";
import { useState } from "react";
import ClientSideRoute from "./ClientSideRoute";
import PostCard from "./PostCard";

type Props = {
  posts: Post[];
};

const BlogList = ({ posts }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const handleClick = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const items = showAll ? posts : posts.slice(0, 4);

  return (
    <div className="relative z-0 mt-10">
      <h1 className="text-2xl px-10 mb-8 font-medium underline underline-offset-8 decoration-4 decoration-[#DC3933] text-gray-600">Recent Journal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 gap-10 gap-y-16 pb-24">
        {items.map((item) => (
          <ClientSideRoute
            route={`/post/${item.slug.current}`}
            key={item._id}
          >
            <PostCard post={item} />
          </ClientSideRoute>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="px-2 py-3 text-sm md:text-base bg-[#DC3933] text-[#FFF] hover:bg-[#c92f2a] flex items-center rounded-lg text-center"
          onClick={handleClick}
        >
          {showAll ? "All articles loaded" : "Load More Articles"}
        </button>
      </div>
    </div>
  );
};

export default BlogList;