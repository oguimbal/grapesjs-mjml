// Specs: https://mjml.io/documentation/#mjml-hero

export default (editor, {
  dc, opt, defaultModel, defaultView, coreMjmlModel, coreMjmlView
}) => {
  const type = 'mj-hero';
  const clmPadd = opt.columnsPadding;

  dc.addType(type, {


    model: defaultModel.extend({ ...coreMjmlModel,

      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Hero',
        draggable: '[data-type=mj-container]',
        droppable: '[data-type=mj-hero-content]',
        'style-default': {
          'padding-top': '10px',
          'padding-bottom': '10px',
          'vertical-align': 'top',
        },
        stylable: [
          'vertical-align', 'width', 'height',
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
          'background-color', 'background-url', 'background-repeat', 'background-size',
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
        'data-type': 'mj-hero',
        'mode': 'fixed-height',
      },

      getChildrenSelector() {
        return 'div';
      },

      getInnerMjmlTemplate() {
        let orig = coreMjmlView.getInnerMjmlTemplate.call(this);
        return {
          start: `${orig.start}<mj-hero-content></mj-hero-content>`,
          end: `${orig.end}`,
        };
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
