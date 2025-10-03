import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddMyselfAsRelativeData {
  relation_insert: Relation_Key;
}

export interface AddMyselfAsRelativeVariables {
  patientId: string;
  relationshipType: string;
}

export interface AddRelationData {
  relation_insert: Relation_Key;
}

export interface AddRelationVariables {
  patientId: string;
  relativeId: string;
  relationshipType?: string | null;
  isEmergencyContact?: boolean | null;
}

export interface GetAllUserRelationshipsData {
  asPatient: ({
    id: string;
    relationshipType?: string | null;
    isEmergencyContact: boolean;
    relative: {
      id: string;
      username: string;
      phone: string;
      firstName: string;
      lastName: string;
    } & User_Key;
  } & Relation_Key)[];
    asRelative: ({
      id: string;
      relationshipType?: string | null;
      isEmergencyContact: boolean;
      patient: {
        id: string;
        username: string;
        phone: string;
        firstName: string;
        lastName: string;
        deviceId?: string | null;
      } & User_Key;
    } & Relation_Key)[];
}

export interface GetAllUserRelationshipsVariables {
  userId: string;
}

export interface GetEmergencyContactsData {
  relations: ({
    id: string;
    relationshipType?: string | null;
    relative: {
      id: string;
      username: string;
      phone: string;
      email?: string | null;
      firstName: string;
      lastName: string;
    } & User_Key;
  } & Relation_Key)[];
}

export interface GetEmergencyContactsVariables {
  patientId: string;
}

export interface GetMyPatientsData {
  relations: ({
    id: string;
    relationshipType?: string | null;
    patient: {
      id: string;
      username: string;
      phone: string;
      firstName: string;
      lastName: string;
      deviceId?: string | null;
    } & User_Key;
  } & Relation_Key)[];
}

export interface GetMyProfileData {
  user?: {
    id: string;
    username: string;
    email?: string | null;
    phone: string;
    firstName: string;
    lastName: string;
    deviceId?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & User_Key;
}

export interface GetMyRelativesData {
  relations: ({
    id: string;
    relationshipType?: string | null;
    isEmergencyContact: boolean;
    relative: {
      id: string;
      username: string;
      phone: string;
      email?: string | null;
      firstName: string;
      lastName: string;
    } & User_Key;
      createdAt: TimestampString;
  } & Relation_Key)[];
}

export interface GetUserByDeviceIdData {
  users: ({
    id: string;
    username: string;
    email?: string | null;
    phone: string;
    firstName: string;
    lastName: string;
    deviceId?: string | null;
  } & User_Key)[];
}

export interface GetUserByDeviceIdVariables {
  deviceId: string;
}

export interface GetUserByIdData {
  user?: {
    id: string;
    username: string;
    email?: string | null;
    phone: string;
    firstName: string;
    lastName: string;
    deviceId?: string | null;
  } & User_Key;
}

export interface GetUserByIdVariables {
  userId: string;
}

export interface Relation_Key {
  id: string;
  __typename?: 'Relation_Key';
}

export interface RemoveRelationData {
  relation_delete?: Relation_Key | null;
}

export interface RemoveRelationVariables {
  relationId: string;
}

export interface SearchUsersData {
  users: ({
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
  } & User_Key)[];
}

export interface SearchUsersVariables {
  searchTerm: string;
}

export interface UpdateRelationData {
  relation_update?: Relation_Key | null;
}

export interface UpdateRelationVariables {
  relationId: string;
  relationshipType?: string | null;
  isEmergencyContact?: boolean | null;
}

export interface UpdateUserDeviceData {
  user_update?: User_Key | null;
}

export interface UpdateUserDeviceVariables {
  deviceId: string;
}

export interface UpsertUserData {
  user_upsert: User_Key;
}

export interface UpsertUserVariables {
  username: string;
  email?: string | null;
  phone: string;
  firstName: string;
  lastName: string;
  deviceId?: string | null;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface UpsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  operationName: string;
}
export const upsertUserRef: UpsertUserRef;

export function upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpdateUserDeviceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserDeviceVariables): MutationRef<UpdateUserDeviceData, UpdateUserDeviceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserDeviceVariables): MutationRef<UpdateUserDeviceData, UpdateUserDeviceVariables>;
  operationName: string;
}
export const updateUserDeviceRef: UpdateUserDeviceRef;

export function updateUserDevice(vars: UpdateUserDeviceVariables): MutationPromise<UpdateUserDeviceData, UpdateUserDeviceVariables>;
export function updateUserDevice(dc: DataConnect, vars: UpdateUserDeviceVariables): MutationPromise<UpdateUserDeviceData, UpdateUserDeviceVariables>;

interface AddRelationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddRelationVariables): MutationRef<AddRelationData, AddRelationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddRelationVariables): MutationRef<AddRelationData, AddRelationVariables>;
  operationName: string;
}
export const addRelationRef: AddRelationRef;

export function addRelation(vars: AddRelationVariables): MutationPromise<AddRelationData, AddRelationVariables>;
export function addRelation(dc: DataConnect, vars: AddRelationVariables): MutationPromise<AddRelationData, AddRelationVariables>;

interface UpdateRelationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateRelationVariables): MutationRef<UpdateRelationData, UpdateRelationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateRelationVariables): MutationRef<UpdateRelationData, UpdateRelationVariables>;
  operationName: string;
}
export const updateRelationRef: UpdateRelationRef;

export function updateRelation(vars: UpdateRelationVariables): MutationPromise<UpdateRelationData, UpdateRelationVariables>;
export function updateRelation(dc: DataConnect, vars: UpdateRelationVariables): MutationPromise<UpdateRelationData, UpdateRelationVariables>;

interface RemoveRelationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveRelationVariables): MutationRef<RemoveRelationData, RemoveRelationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveRelationVariables): MutationRef<RemoveRelationData, RemoveRelationVariables>;
  operationName: string;
}
export const removeRelationRef: RemoveRelationRef;

export function removeRelation(vars: RemoveRelationVariables): MutationPromise<RemoveRelationData, RemoveRelationVariables>;
export function removeRelation(dc: DataConnect, vars: RemoveRelationVariables): MutationPromise<RemoveRelationData, RemoveRelationVariables>;

interface AddMyselfAsRelativeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddMyselfAsRelativeVariables): MutationRef<AddMyselfAsRelativeData, AddMyselfAsRelativeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddMyselfAsRelativeVariables): MutationRef<AddMyselfAsRelativeData, AddMyselfAsRelativeVariables>;
  operationName: string;
}
export const addMyselfAsRelativeRef: AddMyselfAsRelativeRef;

export function addMyselfAsRelative(vars: AddMyselfAsRelativeVariables): MutationPromise<AddMyselfAsRelativeData, AddMyselfAsRelativeVariables>;
export function addMyselfAsRelative(dc: DataConnect, vars: AddMyselfAsRelativeVariables): MutationPromise<AddMyselfAsRelativeData, AddMyselfAsRelativeVariables>;

interface GetMyProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyProfileData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyProfileData, undefined>;
  operationName: string;
}
export const getMyProfileRef: GetMyProfileRef;

export function getMyProfile(): QueryPromise<GetMyProfileData, undefined>;
export function getMyProfile(dc: DataConnect): QueryPromise<GetMyProfileData, undefined>;

interface GetUserByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
  operationName: string;
}
export const getUserByIdRef: GetUserByIdRef;

export function getUserById(vars: GetUserByIdVariables): QueryPromise<GetUserByIdData, GetUserByIdVariables>;
export function getUserById(dc: DataConnect, vars: GetUserByIdVariables): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

interface GetUserByDeviceIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByDeviceIdVariables): QueryRef<GetUserByDeviceIdData, GetUserByDeviceIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserByDeviceIdVariables): QueryRef<GetUserByDeviceIdData, GetUserByDeviceIdVariables>;
  operationName: string;
}
export const getUserByDeviceIdRef: GetUserByDeviceIdRef;

export function getUserByDeviceId(vars: GetUserByDeviceIdVariables): QueryPromise<GetUserByDeviceIdData, GetUserByDeviceIdVariables>;
export function getUserByDeviceId(dc: DataConnect, vars: GetUserByDeviceIdVariables): QueryPromise<GetUserByDeviceIdData, GetUserByDeviceIdVariables>;

interface GetEmergencyContactsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEmergencyContactsVariables): QueryRef<GetEmergencyContactsData, GetEmergencyContactsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetEmergencyContactsVariables): QueryRef<GetEmergencyContactsData, GetEmergencyContactsVariables>;
  operationName: string;
}
export const getEmergencyContactsRef: GetEmergencyContactsRef;

export function getEmergencyContacts(vars: GetEmergencyContactsVariables): QueryPromise<GetEmergencyContactsData, GetEmergencyContactsVariables>;
export function getEmergencyContacts(dc: DataConnect, vars: GetEmergencyContactsVariables): QueryPromise<GetEmergencyContactsData, GetEmergencyContactsVariables>;

interface GetMyPatientsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyPatientsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyPatientsData, undefined>;
  operationName: string;
}
export const getMyPatientsRef: GetMyPatientsRef;

export function getMyPatients(): QueryPromise<GetMyPatientsData, undefined>;
export function getMyPatients(dc: DataConnect): QueryPromise<GetMyPatientsData, undefined>;

interface GetMyRelativesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyRelativesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyRelativesData, undefined>;
  operationName: string;
}
export const getMyRelativesRef: GetMyRelativesRef;

export function getMyRelatives(): QueryPromise<GetMyRelativesData, undefined>;
export function getMyRelatives(dc: DataConnect): QueryPromise<GetMyRelativesData, undefined>;

interface GetAllUserRelationshipsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAllUserRelationshipsVariables): QueryRef<GetAllUserRelationshipsData, GetAllUserRelationshipsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAllUserRelationshipsVariables): QueryRef<GetAllUserRelationshipsData, GetAllUserRelationshipsVariables>;
  operationName: string;
}
export const getAllUserRelationshipsRef: GetAllUserRelationshipsRef;

export function getAllUserRelationships(vars: GetAllUserRelationshipsVariables): QueryPromise<GetAllUserRelationshipsData, GetAllUserRelationshipsVariables>;
export function getAllUserRelationships(dc: DataConnect, vars: GetAllUserRelationshipsVariables): QueryPromise<GetAllUserRelationshipsData, GetAllUserRelationshipsVariables>;

interface SearchUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchUsersVariables): QueryRef<SearchUsersData, SearchUsersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SearchUsersVariables): QueryRef<SearchUsersData, SearchUsersVariables>;
  operationName: string;
}
export const searchUsersRef: SearchUsersRef;

export function searchUsers(vars: SearchUsersVariables): QueryPromise<SearchUsersData, SearchUsersVariables>;
export function searchUsers(dc: DataConnect, vars: SearchUsersVariables): QueryPromise<SearchUsersData, SearchUsersVariables>;

