import React from 'react'

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string'
    },
    {
      name: 'color',
      title: 'Color',
      type: 'color'
    }
  ],

  preview: {
    select: {
      title: 'label',
      color: 'color'
    },
    prepare({ color, title }) {
      return {
        title: title,
        media: <div style={{ height: '1.5em', width: '1.5em', borderRadius: '50%', background: color.hex }}></div>
      }
    }
  }
}
