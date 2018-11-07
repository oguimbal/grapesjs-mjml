export default (editor, opt = {}) => {

  let config = editor.getConfig();
  let codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
  let btnImp = document.createElement('button');
  let container = document.createElement('div');
  let pfx = config.stylePrefix || '';
  let selected = null;

  function setAttr(key, value) {
    if(selected) {
      const attrs = selected.get('attributes') || {};
      selected.set('attributes', { ...attrs, [key]: value });
    }
  }

  function getAttr(key) {
    if(selected) {
      const attrs = selected.get('attributes') || {};
      return attrs[key] || '';
    }

    return '';
  }

  // Init edit button
  btnImp.innerHTML = 'Save';
  btnImp.className = pfx + 'btn-prim ' + pfx + 'btn-edit';
  btnImp.style.marginTop = '10px';
  btnImp.style.float = 'right';
  btnImp.onclick = () => {
    let code = codeViewer.editor.getValue() || '';
    code = code.replace(/"/g, "'");
    setAttr('data-repeat', code);
    editor.Modal.close();
  };

  // Init code viewer
  codeViewer.set({
    codeName: 'javascript',
    theme: opt.codeViewerTheme,
    readOnly: opt.readOnly
  });

  return {

    run(editor, sender = {}) {
      selected = editor.getSelected();
      let modal = editor.Modal;
      let modalContent = modal.getContentEl();
      let viewer = codeViewer.editor;
      modal.setTitle(opt.readOnly ? 'View Looping Code' : 'Edit Looping Code');

      // Init code viewer if not yet instantiated
      if (!viewer) {
        let txtarea = document.createElement('textarea');
        container.appendChild(txtarea);
        if(!opt.readOnly) {
          container.appendChild(btnImp);
        }
        codeViewer.init(txtarea);
        viewer = codeViewer.editor;
      }

      modal.setContent('');
      modal.setContent(container);
      codeViewer.setContent(getAttr('data-repeat'));
      modal.open();
      viewer.refresh();
      sender.set && sender.set('active', 0);
    },

  }
}
