import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface DeleteRelativeData {
  relative_delete?: Relative_Key | null;
}

export interface DeleteRelativeVariables {
  uid: string;
}

export interface DeleteSnapshotData {
  snapshot_delete?: Snapshot_Key | null;
}

export interface DeleteSnapshotVariables {
  id: string;
}

export interface GetAllRelativesData {
  relatives: ({
    uid: string;
    phone: string;
  })[];
}

export interface GetRelativeByUidData {
  relative?: {
    uid: string;
    phone: string;
  };
}

export interface GetRelativeByUidVariables {
  uid: string;
}

export interface GetSnapshotByIdData {
  snapshot?: {
    id: string;
    uid: string;
    latitude: number;
    longitude: number;
    timestamp: TimestampString;
  } & Snapshot_Key;
}

export interface GetSnapshotByIdVariables {
  id: string;
}

export interface GetSnapshotsByUidData {
  snapshots: ({
    id: string;
    uid: string;
    latitude: number;
    longitude: number;
    timestamp: TimestampString;
  } & Snapshot_Key)[];
}

export interface GetSnapshotsByUidVariables {
  uid: string;
}

export interface InsertRelativeData {
  relative_insert: Relative_Key;
}

export interface InsertRelativeVariables {
  uid: string;
  phone: string;
}

export interface InsertSnapshotData {
  snapshot_insert: Snapshot_Key;
}

export interface InsertSnapshotVariables {
  uid: string;
  latitude: number;
  longitude: number;
  timestamp: TimestampString;
}

export interface Relative_Key {
  id: string;
  __typename?: 'Relative_Key';
}

export interface Snapshot_Key {
  id: string;
  __typename?: 'Snapshot_Key';
}

export interface UpdateRelativeData {
  relative_update?: Relative_Key | null;
}

export interface UpdateRelativeVariables {
  uid: string;
  phone: string;
}

export interface UpdateSnapshotData {
  snapshot_update?: Snapshot_Key | null;
}

export interface UpdateSnapshotVariables {
  id: string;
  latitude?: number | null;
  longitude?: number | null;
  timestamp?: TimestampString | null;
}

interface InsertRelativeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertRelativeVariables): MutationRef<InsertRelativeData, InsertRelativeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertRelativeVariables): MutationRef<InsertRelativeData, InsertRelativeVariables>;
  operationName: string;
}
export const insertRelativeRef: InsertRelativeRef;

export function insertRelative(vars: InsertRelativeVariables): MutationPromise<InsertRelativeData, InsertRelativeVariables>;
export function insertRelative(dc: DataConnect, vars: InsertRelativeVariables): MutationPromise<InsertRelativeData, InsertRelativeVariables>;

interface UpdateRelativeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateRelativeVariables): MutationRef<UpdateRelativeData, UpdateRelativeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateRelativeVariables): MutationRef<UpdateRelativeData, UpdateRelativeVariables>;
  operationName: string;
}
export const updateRelativeRef: UpdateRelativeRef;

export function updateRelative(vars: UpdateRelativeVariables): MutationPromise<UpdateRelativeData, UpdateRelativeVariables>;
export function updateRelative(dc: DataConnect, vars: UpdateRelativeVariables): MutationPromise<UpdateRelativeData, UpdateRelativeVariables>;

interface DeleteRelativeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteRelativeVariables): MutationRef<DeleteRelativeData, DeleteRelativeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteRelativeVariables): MutationRef<DeleteRelativeData, DeleteRelativeVariables>;
  operationName: string;
}
export const deleteRelativeRef: DeleteRelativeRef;

export function deleteRelative(vars: DeleteRelativeVariables): MutationPromise<DeleteRelativeData, DeleteRelativeVariables>;
export function deleteRelative(dc: DataConnect, vars: DeleteRelativeVariables): MutationPromise<DeleteRelativeData, DeleteRelativeVariables>;

interface InsertSnapshotRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertSnapshotVariables): MutationRef<InsertSnapshotData, InsertSnapshotVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertSnapshotVariables): MutationRef<InsertSnapshotData, InsertSnapshotVariables>;
  operationName: string;
}
export const insertSnapshotRef: InsertSnapshotRef;

export function insertSnapshot(vars: InsertSnapshotVariables): MutationPromise<InsertSnapshotData, InsertSnapshotVariables>;
export function insertSnapshot(dc: DataConnect, vars: InsertSnapshotVariables): MutationPromise<InsertSnapshotData, InsertSnapshotVariables>;

interface UpdateSnapshotRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSnapshotVariables): MutationRef<UpdateSnapshotData, UpdateSnapshotVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateSnapshotVariables): MutationRef<UpdateSnapshotData, UpdateSnapshotVariables>;
  operationName: string;
}
export const updateSnapshotRef: UpdateSnapshotRef;

export function updateSnapshot(vars: UpdateSnapshotVariables): MutationPromise<UpdateSnapshotData, UpdateSnapshotVariables>;
export function updateSnapshot(dc: DataConnect, vars: UpdateSnapshotVariables): MutationPromise<UpdateSnapshotData, UpdateSnapshotVariables>;

interface DeleteSnapshotRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSnapshotVariables): MutationRef<DeleteSnapshotData, DeleteSnapshotVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteSnapshotVariables): MutationRef<DeleteSnapshotData, DeleteSnapshotVariables>;
  operationName: string;
}
export const deleteSnapshotRef: DeleteSnapshotRef;

export function deleteSnapshot(vars: DeleteSnapshotVariables): MutationPromise<DeleteSnapshotData, DeleteSnapshotVariables>;
export function deleteSnapshot(dc: DataConnect, vars: DeleteSnapshotVariables): MutationPromise<DeleteSnapshotData, DeleteSnapshotVariables>;

interface GetRelativeByUidRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRelativeByUidVariables): QueryRef<GetRelativeByUidData, GetRelativeByUidVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetRelativeByUidVariables): QueryRef<GetRelativeByUidData, GetRelativeByUidVariables>;
  operationName: string;
}
export const getRelativeByUidRef: GetRelativeByUidRef;

export function getRelativeByUid(vars: GetRelativeByUidVariables): QueryPromise<GetRelativeByUidData, GetRelativeByUidVariables>;
export function getRelativeByUid(dc: DataConnect, vars: GetRelativeByUidVariables): QueryPromise<GetRelativeByUidData, GetRelativeByUidVariables>;

interface GetAllRelativesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllRelativesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAllRelativesData, undefined>;
  operationName: string;
}
export const getAllRelativesRef: GetAllRelativesRef;

export function getAllRelatives(): QueryPromise<GetAllRelativesData, undefined>;
export function getAllRelatives(dc: DataConnect): QueryPromise<GetAllRelativesData, undefined>;

interface GetSnapshotByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSnapshotByIdVariables): QueryRef<GetSnapshotByIdData, GetSnapshotByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSnapshotByIdVariables): QueryRef<GetSnapshotByIdData, GetSnapshotByIdVariables>;
  operationName: string;
}
export const getSnapshotByIdRef: GetSnapshotByIdRef;

export function getSnapshotById(vars: GetSnapshotByIdVariables): QueryPromise<GetSnapshotByIdData, GetSnapshotByIdVariables>;
export function getSnapshotById(dc: DataConnect, vars: GetSnapshotByIdVariables): QueryPromise<GetSnapshotByIdData, GetSnapshotByIdVariables>;

interface GetSnapshotsByUidRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSnapshotsByUidVariables): QueryRef<GetSnapshotsByUidData, GetSnapshotsByUidVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSnapshotsByUidVariables): QueryRef<GetSnapshotsByUidData, GetSnapshotsByUidVariables>;
  operationName: string;
}
export const getSnapshotsByUidRef: GetSnapshotsByUidRef;

export function getSnapshotsByUid(vars: GetSnapshotsByUidVariables): QueryPromise<GetSnapshotsByUidData, GetSnapshotsByUidVariables>;
export function getSnapshotsByUid(dc: DataConnect, vars: GetSnapshotsByUidVariables): QueryPromise<GetSnapshotsByUidData, GetSnapshotsByUidVariables>;

