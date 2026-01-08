export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const setUserId=(user_id)=>{
    localStorage.setItem("user_id",user_id)
};

export const  getUserId= () => {
  return localStorage.getItem("user_id");
};


