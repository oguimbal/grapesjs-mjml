// Specs: https://mjml.io/documentation/#mjml-wrapper

export default (editor, {
  dc, defaultModel, defaultView, coreMjmlModel, coreMjmlView
}) => {
  const type = 'mj-wrapper';

  dc.addType(type, {


    model: defaultModel.extend({ ...coreMjmlModel,

      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Wrapper',
        draggable: '[data-type=mj-container]',
        droppable: '[data-type=mj-section]',
        'style-default': {
          'padding-top': '10px',
          'padding-bottom': '10px',
          'vertical-align': 'top',
          'text-align': 'center',
        },
        stylable: [
          'vertical-align', 'text-align',
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
          'background-color', 'background-url', 'background-repeat', 'background-size',
          'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
          'border', 'border-width', 'border-style', 'border-color'
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
        style: 'pointer-events: all;',
        'data-type': 'mj-wrapper',
      },

      getChildrenSelector() {
        return 'tbody > tr > td';
      },

      init() {
        coreMjmlView.init.call(this);
        this.listenTo(this.model.get('components'), 'add remove', this.render);
      },
    }),
  });
}
