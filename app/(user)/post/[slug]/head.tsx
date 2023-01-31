import { client } from "../../../../lib/sanity.client";
import { groq } from "next-sanity";
import urlFor from "../../../../lib/urlFor";


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


const Head = async ({ params: { slug } }: Props) => {

    const query = groq`
    *[_type == "post" && slug.current == $slug][0] {
        ...,
        author->,
        categories[]->,
    }
`;

    const post: Post = await client.fetch(query, { slug });
    // console.log(post.keywords);
    return (
        <>
            <title key="title">{`TFJ | ${post.title}`}</title>
            <meta name="description" content={`${post.metaDescription}`} />
            <meta name="keywords" content={`${post.keywords}`} />
            <meta name="robots" content="index, follow" />
            <meta name="revisit-after" content="7 days" />
            <meta name="language" content="English" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            {/* <!-- OpenGraph tags --> */}
            <meta property="og:title" content={`${post.openGraphTitle}`} />
            <meta property="og:description" content={`${post.openGraphDescription}`} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content="https://www.truefactsjournal.vercel.app/" />
            <meta property="og:image" content={`${post.openGraphImage
                ? urlFor(post.openGraphImage).url()
                : "https://res.cloudinary.com/duxolernw/image/upload/v1675161829/tfj_images/cover_fb_odqb9k.jpg"

                }`} />

            {/* <!-- Twitter cards --> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@true_f_journal" />
            <meta name="twitter:title" content={`${post.openGraphTitle}`} />
            <meta name="twitter:description" content={`${post.openGraphDescription}`} />
            <meta name="twitter:image" content={`${post.openGraphImage
                ? urlFor(post.openGraphImage).url()
                : "https://res.cloudinary.com/duxolernw/image/upload/v1675161829/tfj_images/cover_fb_odqb9k.jpg"

                }`} />


            <link rel="icon" href="/favicon.ico" />
        </>
    );
}

export default Head;