export default (editor, opt = {}) => {

  let pnm = editor.Panels;
  let optPanel = pnm.getPanel('options');

  let btn = pnm.getButton('options', 'export-template');
  btn && pnm.removeButton('options', btn);

  btn = pnm.getButton('options', 'preview');
  btn && pnm.removeButton('options', btn);

  pnm.addButton('options', {
    id: 'mjml-edit',
    className: 'fa fa-code',
    command: 'mjml-edit',
    attributes: { title: 'Edit MJML' }
  });

  pnm.addButton('options', {
    id: 'mjml-preview',
    className: 'fa fa-eye',
    command: 'mjml-preview',
    attributes: { title: 'Preview' }
  });

  pnm.addButton('options', {
    id: 'mjml-variables',
    className: 'fa fa-list',
    command: 'mjml-set-variables',
    attributes: { title: 'Set Variables' }
  });

  if(!opt.readOnly) {
    pnm.addButton('options', {
      id: 'mjml-save',
      className: 'fa fa-save',
      command: 'mjml-save',
      attributes: { title: 'Save' }
    });
  }

}
