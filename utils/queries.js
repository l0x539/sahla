import axios, { CancelToken } from 'axios'
import { useQuery } from 'react-query'
import { API_HOST } from './constants'
import { get_me, get_product, get_products, get_products_user, get_service, get_services, get_services_user, get_user } from './requests'

export const getProduct = (id) => {
    return useQuery(["product", id], async () => {
        return get_product(id)
    }, {
        staleTime: 1000
    })
}

export const getService = (id) => {
    return useQuery(["service", id], async () => {
        return get_service(id)
    }, {
        staleTime: 1000
    })
}

export const getUser = (token) => {
    return useQuery("user", async () => {
        return get_me(token)
    }, {
        staleTime: 1000
    })
}

export const getUserProduct = (user_id=false, token=false, start=0, limit=32) => {

    return useQuery(["products", "myuser", start], async () => {

        if (!user_id) {

            const user = await get_me(token)
            user_id = user.data.id
        }
        return get_products_user(user_id, start, limit)

    }, {
        staleTime: 1000
    })
}

export const getUserService = (user_id=false, token=false, start=0, limit=32) => {

    return useQuery(["products", "myuser", start], async () => {

        if (!user_id) {

            const user = await get_me(token)
            user_id = user.data.id
        }
        return get_services_user(user_id, start, limit)

    }, {
        staleTime: 1000
    })
}

export const getProducts = (start=0, limit=32) => {
    return useQuery(["products", start], async () => {

        return get_products(start, limit)
    }, {
        staleTime: 1000
    })
}

export const getServices = (start=0, limit=32) => {
    return useQuery(["services", start], async () => {

        return get_services(start, limit)
    }, {
        staleTime: 1000
    })
}

export const searchQuery =  (searchfor, query, user_id=false, token=false, start=0, limit=32) => {
    return useQuery([searchfor, query], async () => {
        if (user_id===true) {
    
            const user = await get_me(token)
            user_id = user.data.id
        }
        const source = CancelToken.source()
        const promise = new Promise(resolve => setTimeout(resolve, 1000))
            .then(() => {
                return axios.get(API_HOST+`/${searchfor}?_where[_or][0][title_contains]=${query}&_where[_or][1][description_contains]=${query}${user_id?`&_user_id=${user_id}`:""}`,
                    {
                        cancelToken: source.token
                    }
                )
            }).then(res => res)

            promise.cancel = () => {
                source.cancel('Query Canceled')
            }

            return promise

    }, {
        enabled: query.length>0
    })
}