# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { insertRelative, updateRelative, deleteRelative, insertSnapshot, updateSnapshot, deleteSnapshot, getRelativesByUid, getRelativeById, getAllRelatives, getSnapshotsByUid } from '@dataconnect/generated';


// Operation InsertRelative:  For variables, look at type InsertRelativeVars in ../index.d.ts
const { data } = await InsertRelative(dataConnect, insertRelativeVars);

// Operation UpdateRelative:  For variables, look at type UpdateRelativeVars in ../index.d.ts
const { data } = await UpdateRelative(dataConnect, updateRelativeVars);

// Operation DeleteRelative:  For variables, look at type DeleteRelativeVars in ../index.d.ts
const { data } = await DeleteRelative(dataConnect, deleteRelativeVars);

// Operation InsertSnapshot:  For variables, look at type InsertSnapshotVars in ../index.d.ts
const { data } = await InsertSnapshot(dataConnect, insertSnapshotVars);

// Operation UpdateSnapshot:  For variables, look at type UpdateSnapshotVars in ../index.d.ts
const { data } = await UpdateSnapshot(dataConnect, updateSnapshotVars);

// Operation DeleteSnapshot:  For variables, look at type DeleteSnapshotVars in ../index.d.ts
const { data } = await DeleteSnapshot(dataConnect, deleteSnapshotVars);

// Operation GetRelativesByUid:  For variables, look at type GetRelativesByUidVars in ../index.d.ts
const { data } = await GetRelativesByUid(dataConnect, getRelativesByUidVars);

// Operation GetRelativeById:  For variables, look at type GetRelativeByIdVars in ../index.d.ts
const { data } = await GetRelativeById(dataConnect, getRelativeByIdVars);

// Operation GetAllRelatives: 
const { data } = await GetAllRelatives(dataConnect);

// Operation GetSnapshotsByUid:  For variables, look at type GetSnapshotsByUidVars in ../index.d.ts
const { data } = await GetSnapshotsByUid(dataConnect, getSnapshotsByUidVars);


```