export default (editor, opt = {}) => {

  let config = editor.getConfig();
  let pfx = config.stylePrefix || '';

  return {

    run(editor, sender = {}) {
      const code = opt.preMjml + editor.getHtml()  + opt.postMjml;

      function onSuccess() {
        let modal = editor.Modal;
        let modalContent = modal.getContentEl();
        modal.setTitle('Info');
        let container = document.createElement('div');
        let info = document.createElement('div');
        info.innerHTML = 'Saved Successfully';
        container.appendChild(info);
        let btnImp = document.createElement('button');
        // Init edit button
        btnImp.innerHTML = 'OK';
        btnImp.className = pfx + 'btn-prim ' + pfx + 'btn-edit';
        btnImp.style.marginTop = '10px';
        btnImp.style.float = 'right';
        btnImp.onclick = () => {
          editor.Modal.close();
        };
        container.appendChild(btnImp);
        modal.setContent('');
        modal.setContent(container);
        modal.open();
      }

      function onError(error) {
        let modal = editor.Modal;
        let modalContent = modal.getContentEl();
        modal.setTitle('Error');
        let container = document.createElement('div');
        let info = document.createElement('div');
        info.innerHTML = error.message;
        container.appendChild(info);
        let btnImp = document.createElement('button');
        // Init edit button
        btnImp.innerHTML = 'OK';
        btnImp.className = pfx + 'btn-prim ' + pfx + 'btn-edit';
        btnImp.style.marginTop = '10px';
        btnImp.style.float = 'right';
        btnImp.onclick = () => {
          editor.Modal.close();
        };
        container.appendChild(btnImp);
        modal.setContent('');
        modal.setContent(container);
        modal.open();
      }

      opt.save && opt.save(code, onSuccess, onError);

      sender.set && sender.set('active', 0);
    },

  }
}
