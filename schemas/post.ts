import slug from "slugify";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  groups: [
    {
      name: "general",
      title: "General",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "Slugs are unique",
      type: "slug",
      options: {
        source: "title",
        slugify: (input: string) => slug(input, { lower: true }),
      },
      validation: (Rule) => Rule.required(),
      group: "general",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      description: "Select author for post",
      to: [{ type: "author" }],
      group: "general",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "general",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      group: "general",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      description:
        "You can use this field to schedule post where you show them",
      type: "datetime",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "openGraphTitle",
      title: "Open Graph Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "openGraphDescription",
      title: "Open Graph Description",
      type: "text",
      group: "seo",
    }),
    defineField({
      name: "openGraphURL",
      title: "Open Graph URL",
      type: "url",
      group: "seo",
    }),
    defineField({
      name: "openGraphImage",
      title: "Open Graph Image",
      type: "image",
      description: "Ideal size for open graph images is 1200 x 600",
      options: {
        hotspot: true,
      },
      group: "seo",
    }),
    defineField({
      name: "excerpt",
      type: "text",
      title: "Excerpt",
      description: "Summary when people share your post in social media.",
      group: "seo",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "keywords",
      type: "array",
      title: "Keywords",
      description: "Tags for your post",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      group: "seo",
    }),
  ],
  initialValue: () => ({
    publishedAt: new Date().toISOString(),
  }),
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
