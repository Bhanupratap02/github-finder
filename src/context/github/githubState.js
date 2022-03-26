import React ,{useReducer} from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
SET_LOADING,
CLEAR_USERS,
GET_USER,
GET_REPOS,
SEARCH_USERS} from "../types";

const GithubState = props =>{
    const initialState = {
        users:[],
        user:{},
        repos:[],
        loading:false
    }
    const [state,dispatch] = useReducer(GithubReducer,initialState);
    // search user
    const  searchUsers =  async text => {
    setLoading();
   let secret = "c6401b093de7d8654df33b99aeaf4e9d3cb85461";
  let client = "5c01f0b75d9bc687ee1e";
   const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${client}&client_secret=${secret}`);
    
dispatch({
    type:SEARCH_USERS,
    payload:res.data.items
});
    
  };
    //get user
      const getUser = async (username) =>{
     setLoading();
   let secret = "c6401b093de7d8654df33b99aeaf4e9d3cb85461";
  let client = "5c01f0b75d9bc687ee1e";
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${client}&client_secret=${secret}`);
   
    dispatch({
        type:GET_USER,
        payload:res.data
    });
  };
    //get repos
    const  getUserRepos = async username => {
     setLoading();
   let secret = "c6401b093de7d8654df33b99aeaf4e9d3cb85461";
  let client = "5c01f0b75d9bc687ee1e";
  const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${client}&client_secret=${secret}`);
     dispatch({
        type:GET_REPOS,
        payload:res.data
    });
  }
  
    //clear users
     const  clearUsers = () => dispatch({type:CLEAR_USERS})
   
  
    //set loading
    const setLoading = () => dispatch({type:SET_LOADING})
    return  <GithubContext.Provider
    value={{
        users:state.users,
        user:state.user,
        repos:state.repos,
        loading:state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
    }}
    >
        {props.children}
    </GithubContext.Provider>
}
export default GithubState;