export default (editor, opt = {}) => {
  let cmd = editor.Commands;
  let importCommand = require('./command-import-mjml');
  let exportCommand = require('./command-export-mjml');
  let exportName = opt.overwriteExport ? 'export-template' : 'mjml-export';
  let editCommand = require('./command-edit-mjml');
  let previewCommand = require('./command-preview');
  let setConditionCommand = require('./command-set-condition');

  cmd.add('mjml-import', importCommand.default(editor, opt));
  cmd.add(exportName, exportCommand.default(editor, opt));
  cmd.add('mjml-edit', editCommand.default(editor, opt));
  cmd.add('mjml-preview', previewCommand.default(editor, opt));
  cmd.add('mjml-set-condition', setConditionCommand.default(editor, opt));
}
