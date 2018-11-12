export default (editor, opt = {}) => {
  let bm = editor.BlockManager;

  if (opt.resetBlocks) {
    bm.getAll().reset();
  }

  if(opt.readOnly) {
    return;
  }

  const allBlocks = {
    category: 'Basic',
  };

  const userBlocks = {
    category: 'User',
  };

  bm.add('mj-1-column', {
    label: '1 Column',
    content: `<mj-section>
        <mj-column><mj-text>Content 1</mj-text></mj-column>
      </mj-section>`,
    attributes: { class: 'gjs-fonts gjs-f-b1' },
    ...allBlocks,
  });

  bm.add('mj-2-columns', {
    label: '2 Columns',
    content: `<mj-section>
        <mj-column><mj-text>Content 1</mj-text></mj-column>
        <mj-column><mj-text>Content 2</mj-text></mj-column>
      </mj-section>`,
    attributes: { class: 'gjs-fonts gjs-f-b2' },
    ...allBlocks,
  });

  bm.add('mj-3-columns', {
    label: '3 Columns',
    content: `<mj-section>
        <mj-column><mj-text>Content 1</mj-text></mj-column>
        <mj-column><mj-text>Content 2</mj-text></mj-column>
        <mj-column><mj-text>Content 3</mj-text></mj-column>
      </mj-section>`,
    attributes: { class: 'gjs-fonts gjs-f-b3' },
    ...allBlocks,
  });

  bm.add('mj-text', {
    label: 'Text',
    content: '<mj-text>Insert text here</mj-text>',
    attributes: { class: 'gjs-fonts gjs-f-text' },
    ...allBlocks,
  });

  bm.add('mj-button', {
    label: 'Button',
    content: '<mj-button>Button</mj-button>',
    attributes: { class: 'gjs-fonts gjs-f-button' },
    ...allBlocks,
  });

  bm.add('mj-image', {
    label: 'Image',
    content: '<mj-image src="http://placehold.it/350x250/78c5d6/fff">',
    attributes: { class: 'fa fa-image' },
    ...allBlocks,
  });

  bm.add('mj-divider', {
    label: 'Divider',
    content: '<mj-divider/>',
    attributes: { class: 'gjs-fonts gjs-f-divider'},
    ...allBlocks,
  });

  bm.add('mj-social', {
    label: 'Social',
    content: '<mj-social/>',
    attributes: { class: 'fa fa-share-alt' },
    ...allBlocks,
  });

  bm.add('mj-spacer', {
    label: 'Spacer',
    content: '<mj-spacer/>',
    attributes: { class: 'fa fa-arrows-v' },
    ...allBlocks,
  });

  bm.add('mj-location', {
    label: 'Location',
    content: '<mj-location/>',
    attributes: { class: 'fa fa-map' },
    ...allBlocks,
  });

  /**
  bm.add('mj-wrapper', {
    label: 'Wrapper',
    content: `<mj-wrapper></mj-wrapper>`,
    attributes: { class: 'gjs-fonts gjs-f-b1' },
    ...allBlocks,
  });
  */

  bm.add('mj-raw', {
    label: 'Raw',
    content: '<mj-raw>Insert html here</mj-raw>',
    attributes: { class: 'fa fa-code' },
    ...allBlocks,
  });

  bm.add('mj-hero', {
    label: 'Hero',
    content: '<mj-hero background-url="http://placehold.it/350x250/78c5d6/fff"><mj-hero-content><mj-text>Sample Text</mj-text></mj-hero-content></mj-hero>',
    attributes: { class: 'fa fa-image' },
    ...allBlocks,
  });

  if(opt.userBlocks) {
    opt.userBlocks.forEach(block => {
      bm.add(`mj-user-${block.name}`, {
        label: block.name,
        content: block.content,
        attributes: { class: 'fa fa-user' },
        ...userBlocks,
      });
    });
  }
}
