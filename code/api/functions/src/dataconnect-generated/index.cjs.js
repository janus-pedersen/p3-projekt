const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'api',
  location: 'europe-north1'
};
exports.connectorConfig = connectorConfig;

const insertRelativeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertRelative', inputVars);
}
insertRelativeRef.operationName = 'InsertRelative';
exports.insertRelativeRef = insertRelativeRef;

exports.insertRelative = function insertRelative(dcOrVars, vars) {
  return executeMutation(insertRelativeRef(dcOrVars, vars));
};

const updateRelativeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateRelative', inputVars);
}
updateRelativeRef.operationName = 'UpdateRelative';
exports.updateRelativeRef = updateRelativeRef;

exports.updateRelative = function updateRelative(dcOrVars, vars) {
  return executeMutation(updateRelativeRef(dcOrVars, vars));
};

const deleteRelativeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteRelative', inputVars);
}
deleteRelativeRef.operationName = 'DeleteRelative';
exports.deleteRelativeRef = deleteRelativeRef;

exports.deleteRelative = function deleteRelative(dcOrVars, vars) {
  return executeMutation(deleteRelativeRef(dcOrVars, vars));
};

const insertSnapshotRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertSnapshot', inputVars);
}
insertSnapshotRef.operationName = 'InsertSnapshot';
exports.insertSnapshotRef = insertSnapshotRef;

exports.insertSnapshot = function insertSnapshot(dcOrVars, vars) {
  return executeMutation(insertSnapshotRef(dcOrVars, vars));
};

const updateSnapshotRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSnapshot', inputVars);
}
updateSnapshotRef.operationName = 'UpdateSnapshot';
exports.updateSnapshotRef = updateSnapshotRef;

exports.updateSnapshot = function updateSnapshot(dcOrVars, vars) {
  return executeMutation(updateSnapshotRef(dcOrVars, vars));
};

const deleteSnapshotRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteSnapshot', inputVars);
}
deleteSnapshotRef.operationName = 'DeleteSnapshot';
exports.deleteSnapshotRef = deleteSnapshotRef;

exports.deleteSnapshot = function deleteSnapshot(dcOrVars, vars) {
  return executeMutation(deleteSnapshotRef(dcOrVars, vars));
};

const getRelativesByUidRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRelativesByUid', inputVars);
}
getRelativesByUidRef.operationName = 'GetRelativesByUid';
exports.getRelativesByUidRef = getRelativesByUidRef;

exports.getRelativesByUid = function getRelativesByUid(dcOrVars, vars) {
  return executeQuery(getRelativesByUidRef(dcOrVars, vars));
};

const getRelativeByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRelativeById', inputVars);
}
getRelativeByIdRef.operationName = 'GetRelativeById';
exports.getRelativeByIdRef = getRelativeByIdRef;

exports.getRelativeById = function getRelativeById(dcOrVars, vars) {
  return executeQuery(getRelativeByIdRef(dcOrVars, vars));
};

const getAllRelativesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllRelatives');
}
getAllRelativesRef.operationName = 'GetAllRelatives';
exports.getAllRelativesRef = getAllRelativesRef;

exports.getAllRelatives = function getAllRelatives(dc) {
  return executeQuery(getAllRelativesRef(dc));
};

const getSnapshotsByUidRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSnapshotsByUid', inputVars);
}
getSnapshotsByUidRef.operationName = 'GetSnapshotsByUid';
exports.getSnapshotsByUidRef = getSnapshotsByUidRef;

exports.getSnapshotsByUid = function getSnapshotsByUid(dcOrVars, vars) {
  return executeQuery(getSnapshotsByUidRef(dcOrVars, vars));
};

const getSnapshotByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSnapshotById', inputVars);
}
getSnapshotByIdRef.operationName = 'GetSnapshotById';
exports.getSnapshotByIdRef = getSnapshotByIdRef;

exports.getSnapshotById = function getSnapshotById(dcOrVars, vars) {
  return executeQuery(getSnapshotByIdRef(dcOrVars, vars));
};

const getAllSnapshotsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllSnapshots');
}
getAllSnapshotsRef.operationName = 'GetAllSnapshots';
exports.getAllSnapshotsRef = getAllSnapshotsRef;

exports.getAllSnapshots = function getAllSnapshots(dc) {
  return executeQuery(getAllSnapshotsRef(dc));
};
