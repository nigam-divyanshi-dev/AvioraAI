import test from 'node:test';
import assert from 'node:assert/strict';

import reducer, { setUserdata } from './userSlice.js';

test('setUserdata keeps user data and exposes id', () => {
  const state = reducer(undefined, setUserdata({
    _id: 'abc123',
    name: 'Jane Doe',
    email: 'jane@example.com',
  }));

  assert.equal(state.userData.id, 'abc123');
  assert.equal(state.userData.name, 'Jane Doe');
  assert.equal(state.userData.email, 'jane@example.com');
});
