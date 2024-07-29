export const selectUser = state => state.users.user;

export const selectAvatar = state => state.users.avatar;

export const selectUsersCount = state => state.users.totalUsers;

export const selectIsLoading = state => state.users.userLoading;

export const selectUsersError = state => state.users.error;

export const selectUserLoading = state => state.users.userLoading;
