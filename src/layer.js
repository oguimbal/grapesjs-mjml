export default (editor, opt = {}) => {
  editor.on('load', () => {
    if(opt.readOnly) {
      editor.LayerManager.getAll().config.sortable = false;
    }
  });
}
