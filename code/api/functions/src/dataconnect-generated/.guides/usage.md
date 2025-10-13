# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { upsertUser, updateUserDevice, addRelation, updateRelation, removeRelation, addMyselfAsRelative, getMyProfile, getUserById, getUserByDeviceId, getEmergencyContacts } from '@dataconnect/generated';


// Operation UpsertUser:  For variables, look at type UpsertUserVars in ../index.d.ts
const { data } = await UpsertUser(dataConnect, upsertUserVars);

// Operation UpdateUserDevice:  For variables, look at type UpdateUserDeviceVars in ../index.d.ts
const { data } = await UpdateUserDevice(dataConnect, updateUserDeviceVars);

// Operation AddRelation:  For variables, look at type AddRelationVars in ../index.d.ts
const { data } = await AddRelation(dataConnect, addRelationVars);

// Operation UpdateRelation:  For variables, look at type UpdateRelationVars in ../index.d.ts
const { data } = await UpdateRelation(dataConnect, updateRelationVars);

// Operation RemoveRelation:  For variables, look at type RemoveRelationVars in ../index.d.ts
const { data } = await RemoveRelation(dataConnect, removeRelationVars);

// Operation AddMyselfAsRelative:  For variables, look at type AddMyselfAsRelativeVars in ../index.d.ts
const { data } = await AddMyselfAsRelative(dataConnect, addMyselfAsRelativeVars);

// Operation GetMyProfile: 
const { data } = await GetMyProfile(dataConnect);

// Operation GetUserById:  For variables, look at type GetUserByIdVars in ../index.d.ts
const { data } = await GetUserById(dataConnect, getUserByIdVars);

// Operation GetUserByDeviceId:  For variables, look at type GetUserByDeviceIdVars in ../index.d.ts
const { data } = await GetUserByDeviceId(dataConnect, getUserByDeviceIdVars);

// Operation GetEmergencyContacts:  For variables, look at type GetEmergencyContactsVars in ../index.d.ts
const { data } = await GetEmergencyContacts(dataConnect, getEmergencyContactsVars);


```