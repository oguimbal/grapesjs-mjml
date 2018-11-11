// Specs: https://mjml.io/documentation/#mjml-hero

export default (editor, {
  dc, opt, defaultModel, defaultView, coreMjmlModel, coreMjmlView
}) => {
  const type = 'mj-hero-content';
  const clmPadd = opt.columnsPadding;

  dc.addType(type, {


    model: defaultModel.extend({ ...coreMjmlModel,

      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Hero Content',
        draggable: '[data-type=mj-hero]',
        'style-default': {
          'padding-top': '10px',
          'padding-bottom': '10px',
        },
        stylable: [
          'align', 'width',
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
          'background-color',
        ],
      },
    },{

      isComponent(el) {
        if (el.tagName == type.toUpperCase()) {
          return { type };
        }
      },
    }),


    view: defaultView.extend({ ...coreMjmlView,

      tagName: 'div',

      attributes: {
        style: 'pointer-events: all;' +
          (clmPadd ? `padding: ${clmPadd};` : ''),
        'data-type': 'mj-hero-content',
      },

      getChildrenSelector() {
        return 'tbody > tr > td';
      },

      getTemplateFromEl(sandboxEl) {
        return sandboxEl.querySelector('div').innerHTML;
      },

      init() {
        coreMjmlView.init.call(this);
        this.listenTo(this.model.get('components'), 'add remove', this.render);
      },
    }),
  });
}
