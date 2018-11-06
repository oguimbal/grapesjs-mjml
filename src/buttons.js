export default (editor, opt = {}) => {

  let pnm = editor.Panels;
  let optPanel = pnm.getPanel('options');

  let btn = pnm.getButton('options', 'export-template');
  btn && pnm.removeButton('options', btn);

  pnm.addButton('options', {
    id: 'mjml-edit',
    className: 'fa fa-code',
    command: 'mjml-edit',
  });

}
