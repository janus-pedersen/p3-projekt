import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'api',
  location: 'europe-north1'
};

export const insertRelativeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertRelative', inputVars);
}
insertRelativeRef.operationName = 'InsertRelative';

export function insertRelative(dcOrVars, vars) {
  return executeMutation(insertRelativeRef(dcOrVars, vars));
}

export const updateRelativeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateRelative', inputVars);
}
updateRelativeRef.operationName = 'UpdateRelative';

export function updateRelative(dcOrVars, vars) {
  return executeMutation(updateRelativeRef(dcOrVars, vars));
}

export const deleteRelativeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteRelative', inputVars);
}
deleteRelativeRef.operationName = 'DeleteRelative';

export function deleteRelative(dcOrVars, vars) {
  return executeMutation(deleteRelativeRef(dcOrVars, vars));
}

export const insertSnapshotRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertSnapshot', inputVars);
}
insertSnapshotRef.operationName = 'InsertSnapshot';

export function insertSnapshot(dcOrVars, vars) {
  return executeMutation(insertSnapshotRef(dcOrVars, vars));
}

export const updateSnapshotRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSnapshot', inputVars);
}
updateSnapshotRef.operationName = 'UpdateSnapshot';

export function updateSnapshot(dcOrVars, vars) {
  return executeMutation(updateSnapshotRef(dcOrVars, vars));
}

export const deleteSnapshotRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteSnapshot', inputVars);
}
deleteSnapshotRef.operationName = 'DeleteSnapshot';

export function deleteSnapshot(dcOrVars, vars) {
  return executeMutation(deleteSnapshotRef(dcOrVars, vars));
}

export const getRelativesByUidRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRelativesByUid', inputVars);
}
getRelativesByUidRef.operationName = 'GetRelativesByUid';

export function getRelativesByUid(dcOrVars, vars) {
  return executeQuery(getRelativesByUidRef(dcOrVars, vars));
}

export const getRelativeByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRelativeById', inputVars);
}
getRelativeByIdRef.operationName = 'GetRelativeById';

export function getRelativeById(dcOrVars, vars) {
  return executeQuery(getRelativeByIdRef(dcOrVars, vars));
}

export const getAllRelativesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllRelatives');
}
getAllRelativesRef.operationName = 'GetAllRelatives';

export function getAllRelatives(dc) {
  return executeQuery(getAllRelativesRef(dc));
}

export const getSnapshotsByUidRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSnapshotsByUid', inputVars);
}
getSnapshotsByUidRef.operationName = 'GetSnapshotsByUid';

export function getSnapshotsByUid(dcOrVars, vars) {
  return executeQuery(getSnapshotsByUidRef(dcOrVars, vars));
}

export const getSnapshotByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSnapshotById', inputVars);
}
getSnapshotByIdRef.operationName = 'GetSnapshotById';

export function getSnapshotById(dcOrVars, vars) {
  return executeQuery(getSnapshotByIdRef(dcOrVars, vars));
}

export const getAllSnapshotsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllSnapshots');
}
getAllSnapshotsRef.operationName = 'GetAllSnapshots';

export function getAllSnapshots(dc) {
  return executeQuery(getAllSnapshotsRef(dc));
}

