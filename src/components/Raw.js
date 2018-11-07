// Specs: https://mjml.io/documentation/#mjml-raw

export default (editor, {
  dc, opt, defaultModel, defaultView, coreMjmlModel, coreMjmlView
}) => {
  const type = 'mj-raw';

  let $el = null;
  let config = editor.getConfig();
  let codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
  let btnImp = document.createElement('button');
  let container = document.createElement('div');
  let pfx = config.stylePrefix || '';
  btnImp.innerHTML = 'Save';
  btnImp.className = pfx + 'btn-prim ' + pfx + 'btn-edit';
  btnImp.style.marginTop = '10px';
  btnImp.style.float = 'right';
  btnImp.onclick = () => {
    let code = codeViewer.editor.getValue();
    $el && $el.html(code);
    editor.Modal.close();
  };
  codeViewer.set({
   codeName: 'htmlmixed',
   theme: opt.codeViewerTheme,
   readOnly: 0
  });

  dc.addType(type, {


    model: defaultModel.extend({ ...coreMjmlModel,

      defaults: { ...defaultModel.prototype.defaults,
        'custom-name': 'Raw',
        draggable: '[data-type=mj-column]',
        droppable: false,
        stylable: [],
      },

      toHTML() {
        let tagName = this.get('tagName');

        return `<${tagName}>${this.view.$el.html()}</${tagName}>`;
      },
    },{

      isComponent(el) {
        if (el.tagName == type.toUpperCase()) {
          return { type };
        }
      },
    }),


    view: defaultView.extend({ ...coreMjmlView,

      tagName: 'tr',

      events: {
        dblclick: 'enableEditing',
      },

      attributes: {
        style: 'pointer-events: all; display: table; width: 100%;',
      },

      getMjmlTemplate() {
        return {
          start: `<mjml><mj-body><mj-column>`,
          end: `</mj-column></mj-body></mjml>`,
        };
      },

      enableEditing(e) {
        let modal = editor.Modal;
        $el = this.$el;
        let modalContent = $el.html();
        let viewer = codeViewer.editor;
        modal.setTitle('Edit Raw HTML');

        // Init code viewer if not yet instantiated
        if (!viewer) {
          let txtarea = document.createElement('textarea');
          container.appendChild(txtarea);
          container.appendChild(btnImp);
          codeViewer.init(txtarea);
          viewer = codeViewer.editor;
        }

        modal.setContent('');
        modal.setContent(container);
        codeViewer.setContent(modalContent);
        modal.open();
        viewer.refresh();
      }
    }),
  });
}