import { combineReducers } from "redux";
import { legacy_createStore as createStore } from "redux";
import { filterReducer } from "../reducer/filterReducer";

import { resizeReducer } from "../reducer/resizeReducer";

const rootReducer = combineReducers({
  resize: resizeReducer,
  filter: filterReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
