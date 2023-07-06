import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { API_URL, API_KEY } from "utils/constant";

export const GlobalContext = createContext();
export const useGlobalData = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

  const [data, setData] = useState({
    organizations: [],
    users: {}
  })
  useEffect(() => {
    axios.get(API_URL + 'organisation',
      {},
      {
        headers: {
          'X-API-Key': API_KEY
        }
      }
    ).then((response) => {
      
      const organizations = response.data.organizations;
      const users = response.data.users;

      let updateData = Object.assign({}, data, organizations, users)
      setData(updateData)
      
    }).catch((error) => {
      console.log('get organization data error', error);
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
