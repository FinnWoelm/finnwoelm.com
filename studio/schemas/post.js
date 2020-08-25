export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true
      }
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
    {
      name: 'teaser',
      title: 'Teaser',
      type: 'teaserContent',
      validation: Rule => Rule.required().max(140)
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: Rule => Rule.required()
    }
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'mainImage'
    },
  },

  orderings: [
    {
      title: 'Publication date',
      name: 'publicationDateDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    }
  ]
}
