import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import axios from 'axios';
import { API_URL, API_KEY, LOGIN_TOKEN } from "utils/constant";
import { differenceInDays, isSameMonth, isSameYear } from "date-fns";

const UPDATE = 'UPDATE'
const UPDATE_ORGANIZATIONS = 'UPDATE_ORGANIZATIONS'
const UPDATE_USER = 'UPDATE_USER'
const UPDATE_USERS = 'UPDATE_USERS'
const UPDATE_GROUPS = 'UPDATE_GROUPS'
const UPDATE_VIEW_ESIMS = 'UPDATE_VIEW_ESIMS'
const UPDATE_TOTAL_BUNDLES_SOLD = 'UPDATE_TOTAL_BUNDLES_SOLD'

function reducer(state, { type, payload }) {

  switch (type) {

    case UPDATE: {
      const { data } = payload
      return {
        ...state,
        data,
      }
    }

    case UPDATE_ORGANIZATIONS: {
      const { organizations } = payload
      return {
        ...state,
        organizations,
      }
    }

    case UPDATE_USER: {
      const { user } = payload
      return {
        ...state,
        user,
      }
    }

    case UPDATE_USERS: {
      const { users } = payload
      return {
        ...state,
        users,
      }
    }

    case UPDATE_GROUPS: {
      const { groups } = payload
      return {
        ...state,
        groups,
      }
    }

    case UPDATE_TOTAL_BUNDLES_SOLD: {
      const { totalBundlesSold } = payload
      return {
        ...state,
        totalBundlesSold,
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

export async function getViewESimsData(year, month) {

  let config = {
    method: 'get',
    url: API_URL + 'esims',
    headers: {
      'X-API-Key': API_KEY
    }
  };
  try {
    let response = await axios(config);
    if (response.data) {
      let result = []
      let no = 1;
      for (let i = 0; i < response.data.esims.length; i++) {
        let currentDate = new Date(year, month);
        let actionDate = (new Date(response.data.esims[i].actionDate))

        if (isSameYear(actionDate, currentDate) &&
          isSameMonth(actionDate, currentDate)) {
          let iccid = response.data.esims[i].iccid;
          // get location info
          let res = await axios.get(
            API_URL + 'esims/' + iccid + '/location',
            {
              params: {
                iccid: iccid
              },
              headers: {
                'X-API-Key': API_KEY,
                Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
              }
            });

          let locationInfo = res.data;
          let country = locationInfo.country || '';

          res = await axios.get(
            API_URL + 'esims/' + iccid + '/bundles',
            {
              params: {
                iccid: iccid,
                includeUsed: false
              },
              headers: {
                'X-API-Key': API_KEY,
                Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
              }
            });

          let bundles = res.data.bundles;
          let initialQuantity = bundles?.[0].assignments?.[0].initialQuantity;
          let remainingQuantity = bundles?.[0].assignments?.[0]?.remainingQuantity;
          let endTime = bundles?.[0].assignments?.[0]?.endTime;

          result.push(Object.assign({}, response.data.esims[i], {
            id: no,
            country: country,
            dataUsage: (initialQuantity / Math.pow(10, 9)) + 'GB / ' + (remainingQuantity / Math.pow(10, 9)).toFixed(2) + 'GB',
            expireDate: differenceInDays(new Date(endTime), new Date()) + 'Days Left',
          }))
          no++
        }
      }
      return result;
    } else {
      return []
    }
  } catch (error) {
    console.log('getViewESimsData error', error)
    return []
  }
}

export async function getTotalBundlesSold(filterBy = null) {
  try {
    let response = await axios.post(
      API_URL + 'dashboard/charts', {
      "filterBy": filterBy,
      "monthEnd": null,
      "monthStart": null,
      "subType": null,
      "type": "totalBundlesSold"
    }, {
      headers: {
        'X-API-Key': API_KEY,
        Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
      }
    });
    return {
      thisPeriodTotalBundlesSold: parseInt(response.data.thisPeriodTotalBundlesSold),
      previousPeriodTotalBundlesSold: response.data.previousPeriodTotalBundlesSold,
      percentageDifference: response.data.percentageDifference.toFixed(0)
    }
  } catch (error) {
    console.log('getTotalBundlesSold', error)
    return {}
  }
}

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

  const updateOrganizations = useCallback((data) => {
    dispatch({
      type: UPDATE_ORGANIZATIONS,
      payload: {
        organizations: data,
      },
    })
  }, [])

  const updateUser = useCallback((data) => {
    dispatch({
      type: UPDATE_USER,
      payload: {
        user: data,
      },
    })
  }, [])

  const updateUsers = useCallback((data) => {
    dispatch({
      type: UPDATE_USERS,
      payload: {
        users: data,
      },
    })
  }, [])

  const updateGroups = useCallback((data) => {
    dispatch({
      type: UPDATE_GROUPS,
      payload: {
        groups: data,
      },
    })
  }, [])

  const updateTotalBundlesSold = useCallback((data) => {
    dispatch({
      type: UPDATE_TOTAL_BUNDLES_SOLD,
      payload: {
        totalBundlesSold: data,
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

        updateOrganizations(response.data.organizations)
        updateUser(response.data.user)

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

        updateGroups(response.data.groups)

      }).catch((error) => {
        console.log('get organization data error', error);
      })

      getViewESimsData((new Date()).getFullYear(), (new Date()).getMonth()).then((result) => {
        updateViewESims(result)
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
            updateOrganizations,
            updateUser,
            updateGroups,
            updateViewESims,
            updateTotalBundlesSold,
          }
        ],
        [
          state,
          update,
          updateOrganizations,
          updateUser,
          updateGroups,
          updateViewESims,
          updateTotalBundlesSold
        ]
      )}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
