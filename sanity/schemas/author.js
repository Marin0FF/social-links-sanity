import preview from "part:sanity-plugin-icon-picker/preview";
import extractDomain from '../utils/extractDomain';

export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    },
    // Array of social media links
    {
      title: 'Social media links',
      name: 'socials',
      type: 'array',
      of: [
        {
          title: 'social media link',
          type: 'object',
          fields: [
            {
              // Icon picker plugin
              title: "Icon",
              name: "icon",
              type: "iconPicker",
              options: {
                providers: ["fa"], // use only font awesome icons
                outputFormat: 'react', // output in a format understandable to React
            }
            },
            {
              // Stores the social media url
              name: 'link',
              type: 'url'
            },
          ],
          // Custom preview of stored items
          preview: {
            select: {
              provider: "icon.provider",
              name: "icon.name",
              title: 'link',
            },
            prepare(socialLink) {
              return {
                title: extractDomain(socialLink.title),
                media: preview(socialLink),
              };
            },
          },
        }
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}
