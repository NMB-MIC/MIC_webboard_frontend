import axios from 'axios'
import join from 'url-join'
import { apiUrl, NOT_CONNECT_NETWORK, NETWORK_CONNECTION_MESSAGE} from '../constants'

const isAbsoluteURLRegex = /^(?:\w+:)\/\//

const httpClient = axios.create({
    baseURL: apiUrl,
  })
  
httpClient.interceptors.request.use(async (config) => {
    if (!isAbsoluteURLRegex.test(config.url)) {
        config.url = join(httpClient.defaults.baseURL, config.url)
    }
    config.timeout = 30000 // 30 Second 
    return config
    })


httpClient.interceptors.response.use((response) => {
    return response
}, error => { 
    debugger
    console.log(JSON.stringify(error, undefined, 2))
    if (axios.isCancel(error)) {
        return Promise.reject(error)
    } else if (!error.response) {
        return Promise.reject({ code: NOT_CONNECT_NETWORK, message: NETWORK_CONNECTION_MESSAGE })
    }
    return Promise.reject(error)
})

export { httpClient }


// httpClient.interceptors.request.use(async (config) => {
//     if (!isAbsoluteURLRegex.test(config.url)) {
//         config.url = join(apiUrl, config.url) 
//     }
//     config.timeout = 30000 // 30 Second 
//     return config
// })

// axios.interceptors.response.use((response) => {
//     return response
// }, error => { 
//     debugger
//     console.log(JSON.stringify(error, undefined, 2))
//     if (axios.isCancel(error)) {
//         return Promise.reject(error)
//     } else if (!error.response) {
//         return Promise.reject({ code: NOT_CONNECT_NETWORK, message: NETWORK_CONNECTION_MESSAGE })
//     }
//     return Promise.reject(error)
// })

// export const httpClient = axios
