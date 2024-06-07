const vscode = require("vscode");

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("runCarbonFile", function () {
      specials("run");
    })
  );
}

exports.activate = activate;

function specials(command) {
  let editor = vscode.window.activeTextEditor;
  if (editor) {
    if (editor.document.languageId == "carbon") {
      editor.document.save();
      let terminal = vscode.window.createTerminal("Carbon Interactive");
      terminal.sendText(`carbon ${command} "${editor.document.fileName}"`);
      terminal.show();
    } else {
      vscode.window.showErrorMessage("Editor doesn't contain a carbon file");
    }
  } else {
    vscode.window.showErrorMessage("No file is open in the editor");
  }
}
