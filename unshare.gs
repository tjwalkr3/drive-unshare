/* Unshare the user's entire Google Drive using recursion */
function unShare(folderToUnshare = DriveApp.getRootFolder().getId()) {
  var files = DriveApp.searchFiles("'me' in owners and '" + folderToUnshare + "' in parents");
  while (files.hasNext()) {
    var currentFile = files.next();
    var fileEditors = currentFile.getEditors();
    var fileViewers = currentFile.getViewers();
    Logger.log("Editors: " + fileEditors.length + ", Viewers: " + fileViewers.length + ", File: " + currentFile.getName());
    for (var i in fileEditors) {
      try {
        currentFile.removeEditor(fileEditors[i].getEmail());
      } catch (e) {
        Logger.log(e);
      }
    }
    for (var i in fileViewers) {
      try {
        currentFile.removeViewer(fileViewers[i].getEmail());
      } catch (e) {
        Logger.log(e);
      }
    }
    try {
      currentFile.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.NONE);
    } catch(e) {
      Logger.log(e);
    }
  }
  var folders = DriveApp.searchFolders("'me' in owners and '" + folderToUnshare + "' in parents");
  while (folders.hasNext()) {
    var currentFolder = folders.next();
    var folderEditors = currentFolder.getEditors();
    var folderViewers = currentFolder.getViewers();
    Logger.log("Editors: " + folderEditors.length + ", Viewers: " + folderViewers.length + ", Folder: " + currentFolder.getName());
    for (var i in folderEditors) {
      try {
        currentFolder.removeEditor(folderEditors[i].getEmail());
      } catch (e) {
        Logger.log(e);
      }
    }
    for (var i in folderViewers) {
      try {
        currentFolder.removeViewer(folderViewers[i].getEmail());
      } catch (e) {
        Logger.log(e);
      }
    }
    try {
      currentFolder.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.NONE);
    } catch(e) {
      Logger.log(e);
    }
    unShare(currentFolder.getId());
  }
}
