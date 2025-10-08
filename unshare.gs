/* Unshare the user's entire Google Drive using recursion */
function unShare(folderToUnshare = DriveApp.getRootFolder().getId()) {
  var files = DriveApp.searchFiles("'me' in owners and '" + folderToUnshare + "' in parents");
  while (files.hasNext()) {
    unshareItem(files.next());
  }
  var folders = DriveApp.searchFolders("'me' in owners and '" + folderToUnshare + "' in parents");
  while (folders.hasNext()) {
    unshareItem(folders.next());
    unShare(currentFolder.getId());
  }
}

function unshareItem(item) {
  removeEditors(item);
  removeViewers(item);
  setSharing(item);
}

function removeEditors(current) {
  var editors = current.getEditors();
  for (var i in editors) {
    try {
      current.removeEditor(editors[i].getEmail());
      Logger.log(`Removed editor "${editors[i].getEmail()}" from: "${current.getName()}"`);
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
      Logger.log(`Removed viewer: "${viewers[i].getEmail()}" from: "${current.getName()}"`);
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
