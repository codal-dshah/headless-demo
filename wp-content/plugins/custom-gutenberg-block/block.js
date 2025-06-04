const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload } = wp.blockEditor;
const { createElement, Fragment } = wp.element;
const { Button } = wp.components;

registerBlockType('custom/block', {
    title: 'Custom Block',
    icon: 'admin-site',
    category: 'common',
    attributes: {
        content: { type: 'string', source: 'html', selector: 'div' },
        imageUrl: { type: 'string', default: '' },
        editorContent: { type: 'string', source: 'html', selector: 'p' }
    },
    
    edit: ({ attributes, setAttributes }) => 
        createElement(Fragment, null, 
            createElement(RichText, {
                tagName: "div",
                value: attributes.content,
                onChange: (content) => setAttributes({ content }),
                placeholder: "Enter some text..."
            }),

            createElement(MediaUpload, {
                onSelect: (media) => setAttributes({ imageUrl: media.url }),
                allowedTypes: ['image'],
                render: ({ open }) => 
                    createElement('div', null, 
                        attributes.imageUrl ? 
                            createElement('img', { src: attributes.imageUrl, style: { width: "100%" } }) : 
                            createElement(Button, { onClick: open, isPrimary: true }, "Select Image")
                    )
            }),

            createElement(RichText, {
                tagName: "p",
                value: attributes.editorContent,
                onChange: (editorContent) => setAttributes({ editorContent }),
                placeholder: "Enter detailed description..."
            })
        ),

    save: ({ attributes }) => 
        createElement('div', null, 
            createElement('div', null, attributes.content),
            attributes.imageUrl && createElement('img', { src: attributes.imageUrl, style: { width: "100%" } }),
            createElement('p', null, attributes.editorContent)
        )
});
