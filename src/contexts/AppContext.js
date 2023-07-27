import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import axios from 'axios';
import { API_URL, API_KEY, LOGIN_TOKEN } from "utils/constant";
import { differenceInDays, isSameMonth, isSameYear } from "date-fns";
import { API_BACKEND_URL } from "utils/constant";

const UPDATE = 'UPDATE'
const UPDATE_ORGANISATIONS = 'UPDATE_ORGANISATIONS'
const UPDATE_USER = 'UPDATE_USER'
const UPDATE_USERS = 'UPDATE_USERS'
const UPDATE_GROUPS = 'UPDATE_GROUPS'
const UPDATE_VIEW_ESIMS = 'UPDATE_VIEW_ESIMS'
const UPDATE_TOTAL_BUNDLES_SOLD = 'UPDATE_TOTAL_BUNDLES_SOLD'
const UPDATE_COUNTRIES = 'UPDATE_COUNTRIES'
const UPDATE_PLANS = 'UPDATE_PLANS'
const UPDATE_COUNTRY_FLAGS = 'UPDATE_COUNTRY_FLAGS'

function reducer(state, { type, payload }) {

  switch (type) {

    case UPDATE: {
      const { data } = payload
      return {
        ...state,
        data,
      }
    }

    case UPDATE_ORGANISATIONS: {
      const { organisations } = payload
      return {
        ...state,
        organisations,
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

    case UPDATE_COUNTRIES: {
      const { countries } = payload
      return {
        ...state,
        countries
      }
    }

    case UPDATE_PLANS: {
      const { plans } = payload
      return {
        ...state,
        plans
      }
    }

    case UPDATE_COUNTRY_FLAGS: {
      const { countryFlags } = payload
      return {
        ...state,
        countryFlags
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

export async function getOrganisationBalance(params) {
  try {
    let res = await axios.put(
      API_URL + 'organisation/balance',
      params,
      {
        headers: {
          'X-API-Key': API_KEY,
          Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
        }
      });
    return res.data
  } catch (error) {
    console.log('getOrganisationBalance error', error)
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

export async function getOrganisations() {
  try {
    let res = await axios.get(API_URL + 'organisations/current',
      {
        params: {
          id: 'current'
        },
        headers: {
          'X-API-Key': API_KEY,
          Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
        }
      }
    );
    return res;

  } catch (error) {
    console.log('getOrganisations error', error)
    return {}
  }
}

export async function getPlans() {
  try {
    let res = await axios.get(
      API_BACKEND_URL + 'user/get_plans',
      {
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      }
    );

    if (res.data.success) {
      return res.data.plans
    } else {
      return []
    }

  } catch (error) {
    console.log('getPlans error', error)
    return []
  }
}

export async function getCountryFlags() {
  try {
    let res = await axios.get(
      'https://portal.esim-go.com/assets/packages/country_code_picker/i18n/en.json',
      {

      }
    );
    return res.data || {}

  } catch (error) {
    console.log('getCountryFlags error', error)
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

  const updateOrganisations = useCallback((data) => {
    dispatch({
      type: UPDATE_ORGANISATIONS,
      payload: {
        organisations: data,
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

  const updateCountries = useCallback((data) => {
    dispatch({
      type: UPDATE_COUNTRIES,
      payload: {
        countries: data,
      },
    })
  }, [])

  const updatePlans = useCallback((data) => {
    dispatch({
      type: UPDATE_PLANS,
      payload: {
        plans: data,
      },
    })
  }, [])

  const updateCountryFlags = useCallback((data) => {
    dispatch({
      type: UPDATE_COUNTRY_FLAGS,
      payload: {
        countryFlags: data,
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

      window.localStorage.setItem('verified', response.data.verified);

      // console.log('token', window.localStorage.getItem('refreshToken'));
      // GET CURRENT USER

      getOrganisations().then((response) => {
        updateOrganisations(response.data.organisations || [])
        updateUser(response.data.user)
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

        let group = response.data.groups ? response.data.groups[0].name : '';
        if (group != '') {

          axios.get(`https://api.esim-go.com/v2.1/organisation/groups/${group}/countries`,
            {
              params: {
                group: group
              },
              headers: {
                'X-API-Key': API_KEY,
                Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
              }
            }).then((response) => {
              let countries = response.data.countries || []
              // let result = {}
              // for (let i = 0; i < countries.length; i++) {
              //   result[countries[i].iso] = countries[i].name
              // }
              updateCountries(countries)
            })
        }

      }).catch((error) => {
        console.log('get organisation data error', error);
      })

      getViewESimsData((new Date()).getFullYear(), (new Date()).getMonth()).then((result) => {
        updateViewESims(result)
      })

      getPlans().then((result) => {
        updatePlans(result);
      })

      getCountryFlags().then((result) => {
        updateCountryFlags(result)
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
            updateOrganisations,
            updateUser,
            updateGroups,
            updateViewESims,
            updateTotalBundlesSold,
            updateCountries,
            updatePlans,
          }
        ],
        [
          state,
          update,
          updateOrganisations,
          updateUser,
          updateGroups,
          updateViewESims,
          updateTotalBundlesSold,
          updateCountries,
          updatePlans,
        ]
      )}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
