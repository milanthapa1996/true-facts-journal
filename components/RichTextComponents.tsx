import Image from "next/image";
import Link from "next/link";
import urlFor from "../lib/urlFor";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full h-96 m-4 mx-auto">
          <Image
            className="object-contain"
            src={urlFor(value).url()}
            alt="Blog Post Image"
            fill
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-10 py-5 list-disc space-y-5 marker:text-sky-400">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mt-lg list-decimal">{children}</ol>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl py-4 font-bold dark:text-gray-200 pr-2">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl py-4 font-semibold dark:text-gray-200 pr-2">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl py-4 font-semibold dark:text-gray-200 pr-2">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg py-4 font-semibold dark:text-gray-200 pr-2">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-sm font-normal pr-2 text-gray-700 dark:text-gray-200 text-justify selection:bg-sky-400/30 selection:text-sky-600">{children}</p>
    ),

    blockquote: ({ children }: any) => (
      <blockquote className="border-l-[#8F00FF] border-l-4 pl-5 py-5 my-5">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noopener noreferrer"
        : undefined;

      return (
        <Link
          href={value.href}
          rel={rel}
          className="underline decoreration-[#8F00FF] hover:decoration-black"
        >
          {children}
        </Link>
      );
    },
  },
};