export default (editor, opt = {}) => {
  let cmd = editor.Commands;
  let importCommand = require('./command-import-mjml');
  let exportCommand = require('./command-export-mjml');
  let exportName = opt.overwriteExport ? 'export-template' : 'mjml-export';
  let editCommand = require('./command-edit-mjml');
  let previewCommand = require('./command-preview');
  let setConditionCommand = require('./command-set-condition');
  let setLoopCommand = require('./command-set-loop');
  let setVariablesCommand = require('./command-set-variables');
  let saveCommand = require('./command-save');
  let setUserContextCommand = require('./command-set-user-context');
  let saveUserBlockCommand = require('./command-save-user-block');
  let deleteUserBlockCommand = require('./command-delete-user-block');

  cmd.add('mjml-import', importCommand.default(editor, opt));
  cmd.add(exportName, exportCommand.default(editor, opt));
  cmd.add('mjml-edit', editCommand.default(editor, opt));
  cmd.add('mjml-preview', previewCommand.default(editor, opt));
  cmd.add('mjml-set-condition', setConditionCommand.default(editor, opt));
  cmd.add('mjml-set-loop', setLoopCommand.default(editor, opt));
  cmd.add('mjml-set-variables', setVariablesCommand.default(editor, opt));
  cmd.add('mjml-save', saveCommand.default(editor, opt));
  cmd.add('mjml-set-user-context', setUserContextCommand.default(editor, opt));
  cmd.add('mjml-save-user-block', saveUserBlockCommand.default(editor, opt));
  cmd.add('mjml-delete-user-block', deleteUserBlockCommand.default(editor, opt));
}
