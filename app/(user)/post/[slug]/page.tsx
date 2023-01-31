import { groq } from "next-sanity";
import Image from "next/image";
import { client } from "../../../../lib/sanity.client";
import urlFor from "../../../../lib/urlFor";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "../../../../components/RichTextComponents";
import Link from "next/link";
import { ChevronDoubleLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;

export async function generateStaticParams() {
  const query = groq`
		*[_type == "post"]
		{
			slug
		}
		`;

  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({
    slug,
  }));
}

async function Post({ params: { slug } }: Props) {
  const query = groq`
		*[_type == "post" && slug.current == $slug][0] {
			...,
			author->,
			categories[]->,
		}
	`;

  const post: Post = await client.fetch(query, { slug });


  const categoryList = [
    {
      name: "History",
      slug: "/category/history",
    },
    {
      name: "Science",
      slug: "/category/science",
    },
    {
      name: "Technology",
      slug: "/category/technology",
    },
    {
      name: "Art",
      slug: "/category/art",
    },
    {
      name: "Music",
      slug: "/category/music",
    }
  ]

  return (
    <article className="px-10 pb-28">
      <Link href="/" className="relative inline-block text-lg group mb-10 mt-6 md:mt-10">
        <span className="relative z-10 block px-2  py-1 border-2 border-gray-900 rounded-lg dark:border-gray-300">

          <span className="relative flex justify-center items-center">
            <ChevronDoubleLeftIcon className="w-4 h-4 text-gray-900 dark:text-gray-300" />
          </span>
        </span>
      </Link>

      <section className="scace-y-2 border border-[#cdb6b5] text-white">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            <Image
              className="object-cover object-center mx-auto"
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>

          <section className="p-5 bg-[#4c8fc0] w-full">
            <div className="flex flex-col md:flex-row justify-between gap-y-4">
              <div>
                <h1 className="text-lg md:text-xl lg:text-3xl font-extrabold">{post.title}</h1>
                <p className="text-sm md:text-lg text-gray-200">
                  {new Date(post._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  height={40}
                  width={40}
                />

                <div className="w-64">
                  <h3 className="text-lg font-bold">{post.author.name}</h3>
                </div>
              </div>
            </div>

            <div>
              <h2 className="italic pt-10">{post.description}</h2>
              <div className="flex items-center justify-end mt-auto space-x-2">
                {post.categories.map((category) => (
                  <p
                    key={category._id}
                    className="bg-sky-700 text-white px-3 py-1 rounded-lg text-sm font-semibold mt-4"
                  >
                    {category.title}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
      <div className="mt-4 flex">
        {/* create sidebar and content */}
        <section className="w-full lg:w-[60%]">
          <PortableText value={post.body} components={RichTextComponents} />
        </section>
        <aside className="hidden lg:flex lg:w-[40%]  flex-col items-center space-y-4 border">
          <div className="w-[80%] mt-4">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
              <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for articles..." type="text" name="search" />
            </label>

          </div>
          <div className="w-[80%]">

            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <svg className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd"></path><path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path></svg>
              <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need a help in Claim?</h5>
              </a>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
              <a href="#" className="inline-flex items-center text-blue-600 hover:underline">
                See our guideline
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
              </a>
            </div>
          </div>
          <div className="w-[80%] p-4 my-8 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold underline underline-offset-8 decoration-2 decoration-[#DC3933] mb-2">Categories</h3>
            <ul role="list" className="divide-y divide-slate-200 text-slate-500 list-decimal">
              {
                categoryList.map((category, index) => (
                  <li key={index} className="py-4 flex items-center space-x-4">
                    <Link href={category.slug}>
                      <p className="text-sm font-blod">{category.name}</p>
                    </Link>
                  </li>
                ))
              }
            </ul>
            <div className="flex justify-end">
              <Link href="/categories">
                <p className="inline-flex items-center text-blue-600 hover:underline">
                  View all
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                </p>
              </Link>
            </div>

          </div>
          <div className="w-[80%] p-4 my-8 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold underline underline-offset-8 decoration-2 decoration-[#DC3933] mb-4">Recent Posts</h3>
            <ul role="list" className="space-y-4 divide-y divide-slate-200 list-disc">
              {
                categoryList.map((category, index) => (
                  <li className="group/item hover:bg-slate-100 flex justify-between items-center cursor-pointer group" key={index}>
                    <div className="flex">
                      <img src="https://picsum.photos/200" alt="post image" className="w-16 h-16" />
                      <div className="ml-4">
                        <h1 className="text-slate-700 font-medium">15  Facts of Nepal</h1>
                        <span className="text-slate-500 text-sm">January 1, 2023</span>
                      </div>
                    </div>
                    <div className="bg-sky-400/10 text-sky-600 mr-3 px-3 py-1 rounded-2xl text-sm hidden group-hover:block">
                      <Link
                        href="/posts/[slug]"
                        as={`/posts/${category.slug}`}
                      >
                        View
                      </Link>
                    </div>
                  </li>
                ))
              }
            </ul>
            <div className="flex justify-end">
              <Link href="/posts">
                <p className="inline-flex items-center text-blue-600 hover:underline">
                  View all
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                </p>
              </Link>
            </div>

          </div>
          <div className="w-[80%]">
            <div className="p-4 my-8 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700" aria-label="Subscribe to the Flowbite newsletter">
              <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">Get more updates...</h3>
              <p className="mb-5 text-sm font-medium text-gray-500 dark:text-gray-300">Do you want to get notified when a new component is added to Flowbite? Sign up for our newsletter and you'll be among the first to find out about new features, components, versions, and tools.</p>
              <script src="https://f.convertkit.com/ckjs/ck.5.js"></script>
              <form action="https://app.convertkit.com/forms/4692392/subscriptions" className="seva-form formkit-form" method="post" data-sv-form="4692392" data-uid="344e3b5c48" data-format="inline" data-version="5" data-options="{&quot;settings&quot;:{&quot;after_subscribe&quot;:{&quot;action&quot;:&quot;message&quot;,&quot;success_message&quot;:&quot;Success! Now check your email to confirm your subscription.&quot;,&quot;redirect_url&quot;:&quot;&quot;},&quot;analytics&quot;:{&quot;google&quot;:null,&quot;fathom&quot;:null,&quot;facebook&quot;:null,&quot;segment&quot;:null,&quot;pinterest&quot;:null,&quot;sparkloop&quot;:null,&quot;googletagmanager&quot;:null},&quot;modal&quot;:{&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;powered_by&quot;:{&quot;show&quot;:true,&quot;url&quot;:&quot;https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic&quot;},&quot;recaptcha&quot;:{&quot;enabled&quot;:false},&quot;return_visitor&quot;:{&quot;action&quot;:&quot;show&quot;,&quot;custom_content&quot;:&quot;&quot;},&quot;slide_in&quot;:{&quot;display_in&quot;:&quot;bottom_right&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;sticky_bar&quot;:{&quot;display_in&quot;:&quot;top&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15}},&quot;version&quot;:&quot;5&quot;}" min-width="400 500 600 700">
                <div data-style="clean" className="flex items-end mb-3">
                  <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
                  <div data-element="fields" data-stacked="false" className="seva-fields formkit-fields flex items-center mb-3 w-full max-w-md">
                    <div className="formkit-field relative w-full mr-3">
                      <label className="hidden block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                      </div>
                      <input id="member_email" className="formkit-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="email_address" aria-label="Email Address" placeholder="Your email address..." required type="email" />
                    </div>
                    <button data-element="submit" className="formkit-submit formkit-submit">
                      <div className="formkit-spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <span className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Subscribe</span>
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">By subscribing, you agree with ConvertKit's <a rel="nofollow" href="https://convertkit.com/terms" className="text-blue-600 hover:underline dark:text-blue-500">Terms of Service</a> and <a rel="nofollow" className="text-blue-600 hover:underline dark:text-blue-500" href="https://convertkit.com/privacy">Privacy Policy</a>.</div>
            </div>
          </div>


        </aside>
      </div>
    </article>
  );
}

export default Post;