export default (editor, opt = {}) => {

  let config = editor.getConfig();
  let codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
  let btnImp = document.createElement('button');
  let container = document.createElement('div');
  let pfx = config.stylePrefix || '';

  // Init edit button
  btnImp.innerHTML = opt.modalBtnEdit;
  btnImp.className = pfx + 'btn-prim ' + pfx + 'btn-edit';
  btnImp.style.marginTop = '10px';
  btnImp.style.float = 'right';
  btnImp.onclick = () => {
    let code = codeViewer.editor.getValue();
    editor.DomComponents.getWrapper().set('content', '');
    editor.setComponents(code.trim());
    editor.Modal.close();
  };

  // Init code viewer
  codeViewer.set({
    codeName: 'htmlmixed',
    theme: opt.codeViewerTheme,
    readOnly: opt.readOnly,
  });

  return {

    run(editor, sender = {}) {
      let modal = editor.Modal;
      let modalContent = modal.getContentEl();
      let viewer = codeViewer.editor;
      modal.setTitle(opt.readOnly ? 'View MJML' : 'Edit MJML');

      // Init code viewer if not yet instantiated
      if (!viewer) {
        let txtarea = document.createElement('textarea');
        let labelEdit = opt.modalLabelEdit;
        if (labelEdit) {
          let labelEl = document.createElement('div');
          labelEl.className = pfx + 'edit-label';
          labelEl.innerHTML = labelEdit;
          container.appendChild(labelEl);
        }
        container.appendChild(txtarea);
        if(!opt.readOnly) {
          container.appendChild(btnImp);
        }
        codeViewer.init(txtarea);
        viewer = codeViewer.editor;
      }

      modal.setContent('');
      modal.setContent(container);
      codeViewer.setContent(opt.preMjml + editor.getHtml()  + opt.postMjml);
      modal.open();
      viewer.refresh();
      sender.set && sender.set('active', 0);
    },

  }
}
