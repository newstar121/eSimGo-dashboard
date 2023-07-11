import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import axios from 'axios';
import { API_URL, API_KEY, LOGIN_TOKEN } from "utils/constant";

const UPDATE = 'UPDATE'
const UPDATE_VIEW_ESIMS = 'UPDATE_VIEW_ESIMS'

function reducer(state, { type, payload }) {
  
  switch (type) {
    
    case UPDATE: {
      const { data } = payload
      return {
        ...state,
        data,
      }
    }

    case UPDATE_VIEW_ESIMS: {
      const { eSimData } = payload
      return {
        ...state,
        eSimData,
      }
    }

    default: {
      throw Error(`Unexpected action type in DataContext reducer: '${type}'.`)
    }
  }
}

export const GlobalContext = createContext();
export const useGlobalData = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, {})

  const update = useCallback((data) => {
    dispatch({
      type: UPDATE,
      payload: {
        data,
      },
    })
  }, [])

  const updateViewESims = useCallback((data) => {
    dispatch({
      type: UPDATE_VIEW_ESIMS,
      payload: {
        eSimData: data,
      },
    })
  }, [])

  const [data, setData] = useState({
    organizations: [],
    user: {},
    groups: []
  })

  useEffect(() => {
    axios.get(API_URL + 'login',
      {
        headers: {
          Authorization: 'Basic ' + LOGIN_TOKEN
        }
      }
    ).then((response) => {
      window.localStorage.setItem('isAdmin', response.data.isAdmin);
      window.localStorage.setItem('refreshToken', response.data.refreshToken);
      window.localStorage.setItem('token', response.data.token);
      window.localStorage.setItem('verified', response.data.verified);

      // console.log('token', window.localStorage.getItem('refreshToken'));
      // GET CURRENT USER
      axios.get(API_URL + 'organisations/current',
        {
          params: {
            id: 'current'
          },
          headers: {
            'X-API-Key': API_KEY,
            Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
          }
        }
      ).then((response) => {

        const organizations = response.data.organizations;
        const user = response.data.user;

        let updateData = Object.assign({}, data, organizations, user)
        setData(updateData)

      }).catch((error) => {
        console.log('get organization data error', error);
      })

      // GET GROUPS
      axios.get(API_URL + 'organisation/groups',
        {
          headers: {
            'X-API-Key': API_KEY,
            Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
          }
        }
      ).then((response) => {

        const groups = response.data.groups;

        let updateData = Object.assign({}, data, groups)
        setData(updateData)

      }).catch((error) => {
        console.log('get organization data error', error);
      })

    }).catch((error) => {
      console.log('login error', error);
    })
  }, [])

  return (
    <GlobalContext.Provider
      value={useMemo(
        () => [
          state,
          {
            update,
            update
          }
        ],
        [
          state,
          update,
        ]
      )}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
