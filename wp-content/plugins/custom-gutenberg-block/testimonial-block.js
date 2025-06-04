(() => {
    const { registerBlockType } = wp.blocks;
    const { RichText, MediaUpload } = wp.blockEditor;
    const { createElement, Fragment } = wp.element;
    const { Button } = wp.components;

    registerBlockType('custom/testimonial-slider', {
        title: 'Testimonial Slider',
        icon: 'format-quote',
        category: 'common',
        attributes: {
            testimonials: {
                type: 'array',
                default: [],
                source: 'query',
                selector: '.testimonial-item',
                query: {
                    name: { type: 'string', source: 'text', selector: '.testimonial-name' },
                    quote: { type: 'string', source: 'html', selector: '.testimonial-quote' },
                    avatarUrl: { type: 'string', source: 'attribute', selector: 'img', attribute: 'src' },
                },
            },
        },

        edit: ({ attributes, setAttributes }) => {
            const { testimonials } = attributes;

            const addTestimonial = () => {
                const updated = [...testimonials, { name: '', quote: '', avatarUrl: '' }];
                setAttributes({ testimonials: updated });
            };

            const updateTestimonial = (val, idx, key) => {
                const updated = [...testimonials];
                updated[idx][key] = val;
                setAttributes({ testimonials: updated });
            };

            const removeTestimonial = (idx) => {
                const updated = [...testimonials];
                updated.splice(idx, 1);
                setAttributes({ testimonials: updated });
            };

            return createElement(Fragment, {},
                testimonials.map((t, i) =>
                    createElement('div', { className: 'testimonial-item-editor', key: i },
                        createElement(MediaUpload, {
                            onSelect: media => updateTestimonial(media.url, i, 'avatarUrl'),
                            allowedTypes: ['image'],
                            render: ({ open }) => createElement(Button, { onClick: open, isSecondary: true },
                                t.avatarUrl
                                    ? createElement('img', { src: t.avatarUrl, style: { width: 60, borderRadius: '50%' } })
                                    : 'Upload Image')
                        }),
                        createElement(RichText, {
                            tagName: 'div',
                            value: t.name,
                            placeholder: 'Enter Name',
                            className: 'testimonial-name',
                            onChange: val => updateTestimonial(val, i, 'name')
                        }),
                        createElement(RichText, {
                            tagName: 'blockquote',
                            value: t.quote,
                            placeholder: 'Enter Quote',
                            className: 'testimonial-quote',
                            onChange: val => updateTestimonial(val, i, 'quote')
                        }),
                        createElement(Button, { isDestructive: true, onClick: () => removeTestimonial(i) }, 'Remove')
                    )
                ),
                createElement(Button, { isPrimary: true, onClick: addTestimonial }, 'Add Testimonial')
            );
        },

        save: ({ attributes }) =>
            createElement('div', { className: 'wp-block-custom-testimonial-slider' },
                createElement('div', { className: 'testimonial-slider' },
                    attributes.testimonials.map((t, i) =>
                        createElement('div', { className: 'testimonial-item', key: i },
                            createElement('div', { className: 'testimonial-content' },
                                t.avatarUrl && createElement('img', { src: t.avatarUrl, alt: t.name }),
                                createElement('div', { className: 'text' },
                                    createElement('div', { className: 'testimonial-name' }, t.name),
                                    createElement('blockquote', { className: 'testimonial-quote', dangerouslySetInnerHTML: { __html: t.quote } })
                                )
                            )
                        )
                    )
                )
            )
    });
})();
