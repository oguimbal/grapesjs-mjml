export default (editor, opt = {}) => {

  let config = editor.getConfig();
  let codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
  let btnImp = document.createElement('button');
  let container = document.createElement('div');
  let pfx = config.stylePrefix || '';
  let userBlockName = '';
  let nameInput = document.createElement('input');

  // Init edit button
  btnImp.innerHTML = opt.modalBtnEdit;
  btnImp.className = pfx + 'btn-prim ' + pfx + 'btn-edit';
  btnImp.style.marginTop = '10px';
  btnImp.style.float = 'right';
  btnImp.onclick = () => {
    if(!userBlockName) {
      alert('Block name is required');
      return;
    }
    let code = codeViewer.editor.getValue();
    const userBlock = {
      name: userBlockName,
      content: code,
    };
    opt.saveUserBlock && opt.saveUserBlock(userBlock, function() {
      opt.userBlocks.push(userBlock);
      const bm = editor.BlockManager;
      bm.add(`mj-user-${userBlock.name}`, {
        label: userBlock.name,
        content: userBlock.content,
        attributes: { class: 'fa fa-user' },
        category: 'User',
      });
      nameInput.value = '';
      editor.Modal.close();
    }, function(error) {
      alert(error.message);
    });
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
      modal.setTitle('Save As User Block');

      // Init code viewer if not yet instantiated
      if (!viewer) {
        let nameLabel = document.createElement('div');
        nameLabel.className = pfx + 'name-label';
        nameLabel.innerHTML = "Block Name";
        container.appendChild(nameLabel);

        nameInput.className = pfx + 'name-input';
        nameInput.style = 'width: 100%; margin: 5px 0; box-sizing: border-box;';
        nameInput.addEventListener('change', e => {
          userBlockName = e.target.value;
        });
        container.appendChild(nameInput);

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
      codeViewer.setContent(editor.getSelected().toHTML());
      modal.open();
      viewer.refresh();
      sender.set && sender.set('active', 0);
    },

  }
}
