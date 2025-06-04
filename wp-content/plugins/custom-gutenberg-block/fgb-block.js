(() => {
  const { registerBlockType } = wp.blocks;
  const { MediaUpload, RichText } = wp.blockEditor;
  const { Button } = wp.components;
  const { Fragment } = wp.element;

  registerBlockType('custom/feature-grid', {
    title: 'Feature Grid',
    icon: 'screenoptions',
    category: 'common',
    attributes: {
      features: {
        type: 'array',
        default: [],
        source: 'query',
        selector: '.feature-item',
        query: {
          iconUrl: { type: 'string', source: 'attribute', selector: 'img', attribute: 'src' },
          title: { type: 'string', source: 'html', selector: 'h3' },
          description: { type: 'string', source: 'html', selector: 'p' },
        },
      },
    },

    edit: ({ attributes, setAttributes }) => {
      const { features } = attributes;

      const addFeature = () => {
        setAttributes({
          features: [...features, { iconUrl: '', title: '', description: '' }],
        });
      };

      const updateFeature = (index, key, value) => {
        const newFeatures = [...features];
        newFeatures[index][key] = value;
        setAttributes({ features: newFeatures });
      };

      const removeFeature = (index) => {
        const newFeatures = [...features];
        newFeatures.splice(index, 1);
        setAttributes({ features: newFeatures });
      };

      return (
        wp.element.createElement(Fragment, {},
          features.map((item, index) =>
            wp.element.createElement('div', { className: 'feature-item-editor', key: index },
              wp.element.createElement(MediaUpload, {
                onSelect: (media) => updateFeature(index, 'iconUrl', media.url),
                allowedTypes: ['image'],
                render: ({ open }) => wp.element.createElement(Button, { onClick: open, isSecondary: true },
                  item.iconUrl ? wp.element.createElement('img', { src: item.iconUrl, style: { width: 60 } }) : 'Upload Icon'
                ),
              }),
              wp.element.createElement(RichText, {
                tagName: 'h3',
                placeholder: 'Title',
                value: item.title,
                onChange: (val) => updateFeature(index, 'title', val),
              }),
              wp.element.createElement(RichText, {
                tagName: 'p',
                placeholder: 'Description',
                value: item.description,
                onChange: (val) => updateFeature(index, 'description', val),
              }),
              wp.element.createElement(Button, { isDestructive: true, onClick: () => removeFeature(index) }, 'Remove')
            )
          ),
          wp.element.createElement(Button, { isPrimary: true, onClick: addFeature }, 'Add Feature')
        )
      );
    },

    save: ({ attributes }) => {
      return wp.element.createElement('div', { className: 'wp-block-custom-testimonial-slider feature-grid' },
        attributes.features.map((item, index) =>
          wp.element.createElement('div', { className: 'feature-item', key: index },
            item.iconUrl && wp.element.createElement('img', { src: item.iconUrl, alt: item.title }),
            wp.element.createElement('h3', null, item.title),
            wp.element.createElement('p', null, item.description)
          )
        )
      );
    },
  });
})();
