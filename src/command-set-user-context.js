export default (editor, opt = {}) => {

  let config = editor.getConfig();
  let codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
  let btnImp = document.createElement('button');
  let container = document.createElement('div');
  let pfx = config.stylePrefix || '';
  let selected = null;

  // Init edit button
  btnImp.innerHTML = 'Save';
  btnImp.className = pfx + 'btn-prim ' + pfx + 'btn-edit';
  btnImp.style.marginTop = '10px';
  btnImp.style.float = 'right';
  btnImp.onclick = () => {
    let code = codeViewer.editor.getValue() || '';
    try {
      const userContext = JSON.parse(code);
      opt.saveUserContext && opt.saveUserContext(userContext, function() {
        opt.userContext = userContext;
        editor.Modal.close();
      }, function(error) {
        alert(error.message);
      });
    }
    catch(e) {
      console.error(e);
      alert(e.message);
      return;
    }
  };

  // Init code viewer
  codeViewer.set({
    codeName: 'application/json',
    theme: opt.codeViewerTheme,
    readOnly: 0
  });

  return {

    run(editor, sender = {}) {
      selected = editor.getSelected();
      let modal = editor.Modal;
      let modalContent = modal.getContentEl();
      let viewer = codeViewer.editor;
      modal.setTitle('Edit User Context');

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
      codeViewer.setContent(JSON.stringify(opt.userContext, null, 4));
      modal.open();
      viewer.refresh();
      sender.set && sender.set('active', 0);
    },

  }
}
