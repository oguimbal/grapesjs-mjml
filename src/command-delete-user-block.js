export default (editor, opt = {}) => {

  let config = editor.getConfig();
  let btnImp = document.createElement('button');
  let container = document.createElement('div');
  let pfx = config.stylePrefix || '';
  let userBlockName = '';
  let nameInput = document.createElement('input');
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
  if(!opt.readOnly) {
    container.appendChild(btnImp);
  }

  // Init edit button
  btnImp.innerHTML = 'Delete';
  btnImp.className = pfx + 'btn-prim ' + pfx + 'btn-edit';
  btnImp.style.marginTop = '10px';
  btnImp.style.float = 'right';
  btnImp.onclick = () => {
    if(!userBlockName) {
      alert('Block name is required');
      return;
    }
    opt.deleteUserBlock && opt.deleteUserBlock(userBlockName, function() {
      const index = opt.userBlocks.find(block => block.name === userBlockName);
      if(index >= 0) {
        opt.userBlocks.splice(index, 1);
      }
      const bm = editor.BlockManager;
      bm.remove(`mj-user-${userBlockName}`);
      nameInput.value = '';
      nameInput.innerHTML = '';
      editor.Modal.close();
    }, function(error) {
      alert(error.message);
    });
  };

  return {

    run(editor, sender = {}) {
      let modal = editor.Modal;
      let modalContent = modal.getContentEl();
      modal.setTitle('Delete User Block');

      modal.setContent('');
      modal.setContent(container);
      modal.open();
      sender.set && sender.set('active', 0);
    },

  }
}
