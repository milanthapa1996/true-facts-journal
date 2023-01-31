import React from "react";
import Image from "next/image";
import urlFor from "../lib/urlFor";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <div className="flex flex-col group cursor-pointer">
      <div className="relative w-full h-64 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
        <Image
          className="object-cover object-center lg:object-center rounded-lg"
          src={urlFor(post.mainImage).url()}
          alt={post.author.name}
          fill
        />
        <div className="absolute bottom-0 w-full bg-opacity-20 bg-black backdrop-blur-sm  rounded drop-shadow-lg text-white p-5">
          <div className="mb-1">
            <p className="font-bold text-xs">{post.title}</p>
            <p className="text-xs text-gray-300">
              {new Date(post._createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-2 items-start">
            {post.categories.map((category, index) => (
              <div className="bg-sky-700 text-white p-1 rounded-sm text-xs" key={index}>
                <p>{category.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 flex-1">
        <p className="underline text-sm font-bold line-clamp-2 dark:text-gray-200">{post.title}</p>
        <p className="line-clamp-2 text-gray-700 dark:text-gray-300 text-xs mt-1">{post.metaDescription}</p>
      </div>
    </div>
  );
};

export default PostCard;