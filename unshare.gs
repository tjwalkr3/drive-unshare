/* Unshare the user's entire Google Drive using recursion */
function unShare(folderToUnshare = DriveApp.getRootFolder().getId()) {
  var files = DriveApp.searchFiles("'me' in owners and '" + folderToUnshare + "' in parents");
  while (files.hasNext()) {
    var currentFile = files.next();
    removeEditors(currentFile);
    removeViewers(currentFile);
    setSharing(currentFile);
  }
  var folders = DriveApp.searchFolders("'me' in owners and '" + folderToUnshare + "' in parents");
  while (folders.hasNext()) {
    var currentFolder = folders.next();
    removeEditors(currentFolder);
    removeViewers(currentFolder);
    setSharing(currentFolder);
    unShare(currentFolder.getId());
  }
}

function removeEditors(current) {
  var editors = current.getEditors();
  for (var i in editors) {
    try {
      current.removeEditor(editors[i].getEmail());
    } catch (e) {
      Logger.log(e);
    }
  }
}

function removeViewers(current) {
  var viewers = current.getViewers();
  for (var i in viewers) {
    try {
      current.removeViewer(viewers[i].getEmail());
    } catch (e) {
      Logger.log(e);
    }
  }
}

function setSharing(current) {
  try {
    current.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.NONE);
  } catch(e) {
    Logger.log(e);
  }
}
