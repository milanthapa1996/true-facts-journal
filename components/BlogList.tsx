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
      <h1 className="text-2xl px-10 mb-8 font-bold underline underline-offset-8 decoration-4 decoration-sky-500 text-gray-600 dark:text-gray-200">Recent Journal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-10 gap-6 gap-y-8 pb-24">
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
          className="px-4 py-3 text-sm md:text-base bg-sky-400/30 text-sky-600 hover:bg-sky-400/40 flex items-center rounded-3xl text-center hover:scale-105 transition-all duration-300"
          onClick={handleClick}
        >
          {showAll ? "All articles loaded" : "Load More Articles"}
        </button>
      </div>
    </div>
  );
};

export default BlogList;