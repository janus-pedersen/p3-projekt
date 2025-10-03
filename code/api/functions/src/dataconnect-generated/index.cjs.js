const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'api',
  location: 'europe-north1'
};
exports.connectorConfig = connectorConfig;

const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';
exports.upsertUserRef = upsertUserRef;

exports.upsertUser = function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
};

const updateUserDeviceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserDevice', inputVars);
}
updateUserDeviceRef.operationName = 'UpdateUserDevice';
exports.updateUserDeviceRef = updateUserDeviceRef;

exports.updateUserDevice = function updateUserDevice(dcOrVars, vars) {
  return executeMutation(updateUserDeviceRef(dcOrVars, vars));
};

const addRelationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddRelation', inputVars);
}
addRelationRef.operationName = 'AddRelation';
exports.addRelationRef = addRelationRef;

exports.addRelation = function addRelation(dcOrVars, vars) {
  return executeMutation(addRelationRef(dcOrVars, vars));
};

const updateRelationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateRelation', inputVars);
}
updateRelationRef.operationName = 'UpdateRelation';
exports.updateRelationRef = updateRelationRef;

exports.updateRelation = function updateRelation(dcOrVars, vars) {
  return executeMutation(updateRelationRef(dcOrVars, vars));
};

const removeRelationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveRelation', inputVars);
}
removeRelationRef.operationName = 'RemoveRelation';
exports.removeRelationRef = removeRelationRef;

exports.removeRelation = function removeRelation(dcOrVars, vars) {
  return executeMutation(removeRelationRef(dcOrVars, vars));
};

const addMyselfAsRelativeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddMyselfAsRelative', inputVars);
}
addMyselfAsRelativeRef.operationName = 'AddMyselfAsRelative';
exports.addMyselfAsRelativeRef = addMyselfAsRelativeRef;

exports.addMyselfAsRelative = function addMyselfAsRelative(dcOrVars, vars) {
  return executeMutation(addMyselfAsRelativeRef(dcOrVars, vars));
};

const getMyProfileRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyProfile');
}
getMyProfileRef.operationName = 'GetMyProfile';
exports.getMyProfileRef = getMyProfileRef;

exports.getMyProfile = function getMyProfile(dc) {
  return executeQuery(getMyProfileRef(dc));
};

const getUserByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserById', inputVars);
}
getUserByIdRef.operationName = 'GetUserById';
exports.getUserByIdRef = getUserByIdRef;

exports.getUserById = function getUserById(dcOrVars, vars) {
  return executeQuery(getUserByIdRef(dcOrVars, vars));
};

const getUserByDeviceIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserByDeviceId', inputVars);
}
getUserByDeviceIdRef.operationName = 'GetUserByDeviceId';
exports.getUserByDeviceIdRef = getUserByDeviceIdRef;

exports.getUserByDeviceId = function getUserByDeviceId(dcOrVars, vars) {
  return executeQuery(getUserByDeviceIdRef(dcOrVars, vars));
};

const getEmergencyContactsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEmergencyContacts', inputVars);
}
getEmergencyContactsRef.operationName = 'GetEmergencyContacts';
exports.getEmergencyContactsRef = getEmergencyContactsRef;

exports.getEmergencyContacts = function getEmergencyContacts(dcOrVars, vars) {
  return executeQuery(getEmergencyContactsRef(dcOrVars, vars));
};

const getMyPatientsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyPatients');
}
getMyPatientsRef.operationName = 'GetMyPatients';
exports.getMyPatientsRef = getMyPatientsRef;

exports.getMyPatients = function getMyPatients(dc) {
  return executeQuery(getMyPatientsRef(dc));
};

const getMyRelativesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyRelatives');
}
getMyRelativesRef.operationName = 'GetMyRelatives';
exports.getMyRelativesRef = getMyRelativesRef;

exports.getMyRelatives = function getMyRelatives(dc) {
  return executeQuery(getMyRelativesRef(dc));
};

const getAllUserRelationshipsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllUserRelationships', inputVars);
}
getAllUserRelationshipsRef.operationName = 'GetAllUserRelationships';
exports.getAllUserRelationshipsRef = getAllUserRelationshipsRef;

exports.getAllUserRelationships = function getAllUserRelationships(dcOrVars, vars) {
  return executeQuery(getAllUserRelationshipsRef(dcOrVars, vars));
};

const searchUsersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchUsers', inputVars);
}
searchUsersRef.operationName = 'SearchUsers';
exports.searchUsersRef = searchUsersRef;

exports.searchUsers = function searchUsers(dcOrVars, vars) {
  return executeQuery(searchUsersRef(dcOrVars, vars));
};
