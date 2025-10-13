# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetRelativeByUid*](#getrelativebyuid)
  - [*GetAllRelatives*](#getallrelatives)
  - [*GetSnapshotById*](#getsnapshotbyid)
  - [*GetSnapshotsByUid*](#getsnapshotsbyuid)
- [**Mutations**](#mutations)
  - [*InsertRelative*](#insertrelative)
  - [*UpdateRelative*](#updaterelative)
  - [*DeleteRelative*](#deleterelative)
  - [*InsertSnapshot*](#insertsnapshot)
  - [*UpdateSnapshot*](#updatesnapshot)
  - [*DeleteSnapshot*](#deletesnapshot)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetRelativeByUid
You can execute the `GetRelativeByUid` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getRelativeByUid(vars: GetRelativeByUidVariables): QueryPromise<GetRelativeByUidData, GetRelativeByUidVariables>;

interface GetRelativeByUidRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRelativeByUidVariables): QueryRef<GetRelativeByUidData, GetRelativeByUidVariables>;
}
export const getRelativeByUidRef: GetRelativeByUidRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getRelativeByUid(dc: DataConnect, vars: GetRelativeByUidVariables): QueryPromise<GetRelativeByUidData, GetRelativeByUidVariables>;

interface GetRelativeByUidRef {
  ...
  (dc: DataConnect, vars: GetRelativeByUidVariables): QueryRef<GetRelativeByUidData, GetRelativeByUidVariables>;
}
export const getRelativeByUidRef: GetRelativeByUidRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getRelativeByUidRef:
```typescript
const name = getRelativeByUidRef.operationName;
console.log(name);
```

### Variables
The `GetRelativeByUid` query requires an argument of type `GetRelativeByUidVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetRelativeByUidVariables {
  uid: string;
}
```
### Return Type
Recall that executing the `GetRelativeByUid` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetRelativeByUidData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetRelativeByUidData {
  relative?: {
    uid: string;
    phone: string;
  };
}
```
### Using `GetRelativeByUid`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getRelativeByUid, GetRelativeByUidVariables } from '@dataconnect/generated';

// The `GetRelativeByUid` query requires an argument of type `GetRelativeByUidVariables`:
const getRelativeByUidVars: GetRelativeByUidVariables = {
  uid: ..., 
};

// Call the `getRelativeByUid()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getRelativeByUid(getRelativeByUidVars);
// Variables can be defined inline as well.
const { data } = await getRelativeByUid({ uid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getRelativeByUid(dataConnect, getRelativeByUidVars);

console.log(data.relative);

// Or, you can use the `Promise` API.
getRelativeByUid(getRelativeByUidVars).then((response) => {
  const data = response.data;
  console.log(data.relative);
});
```

### Using `GetRelativeByUid`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getRelativeByUidRef, GetRelativeByUidVariables } from '@dataconnect/generated';

// The `GetRelativeByUid` query requires an argument of type `GetRelativeByUidVariables`:
const getRelativeByUidVars: GetRelativeByUidVariables = {
  uid: ..., 
};

// Call the `getRelativeByUidRef()` function to get a reference to the query.
const ref = getRelativeByUidRef(getRelativeByUidVars);
// Variables can be defined inline as well.
const ref = getRelativeByUidRef({ uid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getRelativeByUidRef(dataConnect, getRelativeByUidVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.relative);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.relative);
});
```

## GetAllRelatives
You can execute the `GetAllRelatives` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAllRelatives(): QueryPromise<GetAllRelativesData, undefined>;

interface GetAllRelativesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllRelativesData, undefined>;
}
export const getAllRelativesRef: GetAllRelativesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAllRelatives(dc: DataConnect): QueryPromise<GetAllRelativesData, undefined>;

interface GetAllRelativesRef {
  ...
  (dc: DataConnect): QueryRef<GetAllRelativesData, undefined>;
}
export const getAllRelativesRef: GetAllRelativesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAllRelativesRef:
```typescript
const name = getAllRelativesRef.operationName;
console.log(name);
```

### Variables
The `GetAllRelatives` query has no variables.
### Return Type
Recall that executing the `GetAllRelatives` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAllRelativesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAllRelativesData {
  relatives: ({
    uid: string;
    phone: string;
  })[];
}
```
### Using `GetAllRelatives`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAllRelatives } from '@dataconnect/generated';


// Call the `getAllRelatives()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAllRelatives();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAllRelatives(dataConnect);

console.log(data.relatives);

// Or, you can use the `Promise` API.
getAllRelatives().then((response) => {
  const data = response.data;
  console.log(data.relatives);
});
```

### Using `GetAllRelatives`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAllRelativesRef } from '@dataconnect/generated';


// Call the `getAllRelativesRef()` function to get a reference to the query.
const ref = getAllRelativesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAllRelativesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.relatives);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.relatives);
});
```

## GetSnapshotById
You can execute the `GetSnapshotById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getSnapshotById(vars: GetSnapshotByIdVariables): QueryPromise<GetSnapshotByIdData, GetSnapshotByIdVariables>;

interface GetSnapshotByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSnapshotByIdVariables): QueryRef<GetSnapshotByIdData, GetSnapshotByIdVariables>;
}
export const getSnapshotByIdRef: GetSnapshotByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSnapshotById(dc: DataConnect, vars: GetSnapshotByIdVariables): QueryPromise<GetSnapshotByIdData, GetSnapshotByIdVariables>;

interface GetSnapshotByIdRef {
  ...
  (dc: DataConnect, vars: GetSnapshotByIdVariables): QueryRef<GetSnapshotByIdData, GetSnapshotByIdVariables>;
}
export const getSnapshotByIdRef: GetSnapshotByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSnapshotByIdRef:
```typescript
const name = getSnapshotByIdRef.operationName;
console.log(name);
```

### Variables
The `GetSnapshotById` query requires an argument of type `GetSnapshotByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSnapshotByIdVariables {
  id: string;
}
```
### Return Type
Recall that executing the `GetSnapshotById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSnapshotByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetSnapshotByIdData {
  snapshot?: {
    id: string;
    uid: string;
    latitude: number;
    longitude: number;
    timestamp: TimestampString;
  } & Snapshot_Key;
}
```
### Using `GetSnapshotById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSnapshotById, GetSnapshotByIdVariables } from '@dataconnect/generated';

// The `GetSnapshotById` query requires an argument of type `GetSnapshotByIdVariables`:
const getSnapshotByIdVars: GetSnapshotByIdVariables = {
  id: ..., 
};

// Call the `getSnapshotById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSnapshotById(getSnapshotByIdVars);
// Variables can be defined inline as well.
const { data } = await getSnapshotById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSnapshotById(dataConnect, getSnapshotByIdVars);

console.log(data.snapshot);

// Or, you can use the `Promise` API.
getSnapshotById(getSnapshotByIdVars).then((response) => {
  const data = response.data;
  console.log(data.snapshot);
});
```

### Using `GetSnapshotById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSnapshotByIdRef, GetSnapshotByIdVariables } from '@dataconnect/generated';

// The `GetSnapshotById` query requires an argument of type `GetSnapshotByIdVariables`:
const getSnapshotByIdVars: GetSnapshotByIdVariables = {
  id: ..., 
};

// Call the `getSnapshotByIdRef()` function to get a reference to the query.
const ref = getSnapshotByIdRef(getSnapshotByIdVars);
// Variables can be defined inline as well.
const ref = getSnapshotByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSnapshotByIdRef(dataConnect, getSnapshotByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.snapshot);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.snapshot);
});
```

## GetSnapshotsByUid
You can execute the `GetSnapshotsByUid` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getSnapshotsByUid(vars: GetSnapshotsByUidVariables): QueryPromise<GetSnapshotsByUidData, GetSnapshotsByUidVariables>;

interface GetSnapshotsByUidRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSnapshotsByUidVariables): QueryRef<GetSnapshotsByUidData, GetSnapshotsByUidVariables>;
}
export const getSnapshotsByUidRef: GetSnapshotsByUidRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSnapshotsByUid(dc: DataConnect, vars: GetSnapshotsByUidVariables): QueryPromise<GetSnapshotsByUidData, GetSnapshotsByUidVariables>;

interface GetSnapshotsByUidRef {
  ...
  (dc: DataConnect, vars: GetSnapshotsByUidVariables): QueryRef<GetSnapshotsByUidData, GetSnapshotsByUidVariables>;
}
export const getSnapshotsByUidRef: GetSnapshotsByUidRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSnapshotsByUidRef:
```typescript
const name = getSnapshotsByUidRef.operationName;
console.log(name);
```

### Variables
The `GetSnapshotsByUid` query requires an argument of type `GetSnapshotsByUidVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSnapshotsByUidVariables {
  uid: string;
}
```
### Return Type
Recall that executing the `GetSnapshotsByUid` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSnapshotsByUidData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetSnapshotsByUidData {
  snapshots: ({
    id: string;
    uid: string;
    latitude: number;
    longitude: number;
    timestamp: TimestampString;
  } & Snapshot_Key)[];
}
```
### Using `GetSnapshotsByUid`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSnapshotsByUid, GetSnapshotsByUidVariables } from '@dataconnect/generated';

// The `GetSnapshotsByUid` query requires an argument of type `GetSnapshotsByUidVariables`:
const getSnapshotsByUidVars: GetSnapshotsByUidVariables = {
  uid: ..., 
};

// Call the `getSnapshotsByUid()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSnapshotsByUid(getSnapshotsByUidVars);
// Variables can be defined inline as well.
const { data } = await getSnapshotsByUid({ uid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSnapshotsByUid(dataConnect, getSnapshotsByUidVars);

console.log(data.snapshots);

// Or, you can use the `Promise` API.
getSnapshotsByUid(getSnapshotsByUidVars).then((response) => {
  const data = response.data;
  console.log(data.snapshots);
});
```

### Using `GetSnapshotsByUid`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSnapshotsByUidRef, GetSnapshotsByUidVariables } from '@dataconnect/generated';

// The `GetSnapshotsByUid` query requires an argument of type `GetSnapshotsByUidVariables`:
const getSnapshotsByUidVars: GetSnapshotsByUidVariables = {
  uid: ..., 
};

// Call the `getSnapshotsByUidRef()` function to get a reference to the query.
const ref = getSnapshotsByUidRef(getSnapshotsByUidVars);
// Variables can be defined inline as well.
const ref = getSnapshotsByUidRef({ uid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSnapshotsByUidRef(dataConnect, getSnapshotsByUidVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.snapshots);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.snapshots);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## InsertRelative
You can execute the `InsertRelative` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
insertRelative(vars: InsertRelativeVariables): MutationPromise<InsertRelativeData, InsertRelativeVariables>;

interface InsertRelativeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertRelativeVariables): MutationRef<InsertRelativeData, InsertRelativeVariables>;
}
export const insertRelativeRef: InsertRelativeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertRelative(dc: DataConnect, vars: InsertRelativeVariables): MutationPromise<InsertRelativeData, InsertRelativeVariables>;

interface InsertRelativeRef {
  ...
  (dc: DataConnect, vars: InsertRelativeVariables): MutationRef<InsertRelativeData, InsertRelativeVariables>;
}
export const insertRelativeRef: InsertRelativeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertRelativeRef:
```typescript
const name = insertRelativeRef.operationName;
console.log(name);
```

### Variables
The `InsertRelative` mutation requires an argument of type `InsertRelativeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InsertRelativeVariables {
  uid: string;
  phone: string;
}
```
### Return Type
Recall that executing the `InsertRelative` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertRelativeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertRelativeData {
  relative_insert: Relative_Key;
}
```
### Using `InsertRelative`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertRelative, InsertRelativeVariables } from '@dataconnect/generated';

// The `InsertRelative` mutation requires an argument of type `InsertRelativeVariables`:
const insertRelativeVars: InsertRelativeVariables = {
  uid: ..., 
  phone: ..., 
};

// Call the `insertRelative()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertRelative(insertRelativeVars);
// Variables can be defined inline as well.
const { data } = await insertRelative({ uid: ..., phone: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertRelative(dataConnect, insertRelativeVars);

console.log(data.relative_insert);

// Or, you can use the `Promise` API.
insertRelative(insertRelativeVars).then((response) => {
  const data = response.data;
  console.log(data.relative_insert);
});
```

### Using `InsertRelative`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertRelativeRef, InsertRelativeVariables } from '@dataconnect/generated';

// The `InsertRelative` mutation requires an argument of type `InsertRelativeVariables`:
const insertRelativeVars: InsertRelativeVariables = {
  uid: ..., 
  phone: ..., 
};

// Call the `insertRelativeRef()` function to get a reference to the mutation.
const ref = insertRelativeRef(insertRelativeVars);
// Variables can be defined inline as well.
const ref = insertRelativeRef({ uid: ..., phone: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertRelativeRef(dataConnect, insertRelativeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.relative_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.relative_insert);
});
```

## UpdateRelative
You can execute the `UpdateRelative` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateRelative(vars: UpdateRelativeVariables): MutationPromise<UpdateRelativeData, UpdateRelativeVariables>;

interface UpdateRelativeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateRelativeVariables): MutationRef<UpdateRelativeData, UpdateRelativeVariables>;
}
export const updateRelativeRef: UpdateRelativeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateRelative(dc: DataConnect, vars: UpdateRelativeVariables): MutationPromise<UpdateRelativeData, UpdateRelativeVariables>;

interface UpdateRelativeRef {
  ...
  (dc: DataConnect, vars: UpdateRelativeVariables): MutationRef<UpdateRelativeData, UpdateRelativeVariables>;
}
export const updateRelativeRef: UpdateRelativeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateRelativeRef:
```typescript
const name = updateRelativeRef.operationName;
console.log(name);
```

### Variables
The `UpdateRelative` mutation requires an argument of type `UpdateRelativeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateRelativeVariables {
  uid: string;
  phone: string;
}
```
### Return Type
Recall that executing the `UpdateRelative` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateRelativeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateRelativeData {
  relative_update?: Relative_Key | null;
}
```
### Using `UpdateRelative`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateRelative, UpdateRelativeVariables } from '@dataconnect/generated';

// The `UpdateRelative` mutation requires an argument of type `UpdateRelativeVariables`:
const updateRelativeVars: UpdateRelativeVariables = {
  uid: ..., 
  phone: ..., 
};

// Call the `updateRelative()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateRelative(updateRelativeVars);
// Variables can be defined inline as well.
const { data } = await updateRelative({ uid: ..., phone: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateRelative(dataConnect, updateRelativeVars);

console.log(data.relative_update);

// Or, you can use the `Promise` API.
updateRelative(updateRelativeVars).then((response) => {
  const data = response.data;
  console.log(data.relative_update);
});
```

### Using `UpdateRelative`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateRelativeRef, UpdateRelativeVariables } from '@dataconnect/generated';

// The `UpdateRelative` mutation requires an argument of type `UpdateRelativeVariables`:
const updateRelativeVars: UpdateRelativeVariables = {
  uid: ..., 
  phone: ..., 
};

// Call the `updateRelativeRef()` function to get a reference to the mutation.
const ref = updateRelativeRef(updateRelativeVars);
// Variables can be defined inline as well.
const ref = updateRelativeRef({ uid: ..., phone: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateRelativeRef(dataConnect, updateRelativeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.relative_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.relative_update);
});
```

## DeleteRelative
You can execute the `DeleteRelative` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteRelative(vars: DeleteRelativeVariables): MutationPromise<DeleteRelativeData, DeleteRelativeVariables>;

interface DeleteRelativeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteRelativeVariables): MutationRef<DeleteRelativeData, DeleteRelativeVariables>;
}
export const deleteRelativeRef: DeleteRelativeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteRelative(dc: DataConnect, vars: DeleteRelativeVariables): MutationPromise<DeleteRelativeData, DeleteRelativeVariables>;

interface DeleteRelativeRef {
  ...
  (dc: DataConnect, vars: DeleteRelativeVariables): MutationRef<DeleteRelativeData, DeleteRelativeVariables>;
}
export const deleteRelativeRef: DeleteRelativeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteRelativeRef:
```typescript
const name = deleteRelativeRef.operationName;
console.log(name);
```

### Variables
The `DeleteRelative` mutation requires an argument of type `DeleteRelativeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteRelativeVariables {
  uid: string;
}
```
### Return Type
Recall that executing the `DeleteRelative` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteRelativeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteRelativeData {
  relative_delete?: Relative_Key | null;
}
```
### Using `DeleteRelative`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteRelative, DeleteRelativeVariables } from '@dataconnect/generated';

// The `DeleteRelative` mutation requires an argument of type `DeleteRelativeVariables`:
const deleteRelativeVars: DeleteRelativeVariables = {
  uid: ..., 
};

// Call the `deleteRelative()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteRelative(deleteRelativeVars);
// Variables can be defined inline as well.
const { data } = await deleteRelative({ uid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteRelative(dataConnect, deleteRelativeVars);

console.log(data.relative_delete);

// Or, you can use the `Promise` API.
deleteRelative(deleteRelativeVars).then((response) => {
  const data = response.data;
  console.log(data.relative_delete);
});
```

### Using `DeleteRelative`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteRelativeRef, DeleteRelativeVariables } from '@dataconnect/generated';

// The `DeleteRelative` mutation requires an argument of type `DeleteRelativeVariables`:
const deleteRelativeVars: DeleteRelativeVariables = {
  uid: ..., 
};

// Call the `deleteRelativeRef()` function to get a reference to the mutation.
const ref = deleteRelativeRef(deleteRelativeVars);
// Variables can be defined inline as well.
const ref = deleteRelativeRef({ uid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteRelativeRef(dataConnect, deleteRelativeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.relative_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.relative_delete);
});
```

## InsertSnapshot
You can execute the `InsertSnapshot` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
insertSnapshot(vars: InsertSnapshotVariables): MutationPromise<InsertSnapshotData, InsertSnapshotVariables>;

interface InsertSnapshotRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertSnapshotVariables): MutationRef<InsertSnapshotData, InsertSnapshotVariables>;
}
export const insertSnapshotRef: InsertSnapshotRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertSnapshot(dc: DataConnect, vars: InsertSnapshotVariables): MutationPromise<InsertSnapshotData, InsertSnapshotVariables>;

interface InsertSnapshotRef {
  ...
  (dc: DataConnect, vars: InsertSnapshotVariables): MutationRef<InsertSnapshotData, InsertSnapshotVariables>;
}
export const insertSnapshotRef: InsertSnapshotRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertSnapshotRef:
```typescript
const name = insertSnapshotRef.operationName;
console.log(name);
```

### Variables
The `InsertSnapshot` mutation requires an argument of type `InsertSnapshotVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InsertSnapshotVariables {
  uid: string;
  latitude: number;
  longitude: number;
  timestamp: TimestampString;
}
```
### Return Type
Recall that executing the `InsertSnapshot` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertSnapshotData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertSnapshotData {
  snapshot_insert: Snapshot_Key;
}
```
### Using `InsertSnapshot`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertSnapshot, InsertSnapshotVariables } from '@dataconnect/generated';

// The `InsertSnapshot` mutation requires an argument of type `InsertSnapshotVariables`:
const insertSnapshotVars: InsertSnapshotVariables = {
  uid: ..., 
  latitude: ..., 
  longitude: ..., 
  timestamp: ..., 
};

// Call the `insertSnapshot()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertSnapshot(insertSnapshotVars);
// Variables can be defined inline as well.
const { data } = await insertSnapshot({ uid: ..., latitude: ..., longitude: ..., timestamp: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertSnapshot(dataConnect, insertSnapshotVars);

console.log(data.snapshot_insert);

// Or, you can use the `Promise` API.
insertSnapshot(insertSnapshotVars).then((response) => {
  const data = response.data;
  console.log(data.snapshot_insert);
});
```

### Using `InsertSnapshot`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertSnapshotRef, InsertSnapshotVariables } from '@dataconnect/generated';

// The `InsertSnapshot` mutation requires an argument of type `InsertSnapshotVariables`:
const insertSnapshotVars: InsertSnapshotVariables = {
  uid: ..., 
  latitude: ..., 
  longitude: ..., 
  timestamp: ..., 
};

// Call the `insertSnapshotRef()` function to get a reference to the mutation.
const ref = insertSnapshotRef(insertSnapshotVars);
// Variables can be defined inline as well.
const ref = insertSnapshotRef({ uid: ..., latitude: ..., longitude: ..., timestamp: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertSnapshotRef(dataConnect, insertSnapshotVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.snapshot_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.snapshot_insert);
});
```

## UpdateSnapshot
You can execute the `UpdateSnapshot` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateSnapshot(vars: UpdateSnapshotVariables): MutationPromise<UpdateSnapshotData, UpdateSnapshotVariables>;

interface UpdateSnapshotRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSnapshotVariables): MutationRef<UpdateSnapshotData, UpdateSnapshotVariables>;
}
export const updateSnapshotRef: UpdateSnapshotRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSnapshot(dc: DataConnect, vars: UpdateSnapshotVariables): MutationPromise<UpdateSnapshotData, UpdateSnapshotVariables>;

interface UpdateSnapshotRef {
  ...
  (dc: DataConnect, vars: UpdateSnapshotVariables): MutationRef<UpdateSnapshotData, UpdateSnapshotVariables>;
}
export const updateSnapshotRef: UpdateSnapshotRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateSnapshotRef:
```typescript
const name = updateSnapshotRef.operationName;
console.log(name);
```

### Variables
The `UpdateSnapshot` mutation requires an argument of type `UpdateSnapshotVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateSnapshotVariables {
  id: string;
  latitude?: number | null;
  longitude?: number | null;
  timestamp?: TimestampString | null;
}
```
### Return Type
Recall that executing the `UpdateSnapshot` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateSnapshotData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateSnapshotData {
  snapshot_update?: Snapshot_Key | null;
}
```
### Using `UpdateSnapshot`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSnapshot, UpdateSnapshotVariables } from '@dataconnect/generated';

// The `UpdateSnapshot` mutation requires an argument of type `UpdateSnapshotVariables`:
const updateSnapshotVars: UpdateSnapshotVariables = {
  id: ..., 
  latitude: ..., // optional
  longitude: ..., // optional
  timestamp: ..., // optional
};

// Call the `updateSnapshot()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSnapshot(updateSnapshotVars);
// Variables can be defined inline as well.
const { data } = await updateSnapshot({ id: ..., latitude: ..., longitude: ..., timestamp: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSnapshot(dataConnect, updateSnapshotVars);

console.log(data.snapshot_update);

// Or, you can use the `Promise` API.
updateSnapshot(updateSnapshotVars).then((response) => {
  const data = response.data;
  console.log(data.snapshot_update);
});
```

### Using `UpdateSnapshot`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateSnapshotRef, UpdateSnapshotVariables } from '@dataconnect/generated';

// The `UpdateSnapshot` mutation requires an argument of type `UpdateSnapshotVariables`:
const updateSnapshotVars: UpdateSnapshotVariables = {
  id: ..., 
  latitude: ..., // optional
  longitude: ..., // optional
  timestamp: ..., // optional
};

// Call the `updateSnapshotRef()` function to get a reference to the mutation.
const ref = updateSnapshotRef(updateSnapshotVars);
// Variables can be defined inline as well.
const ref = updateSnapshotRef({ id: ..., latitude: ..., longitude: ..., timestamp: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateSnapshotRef(dataConnect, updateSnapshotVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.snapshot_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.snapshot_update);
});
```

## DeleteSnapshot
You can execute the `DeleteSnapshot` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteSnapshot(vars: DeleteSnapshotVariables): MutationPromise<DeleteSnapshotData, DeleteSnapshotVariables>;

interface DeleteSnapshotRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSnapshotVariables): MutationRef<DeleteSnapshotData, DeleteSnapshotVariables>;
}
export const deleteSnapshotRef: DeleteSnapshotRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteSnapshot(dc: DataConnect, vars: DeleteSnapshotVariables): MutationPromise<DeleteSnapshotData, DeleteSnapshotVariables>;

interface DeleteSnapshotRef {
  ...
  (dc: DataConnect, vars: DeleteSnapshotVariables): MutationRef<DeleteSnapshotData, DeleteSnapshotVariables>;
}
export const deleteSnapshotRef: DeleteSnapshotRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteSnapshotRef:
```typescript
const name = deleteSnapshotRef.operationName;
console.log(name);
```

### Variables
The `DeleteSnapshot` mutation requires an argument of type `DeleteSnapshotVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteSnapshotVariables {
  id: string;
}
```
### Return Type
Recall that executing the `DeleteSnapshot` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteSnapshotData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteSnapshotData {
  snapshot_delete?: Snapshot_Key | null;
}
```
### Using `DeleteSnapshot`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteSnapshot, DeleteSnapshotVariables } from '@dataconnect/generated';

// The `DeleteSnapshot` mutation requires an argument of type `DeleteSnapshotVariables`:
const deleteSnapshotVars: DeleteSnapshotVariables = {
  id: ..., 
};

// Call the `deleteSnapshot()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteSnapshot(deleteSnapshotVars);
// Variables can be defined inline as well.
const { data } = await deleteSnapshot({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteSnapshot(dataConnect, deleteSnapshotVars);

console.log(data.snapshot_delete);

// Or, you can use the `Promise` API.
deleteSnapshot(deleteSnapshotVars).then((response) => {
  const data = response.data;
  console.log(data.snapshot_delete);
});
```

### Using `DeleteSnapshot`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteSnapshotRef, DeleteSnapshotVariables } from '@dataconnect/generated';

// The `DeleteSnapshot` mutation requires an argument of type `DeleteSnapshotVariables`:
const deleteSnapshotVars: DeleteSnapshotVariables = {
  id: ..., 
};

// Call the `deleteSnapshotRef()` function to get a reference to the mutation.
const ref = deleteSnapshotRef(deleteSnapshotVars);
// Variables can be defined inline as well.
const ref = deleteSnapshotRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteSnapshotRef(dataConnect, deleteSnapshotVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.snapshot_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.snapshot_delete);
});
```

