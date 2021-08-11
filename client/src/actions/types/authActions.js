import axios from 'axios';
import * as actionTypes from '../names';
import * as endpoints from '../../utils/endpoints';

export function login(payloadKey = null, payloadValue = null) {
  return async function(dispatch){
    let payload = {}
    if (payloadKey && payloadValue){
      payload[payloadKey] = payloadValue;
    }
    try {
      const response = await axios.post(`${endpoints.AUTH_LOGIN}`, payload);
      return dispatch({
         type: actionTypes.LOGIN_USER, 
         payload: setUserSession(response.data)
      });
    } catch(e) {
      console.log(e);
    }
  }
}

function setUserSession(data){
  const { token, ...userProps } = data;
  sessionStorage.setItem('userSession', JSON.stringify({ token, user: userProps }))
  return userProps;
}

export function loadUserSession() {
  return async function(dispatch){  
    let session = JSON.parse(sessionStorage.getItem('userSession'));
    if (session.user){
      dispatch({ type: actionTypes.LOGIN_USER, payload: session.user });
    }
  }
}
