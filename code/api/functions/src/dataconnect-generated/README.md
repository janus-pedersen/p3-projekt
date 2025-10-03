# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMyProfile*](#getmyprofile)
  - [*GetUserById*](#getuserbyid)
  - [*GetUserByDeviceId*](#getuserbydeviceid)
  - [*GetEmergencyContacts*](#getemergencycontacts)
  - [*GetMyPatients*](#getmypatients)
  - [*GetMyRelatives*](#getmyrelatives)
  - [*GetAllUserRelationships*](#getalluserrelationships)
  - [*SearchUsers*](#searchusers)
- [**Mutations**](#mutations)
  - [*UpsertUser*](#upsertuser)
  - [*UpdateUserDevice*](#updateuserdevice)
  - [*AddRelation*](#addrelation)
  - [*UpdateRelation*](#updaterelation)
  - [*RemoveRelation*](#removerelation)
  - [*AddMyselfAsRelative*](#addmyselfasrelative)

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

## GetMyProfile
You can execute the `GetMyProfile` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyProfile(): QueryPromise<GetMyProfileData, undefined>;

interface GetMyProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyProfileData, undefined>;
}
export const getMyProfileRef: GetMyProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyProfile(dc: DataConnect): QueryPromise<GetMyProfileData, undefined>;

interface GetMyProfileRef {
  ...
  (dc: DataConnect): QueryRef<GetMyProfileData, undefined>;
}
export const getMyProfileRef: GetMyProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyProfileRef:
```typescript
const name = getMyProfileRef.operationName;
console.log(name);
```

### Variables
The `GetMyProfile` query has no variables.
### Return Type
Recall that executing the `GetMyProfile` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyProfile } from '@dataconnect/generated';


// Call the `getMyProfile()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyProfile();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyProfile(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getMyProfile().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetMyProfile`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyProfileRef } from '@dataconnect/generated';


// Call the `getMyProfileRef()` function to get a reference to the query.
const ref = getMyProfileRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyProfileRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## GetUserById
You can execute the `GetUserById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserById(vars: GetUserByIdVariables): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

interface GetUserByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
}
export const getUserByIdRef: GetUserByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserById(dc: DataConnect, vars: GetUserByIdVariables): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

interface GetUserByIdRef {
  ...
  (dc: DataConnect, vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
}
export const getUserByIdRef: GetUserByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserByIdRef:
```typescript
const name = getUserByIdRef.operationName;
console.log(name);
```

### Variables
The `GetUserById` query requires an argument of type `GetUserByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserByIdVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `GetUserById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserById, GetUserByIdVariables } from '@dataconnect/generated';

// The `GetUserById` query requires an argument of type `GetUserByIdVariables`:
const getUserByIdVars: GetUserByIdVariables = {
  userId: ..., 
};

// Call the `getUserById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserById(getUserByIdVars);
// Variables can be defined inline as well.
const { data } = await getUserById({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserById(dataConnect, getUserByIdVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getUserById(getUserByIdVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUserById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserByIdRef, GetUserByIdVariables } from '@dataconnect/generated';

// The `GetUserById` query requires an argument of type `GetUserByIdVariables`:
const getUserByIdVars: GetUserByIdVariables = {
  userId: ..., 
};

// Call the `getUserByIdRef()` function to get a reference to the query.
const ref = getUserByIdRef(getUserByIdVars);
// Variables can be defined inline as well.
const ref = getUserByIdRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserByIdRef(dataConnect, getUserByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## GetUserByDeviceId
You can execute the `GetUserByDeviceId` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserByDeviceId(vars: GetUserByDeviceIdVariables): QueryPromise<GetUserByDeviceIdData, GetUserByDeviceIdVariables>;

interface GetUserByDeviceIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByDeviceIdVariables): QueryRef<GetUserByDeviceIdData, GetUserByDeviceIdVariables>;
}
export const getUserByDeviceIdRef: GetUserByDeviceIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserByDeviceId(dc: DataConnect, vars: GetUserByDeviceIdVariables): QueryPromise<GetUserByDeviceIdData, GetUserByDeviceIdVariables>;

interface GetUserByDeviceIdRef {
  ...
  (dc: DataConnect, vars: GetUserByDeviceIdVariables): QueryRef<GetUserByDeviceIdData, GetUserByDeviceIdVariables>;
}
export const getUserByDeviceIdRef: GetUserByDeviceIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserByDeviceIdRef:
```typescript
const name = getUserByDeviceIdRef.operationName;
console.log(name);
```

### Variables
The `GetUserByDeviceId` query requires an argument of type `GetUserByDeviceIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserByDeviceIdVariables {
  deviceId: string;
}
```
### Return Type
Recall that executing the `GetUserByDeviceId` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserByDeviceIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserByDeviceId`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserByDeviceId, GetUserByDeviceIdVariables } from '@dataconnect/generated';

// The `GetUserByDeviceId` query requires an argument of type `GetUserByDeviceIdVariables`:
const getUserByDeviceIdVars: GetUserByDeviceIdVariables = {
  deviceId: ..., 
};

// Call the `getUserByDeviceId()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserByDeviceId(getUserByDeviceIdVars);
// Variables can be defined inline as well.
const { data } = await getUserByDeviceId({ deviceId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserByDeviceId(dataConnect, getUserByDeviceIdVars);

console.log(data.users);

// Or, you can use the `Promise` API.
getUserByDeviceId(getUserByDeviceIdVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetUserByDeviceId`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserByDeviceIdRef, GetUserByDeviceIdVariables } from '@dataconnect/generated';

// The `GetUserByDeviceId` query requires an argument of type `GetUserByDeviceIdVariables`:
const getUserByDeviceIdVars: GetUserByDeviceIdVariables = {
  deviceId: ..., 
};

// Call the `getUserByDeviceIdRef()` function to get a reference to the query.
const ref = getUserByDeviceIdRef(getUserByDeviceIdVars);
// Variables can be defined inline as well.
const ref = getUserByDeviceIdRef({ deviceId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserByDeviceIdRef(dataConnect, getUserByDeviceIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetEmergencyContacts
You can execute the `GetEmergencyContacts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEmergencyContacts(vars: GetEmergencyContactsVariables): QueryPromise<GetEmergencyContactsData, GetEmergencyContactsVariables>;

interface GetEmergencyContactsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEmergencyContactsVariables): QueryRef<GetEmergencyContactsData, GetEmergencyContactsVariables>;
}
export const getEmergencyContactsRef: GetEmergencyContactsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEmergencyContacts(dc: DataConnect, vars: GetEmergencyContactsVariables): QueryPromise<GetEmergencyContactsData, GetEmergencyContactsVariables>;

interface GetEmergencyContactsRef {
  ...
  (dc: DataConnect, vars: GetEmergencyContactsVariables): QueryRef<GetEmergencyContactsData, GetEmergencyContactsVariables>;
}
export const getEmergencyContactsRef: GetEmergencyContactsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEmergencyContactsRef:
```typescript
const name = getEmergencyContactsRef.operationName;
console.log(name);
```

### Variables
The `GetEmergencyContacts` query requires an argument of type `GetEmergencyContactsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEmergencyContactsVariables {
  patientId: string;
}
```
### Return Type
Recall that executing the `GetEmergencyContacts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEmergencyContactsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetEmergencyContacts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEmergencyContacts, GetEmergencyContactsVariables } from '@dataconnect/generated';

// The `GetEmergencyContacts` query requires an argument of type `GetEmergencyContactsVariables`:
const getEmergencyContactsVars: GetEmergencyContactsVariables = {
  patientId: ..., 
};

// Call the `getEmergencyContacts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEmergencyContacts(getEmergencyContactsVars);
// Variables can be defined inline as well.
const { data } = await getEmergencyContacts({ patientId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEmergencyContacts(dataConnect, getEmergencyContactsVars);

console.log(data.relations);

// Or, you can use the `Promise` API.
getEmergencyContacts(getEmergencyContactsVars).then((response) => {
  const data = response.data;
  console.log(data.relations);
});
```

### Using `GetEmergencyContacts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEmergencyContactsRef, GetEmergencyContactsVariables } from '@dataconnect/generated';

// The `GetEmergencyContacts` query requires an argument of type `GetEmergencyContactsVariables`:
const getEmergencyContactsVars: GetEmergencyContactsVariables = {
  patientId: ..., 
};

// Call the `getEmergencyContactsRef()` function to get a reference to the query.
const ref = getEmergencyContactsRef(getEmergencyContactsVars);
// Variables can be defined inline as well.
const ref = getEmergencyContactsRef({ patientId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEmergencyContactsRef(dataConnect, getEmergencyContactsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.relations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.relations);
});
```

## GetMyPatients
You can execute the `GetMyPatients` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyPatients(): QueryPromise<GetMyPatientsData, undefined>;

interface GetMyPatientsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyPatientsData, undefined>;
}
export const getMyPatientsRef: GetMyPatientsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyPatients(dc: DataConnect): QueryPromise<GetMyPatientsData, undefined>;

interface GetMyPatientsRef {
  ...
  (dc: DataConnect): QueryRef<GetMyPatientsData, undefined>;
}
export const getMyPatientsRef: GetMyPatientsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyPatientsRef:
```typescript
const name = getMyPatientsRef.operationName;
console.log(name);
```

### Variables
The `GetMyPatients` query has no variables.
### Return Type
Recall that executing the `GetMyPatients` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyPatientsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyPatients`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyPatients } from '@dataconnect/generated';


// Call the `getMyPatients()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyPatients();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyPatients(dataConnect);

console.log(data.relations);

// Or, you can use the `Promise` API.
getMyPatients().then((response) => {
  const data = response.data;
  console.log(data.relations);
});
```

### Using `GetMyPatients`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyPatientsRef } from '@dataconnect/generated';


// Call the `getMyPatientsRef()` function to get a reference to the query.
const ref = getMyPatientsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyPatientsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.relations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.relations);
});
```

## GetMyRelatives
You can execute the `GetMyRelatives` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyRelatives(): QueryPromise<GetMyRelativesData, undefined>;

interface GetMyRelativesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyRelativesData, undefined>;
}
export const getMyRelativesRef: GetMyRelativesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyRelatives(dc: DataConnect): QueryPromise<GetMyRelativesData, undefined>;

interface GetMyRelativesRef {
  ...
  (dc: DataConnect): QueryRef<GetMyRelativesData, undefined>;
}
export const getMyRelativesRef: GetMyRelativesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyRelativesRef:
```typescript
const name = getMyRelativesRef.operationName;
console.log(name);
```

### Variables
The `GetMyRelatives` query has no variables.
### Return Type
Recall that executing the `GetMyRelatives` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyRelativesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyRelatives`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyRelatives } from '@dataconnect/generated';


// Call the `getMyRelatives()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyRelatives();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyRelatives(dataConnect);

console.log(data.relations);

// Or, you can use the `Promise` API.
getMyRelatives().then((response) => {
  const data = response.data;
  console.log(data.relations);
});
```

### Using `GetMyRelatives`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyRelativesRef } from '@dataconnect/generated';


// Call the `getMyRelativesRef()` function to get a reference to the query.
const ref = getMyRelativesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyRelativesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.relations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.relations);
});
```

## GetAllUserRelationships
You can execute the `GetAllUserRelationships` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAllUserRelationships(vars: GetAllUserRelationshipsVariables): QueryPromise<GetAllUserRelationshipsData, GetAllUserRelationshipsVariables>;

interface GetAllUserRelationshipsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAllUserRelationshipsVariables): QueryRef<GetAllUserRelationshipsData, GetAllUserRelationshipsVariables>;
}
export const getAllUserRelationshipsRef: GetAllUserRelationshipsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAllUserRelationships(dc: DataConnect, vars: GetAllUserRelationshipsVariables): QueryPromise<GetAllUserRelationshipsData, GetAllUserRelationshipsVariables>;

interface GetAllUserRelationshipsRef {
  ...
  (dc: DataConnect, vars: GetAllUserRelationshipsVariables): QueryRef<GetAllUserRelationshipsData, GetAllUserRelationshipsVariables>;
}
export const getAllUserRelationshipsRef: GetAllUserRelationshipsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAllUserRelationshipsRef:
```typescript
const name = getAllUserRelationshipsRef.operationName;
console.log(name);
```

### Variables
The `GetAllUserRelationships` query requires an argument of type `GetAllUserRelationshipsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAllUserRelationshipsVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `GetAllUserRelationships` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAllUserRelationshipsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAllUserRelationships`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAllUserRelationships, GetAllUserRelationshipsVariables } from '@dataconnect/generated';

// The `GetAllUserRelationships` query requires an argument of type `GetAllUserRelationshipsVariables`:
const getAllUserRelationshipsVars: GetAllUserRelationshipsVariables = {
  userId: ..., 
};

// Call the `getAllUserRelationships()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAllUserRelationships(getAllUserRelationshipsVars);
// Variables can be defined inline as well.
const { data } = await getAllUserRelationships({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAllUserRelationships(dataConnect, getAllUserRelationshipsVars);

console.log(data.asPatient);
console.log(data.asRelative);

// Or, you can use the `Promise` API.
getAllUserRelationships(getAllUserRelationshipsVars).then((response) => {
  const data = response.data;
  console.log(data.asPatient);
  console.log(data.asRelative);
});
```

### Using `GetAllUserRelationships`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAllUserRelationshipsRef, GetAllUserRelationshipsVariables } from '@dataconnect/generated';

// The `GetAllUserRelationships` query requires an argument of type `GetAllUserRelationshipsVariables`:
const getAllUserRelationshipsVars: GetAllUserRelationshipsVariables = {
  userId: ..., 
};

// Call the `getAllUserRelationshipsRef()` function to get a reference to the query.
const ref = getAllUserRelationshipsRef(getAllUserRelationshipsVars);
// Variables can be defined inline as well.
const ref = getAllUserRelationshipsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAllUserRelationshipsRef(dataConnect, getAllUserRelationshipsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.asPatient);
console.log(data.asRelative);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.asPatient);
  console.log(data.asRelative);
});
```

## SearchUsers
You can execute the `SearchUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
searchUsers(vars: SearchUsersVariables): QueryPromise<SearchUsersData, SearchUsersVariables>;

interface SearchUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchUsersVariables): QueryRef<SearchUsersData, SearchUsersVariables>;
}
export const searchUsersRef: SearchUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
searchUsers(dc: DataConnect, vars: SearchUsersVariables): QueryPromise<SearchUsersData, SearchUsersVariables>;

interface SearchUsersRef {
  ...
  (dc: DataConnect, vars: SearchUsersVariables): QueryRef<SearchUsersData, SearchUsersVariables>;
}
export const searchUsersRef: SearchUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchUsersRef:
```typescript
const name = searchUsersRef.operationName;
console.log(name);
```

### Variables
The `SearchUsers` query requires an argument of type `SearchUsersVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchUsersVariables {
  searchTerm: string;
}
```
### Return Type
Recall that executing the `SearchUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SearchUsersData {
  users: ({
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
  } & User_Key)[];
}
```
### Using `SearchUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, searchUsers, SearchUsersVariables } from '@dataconnect/generated';

// The `SearchUsers` query requires an argument of type `SearchUsersVariables`:
const searchUsersVars: SearchUsersVariables = {
  searchTerm: ..., 
};

// Call the `searchUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchUsers(searchUsersVars);
// Variables can be defined inline as well.
const { data } = await searchUsers({ searchTerm: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await searchUsers(dataConnect, searchUsersVars);

console.log(data.users);

// Or, you can use the `Promise` API.
searchUsers(searchUsersVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `SearchUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchUsersRef, SearchUsersVariables } from '@dataconnect/generated';

// The `SearchUsers` query requires an argument of type `SearchUsersVariables`:
const searchUsersVars: SearchUsersVariables = {
  searchTerm: ..., 
};

// Call the `searchUsersRef()` function to get a reference to the query.
const ref = searchUsersRef(searchUsersVars);
// Variables can be defined inline as well.
const ref = searchUsersRef({ searchTerm: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchUsersRef(dataConnect, searchUsersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
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

## UpsertUser
You can execute the `UpsertUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertUserRef:
```typescript
const name = upsertUserRef.operationName;
console.log(name);
```

### Variables
The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertUserVariables {
  username: string;
  email?: string | null;
  phone: string;
  firstName: string;
  lastName: string;
  deviceId?: string | null;
}
```
### Return Type
Recall that executing the `UpsertUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertUserData {
  user_upsert: User_Key;
}
```
### Using `UpsertUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertUser, UpsertUserVariables } from '@dataconnect/generated';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  username: ..., 
  email: ..., // optional
  phone: ..., 
  firstName: ..., 
  lastName: ..., 
  deviceId: ..., // optional
};

// Call the `upsertUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertUser(upsertUserVars);
// Variables can be defined inline as well.
const { data } = await upsertUser({ username: ..., email: ..., phone: ..., firstName: ..., lastName: ..., deviceId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertUser(dataConnect, upsertUserVars);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
upsertUser(upsertUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `UpsertUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertUserRef, UpsertUserVariables } from '@dataconnect/generated';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  username: ..., 
  email: ..., // optional
  phone: ..., 
  firstName: ..., 
  lastName: ..., 
  deviceId: ..., // optional
};

// Call the `upsertUserRef()` function to get a reference to the mutation.
const ref = upsertUserRef(upsertUserVars);
// Variables can be defined inline as well.
const ref = upsertUserRef({ username: ..., email: ..., phone: ..., firstName: ..., lastName: ..., deviceId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertUserRef(dataConnect, upsertUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

## UpdateUserDevice
You can execute the `UpdateUserDevice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUserDevice(vars: UpdateUserDeviceVariables): MutationPromise<UpdateUserDeviceData, UpdateUserDeviceVariables>;

interface UpdateUserDeviceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserDeviceVariables): MutationRef<UpdateUserDeviceData, UpdateUserDeviceVariables>;
}
export const updateUserDeviceRef: UpdateUserDeviceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserDevice(dc: DataConnect, vars: UpdateUserDeviceVariables): MutationPromise<UpdateUserDeviceData, UpdateUserDeviceVariables>;

interface UpdateUserDeviceRef {
  ...
  (dc: DataConnect, vars: UpdateUserDeviceVariables): MutationRef<UpdateUserDeviceData, UpdateUserDeviceVariables>;
}
export const updateUserDeviceRef: UpdateUserDeviceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserDeviceRef:
```typescript
const name = updateUserDeviceRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserDevice` mutation requires an argument of type `UpdateUserDeviceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserDeviceVariables {
  deviceId: string;
}
```
### Return Type
Recall that executing the `UpdateUserDevice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserDeviceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserDeviceData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUserDevice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserDevice, UpdateUserDeviceVariables } from '@dataconnect/generated';

// The `UpdateUserDevice` mutation requires an argument of type `UpdateUserDeviceVariables`:
const updateUserDeviceVars: UpdateUserDeviceVariables = {
  deviceId: ..., 
};

// Call the `updateUserDevice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserDevice(updateUserDeviceVars);
// Variables can be defined inline as well.
const { data } = await updateUserDevice({ deviceId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserDevice(dataConnect, updateUserDeviceVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUserDevice(updateUserDeviceVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUserDevice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserDeviceRef, UpdateUserDeviceVariables } from '@dataconnect/generated';

// The `UpdateUserDevice` mutation requires an argument of type `UpdateUserDeviceVariables`:
const updateUserDeviceVars: UpdateUserDeviceVariables = {
  deviceId: ..., 
};

// Call the `updateUserDeviceRef()` function to get a reference to the mutation.
const ref = updateUserDeviceRef(updateUserDeviceVars);
// Variables can be defined inline as well.
const ref = updateUserDeviceRef({ deviceId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserDeviceRef(dataConnect, updateUserDeviceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## AddRelation
You can execute the `AddRelation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addRelation(vars: AddRelationVariables): MutationPromise<AddRelationData, AddRelationVariables>;

interface AddRelationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddRelationVariables): MutationRef<AddRelationData, AddRelationVariables>;
}
export const addRelationRef: AddRelationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addRelation(dc: DataConnect, vars: AddRelationVariables): MutationPromise<AddRelationData, AddRelationVariables>;

interface AddRelationRef {
  ...
  (dc: DataConnect, vars: AddRelationVariables): MutationRef<AddRelationData, AddRelationVariables>;
}
export const addRelationRef: AddRelationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addRelationRef:
```typescript
const name = addRelationRef.operationName;
console.log(name);
```

### Variables
The `AddRelation` mutation requires an argument of type `AddRelationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddRelationVariables {
  patientId: string;
  relativeId: string;
  relationshipType?: string | null;
  isEmergencyContact?: boolean | null;
}
```
### Return Type
Recall that executing the `AddRelation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddRelationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddRelationData {
  relation_insert: Relation_Key;
}
```
### Using `AddRelation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addRelation, AddRelationVariables } from '@dataconnect/generated';

// The `AddRelation` mutation requires an argument of type `AddRelationVariables`:
const addRelationVars: AddRelationVariables = {
  patientId: ..., 
  relativeId: ..., 
  relationshipType: ..., // optional
  isEmergencyContact: ..., // optional
};

// Call the `addRelation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addRelation(addRelationVars);
// Variables can be defined inline as well.
const { data } = await addRelation({ patientId: ..., relativeId: ..., relationshipType: ..., isEmergencyContact: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addRelation(dataConnect, addRelationVars);

console.log(data.relation_insert);

// Or, you can use the `Promise` API.
addRelation(addRelationVars).then((response) => {
  const data = response.data;
  console.log(data.relation_insert);
});
```

### Using `AddRelation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addRelationRef, AddRelationVariables } from '@dataconnect/generated';

// The `AddRelation` mutation requires an argument of type `AddRelationVariables`:
const addRelationVars: AddRelationVariables = {
  patientId: ..., 
  relativeId: ..., 
  relationshipType: ..., // optional
  isEmergencyContact: ..., // optional
};

// Call the `addRelationRef()` function to get a reference to the mutation.
const ref = addRelationRef(addRelationVars);
// Variables can be defined inline as well.
const ref = addRelationRef({ patientId: ..., relativeId: ..., relationshipType: ..., isEmergencyContact: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addRelationRef(dataConnect, addRelationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.relation_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.relation_insert);
});
```

## UpdateRelation
You can execute the `UpdateRelation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateRelation(vars: UpdateRelationVariables): MutationPromise<UpdateRelationData, UpdateRelationVariables>;

interface UpdateRelationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateRelationVariables): MutationRef<UpdateRelationData, UpdateRelationVariables>;
}
export const updateRelationRef: UpdateRelationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateRelation(dc: DataConnect, vars: UpdateRelationVariables): MutationPromise<UpdateRelationData, UpdateRelationVariables>;

interface UpdateRelationRef {
  ...
  (dc: DataConnect, vars: UpdateRelationVariables): MutationRef<UpdateRelationData, UpdateRelationVariables>;
}
export const updateRelationRef: UpdateRelationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateRelationRef:
```typescript
const name = updateRelationRef.operationName;
console.log(name);
```

### Variables
The `UpdateRelation` mutation requires an argument of type `UpdateRelationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateRelationVariables {
  relationId: string;
  relationshipType?: string | null;
  isEmergencyContact?: boolean | null;
}
```
### Return Type
Recall that executing the `UpdateRelation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateRelationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateRelationData {
  relation_update?: Relation_Key | null;
}
```
### Using `UpdateRelation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateRelation, UpdateRelationVariables } from '@dataconnect/generated';

// The `UpdateRelation` mutation requires an argument of type `UpdateRelationVariables`:
const updateRelationVars: UpdateRelationVariables = {
  relationId: ..., 
  relationshipType: ..., // optional
  isEmergencyContact: ..., // optional
};

// Call the `updateRelation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateRelation(updateRelationVars);
// Variables can be defined inline as well.
const { data } = await updateRelation({ relationId: ..., relationshipType: ..., isEmergencyContact: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateRelation(dataConnect, updateRelationVars);

console.log(data.relation_update);

// Or, you can use the `Promise` API.
updateRelation(updateRelationVars).then((response) => {
  const data = response.data;
  console.log(data.relation_update);
});
```

### Using `UpdateRelation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateRelationRef, UpdateRelationVariables } from '@dataconnect/generated';

// The `UpdateRelation` mutation requires an argument of type `UpdateRelationVariables`:
const updateRelationVars: UpdateRelationVariables = {
  relationId: ..., 
  relationshipType: ..., // optional
  isEmergencyContact: ..., // optional
};

// Call the `updateRelationRef()` function to get a reference to the mutation.
const ref = updateRelationRef(updateRelationVars);
// Variables can be defined inline as well.
const ref = updateRelationRef({ relationId: ..., relationshipType: ..., isEmergencyContact: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateRelationRef(dataConnect, updateRelationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.relation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.relation_update);
});
```

## RemoveRelation
You can execute the `RemoveRelation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
removeRelation(vars: RemoveRelationVariables): MutationPromise<RemoveRelationData, RemoveRelationVariables>;

interface RemoveRelationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveRelationVariables): MutationRef<RemoveRelationData, RemoveRelationVariables>;
}
export const removeRelationRef: RemoveRelationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeRelation(dc: DataConnect, vars: RemoveRelationVariables): MutationPromise<RemoveRelationData, RemoveRelationVariables>;

interface RemoveRelationRef {
  ...
  (dc: DataConnect, vars: RemoveRelationVariables): MutationRef<RemoveRelationData, RemoveRelationVariables>;
}
export const removeRelationRef: RemoveRelationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeRelationRef:
```typescript
const name = removeRelationRef.operationName;
console.log(name);
```

### Variables
The `RemoveRelation` mutation requires an argument of type `RemoveRelationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveRelationVariables {
  relationId: string;
}
```
### Return Type
Recall that executing the `RemoveRelation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveRelationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveRelationData {
  relation_delete?: Relation_Key | null;
}
```
### Using `RemoveRelation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeRelation, RemoveRelationVariables } from '@dataconnect/generated';

// The `RemoveRelation` mutation requires an argument of type `RemoveRelationVariables`:
const removeRelationVars: RemoveRelationVariables = {
  relationId: ..., 
};

// Call the `removeRelation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeRelation(removeRelationVars);
// Variables can be defined inline as well.
const { data } = await removeRelation({ relationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeRelation(dataConnect, removeRelationVars);

console.log(data.relation_delete);

// Or, you can use the `Promise` API.
removeRelation(removeRelationVars).then((response) => {
  const data = response.data;
  console.log(data.relation_delete);
});
```

### Using `RemoveRelation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeRelationRef, RemoveRelationVariables } from '@dataconnect/generated';

// The `RemoveRelation` mutation requires an argument of type `RemoveRelationVariables`:
const removeRelationVars: RemoveRelationVariables = {
  relationId: ..., 
};

// Call the `removeRelationRef()` function to get a reference to the mutation.
const ref = removeRelationRef(removeRelationVars);
// Variables can be defined inline as well.
const ref = removeRelationRef({ relationId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeRelationRef(dataConnect, removeRelationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.relation_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.relation_delete);
});
```

## AddMyselfAsRelative
You can execute the `AddMyselfAsRelative` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addMyselfAsRelative(vars: AddMyselfAsRelativeVariables): MutationPromise<AddMyselfAsRelativeData, AddMyselfAsRelativeVariables>;

interface AddMyselfAsRelativeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddMyselfAsRelativeVariables): MutationRef<AddMyselfAsRelativeData, AddMyselfAsRelativeVariables>;
}
export const addMyselfAsRelativeRef: AddMyselfAsRelativeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addMyselfAsRelative(dc: DataConnect, vars: AddMyselfAsRelativeVariables): MutationPromise<AddMyselfAsRelativeData, AddMyselfAsRelativeVariables>;

interface AddMyselfAsRelativeRef {
  ...
  (dc: DataConnect, vars: AddMyselfAsRelativeVariables): MutationRef<AddMyselfAsRelativeData, AddMyselfAsRelativeVariables>;
}
export const addMyselfAsRelativeRef: AddMyselfAsRelativeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addMyselfAsRelativeRef:
```typescript
const name = addMyselfAsRelativeRef.operationName;
console.log(name);
```

### Variables
The `AddMyselfAsRelative` mutation requires an argument of type `AddMyselfAsRelativeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddMyselfAsRelativeVariables {
  patientId: string;
  relationshipType: string;
}
```
### Return Type
Recall that executing the `AddMyselfAsRelative` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddMyselfAsRelativeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddMyselfAsRelativeData {
  relation_insert: Relation_Key;
}
```
### Using `AddMyselfAsRelative`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addMyselfAsRelative, AddMyselfAsRelativeVariables } from '@dataconnect/generated';

// The `AddMyselfAsRelative` mutation requires an argument of type `AddMyselfAsRelativeVariables`:
const addMyselfAsRelativeVars: AddMyselfAsRelativeVariables = {
  patientId: ..., 
  relationshipType: ..., 
};

// Call the `addMyselfAsRelative()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addMyselfAsRelative(addMyselfAsRelativeVars);
// Variables can be defined inline as well.
const { data } = await addMyselfAsRelative({ patientId: ..., relationshipType: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addMyselfAsRelative(dataConnect, addMyselfAsRelativeVars);

console.log(data.relation_insert);

// Or, you can use the `Promise` API.
addMyselfAsRelative(addMyselfAsRelativeVars).then((response) => {
  const data = response.data;
  console.log(data.relation_insert);
});
```

### Using `AddMyselfAsRelative`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addMyselfAsRelativeRef, AddMyselfAsRelativeVariables } from '@dataconnect/generated';

// The `AddMyselfAsRelative` mutation requires an argument of type `AddMyselfAsRelativeVariables`:
const addMyselfAsRelativeVars: AddMyselfAsRelativeVariables = {
  patientId: ..., 
  relationshipType: ..., 
};

// Call the `addMyselfAsRelativeRef()` function to get a reference to the mutation.
const ref = addMyselfAsRelativeRef(addMyselfAsRelativeVars);
// Variables can be defined inline as well.
const ref = addMyselfAsRelativeRef({ patientId: ..., relationshipType: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addMyselfAsRelativeRef(dataConnect, addMyselfAsRelativeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.relation_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.relation_insert);
});
```

