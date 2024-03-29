export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});



export const Logout=()=>({
  type:'LOGOUT'
})


export const UpdateStart=()=>({
  type:'UPDATE_START'
})

export const UpdateSuccess=(user)=>({
  type:'UPDATE_SUCCESS',
  payload:user,
})

export const UpdateFailure=()=>({
  type:'UPDATE_FAILURE'
})

export const DeleteStart=()=>({
  type:"DELETE_START"
})

export const DeleteSuccess=(user)=>({
  type:"DELETE_SUCCESS",
  payload:user
})

export const DeleteFailure=()=>({
  type:"DELETE_FAILURE"
})
