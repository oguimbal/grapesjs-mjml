export default (editor, opt = {}) => {
  editor.on('load', () => {
    if(opt.readOnly) {
      editor.TraitManager.getTraitsViewer().stopListening();
    }
  });
}
