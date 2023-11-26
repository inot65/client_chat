export const LoginStart = (userCredentials) => ({
  type: 'LOGIN_START',
});
export const LoginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});
export const LoginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});
export const RegisterStart = (userCredentials) => ({
  type: 'REGISTER_START',
});
export const RegisterSuccess = (user) => ({
  type: 'REGISTER_SUCCESS',
  payload: user,
});
export const RegisternFailure = (error) => ({
  type: 'REGISTER_FAILURE',
  payload: error,
});

// LOGOUT
export const Logout = (userId) => ({
  type: 'LOGOUT',
});

// Follow
export const Follow = (userId) => ({
  type: 'FOLLOW',
  payload: userId,
});

// Unfollow
export const Unfollow = (userId) => ({
  type: 'UNFOLLOW',
  payload: userId,
});
