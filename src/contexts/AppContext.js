import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { API_URL, API_KEY, LOGIN_TOKEN } from "utils/constant";

export const GlobalContext = createContext();
export const useGlobalData = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

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
      value={data}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
