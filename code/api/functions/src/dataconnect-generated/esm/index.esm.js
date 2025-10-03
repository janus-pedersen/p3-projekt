import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'api',
  location: 'europe-north1'
};

export const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';

export function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
}

export const updateUserDeviceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserDevice', inputVars);
}
updateUserDeviceRef.operationName = 'UpdateUserDevice';

export function updateUserDevice(dcOrVars, vars) {
  return executeMutation(updateUserDeviceRef(dcOrVars, vars));
}

export const addRelationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddRelation', inputVars);
}
addRelationRef.operationName = 'AddRelation';

export function addRelation(dcOrVars, vars) {
  return executeMutation(addRelationRef(dcOrVars, vars));
}

export const updateRelationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateRelation', inputVars);
}
updateRelationRef.operationName = 'UpdateRelation';

export function updateRelation(dcOrVars, vars) {
  return executeMutation(updateRelationRef(dcOrVars, vars));
}

export const removeRelationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveRelation', inputVars);
}
removeRelationRef.operationName = 'RemoveRelation';

export function removeRelation(dcOrVars, vars) {
  return executeMutation(removeRelationRef(dcOrVars, vars));
}

export const addMyselfAsRelativeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddMyselfAsRelative', inputVars);
}
addMyselfAsRelativeRef.operationName = 'AddMyselfAsRelative';

export function addMyselfAsRelative(dcOrVars, vars) {
  return executeMutation(addMyselfAsRelativeRef(dcOrVars, vars));
}

export const getMyProfileRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyProfile');
}
getMyProfileRef.operationName = 'GetMyProfile';

export function getMyProfile(dc) {
  return executeQuery(getMyProfileRef(dc));
}

export const getUserByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserById', inputVars);
}
getUserByIdRef.operationName = 'GetUserById';

export function getUserById(dcOrVars, vars) {
  return executeQuery(getUserByIdRef(dcOrVars, vars));
}

export const getUserByDeviceIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserByDeviceId', inputVars);
}
getUserByDeviceIdRef.operationName = 'GetUserByDeviceId';

export function getUserByDeviceId(dcOrVars, vars) {
  return executeQuery(getUserByDeviceIdRef(dcOrVars, vars));
}

export const getEmergencyContactsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEmergencyContacts', inputVars);
}
getEmergencyContactsRef.operationName = 'GetEmergencyContacts';

export function getEmergencyContacts(dcOrVars, vars) {
  return executeQuery(getEmergencyContactsRef(dcOrVars, vars));
}

export const getMyPatientsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyPatients');
}
getMyPatientsRef.operationName = 'GetMyPatients';

export function getMyPatients(dc) {
  return executeQuery(getMyPatientsRef(dc));
}

export const getMyRelativesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyRelatives');
}
getMyRelativesRef.operationName = 'GetMyRelatives';

export function getMyRelatives(dc) {
  return executeQuery(getMyRelativesRef(dc));
}

export const getAllUserRelationshipsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllUserRelationships', inputVars);
}
getAllUserRelationshipsRef.operationName = 'GetAllUserRelationships';

export function getAllUserRelationships(dcOrVars, vars) {
  return executeQuery(getAllUserRelationshipsRef(dcOrVars, vars));
}

export const searchUsersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchUsers', inputVars);
}
searchUsersRef.operationName = 'SearchUsers';

export function searchUsers(dcOrVars, vars) {
  return executeQuery(searchUsersRef(dcOrVars, vars));
}

