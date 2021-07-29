import { useQuery } from 'react-query'
import { get_me, get_product, get_products_user, get_user } from './requests'

export const getProduct = (id) => {
    return useQuery(["product", id], async () => {
        return get_product(id)
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
    console.log("dd");
    return useQuery(["products", "myuser"], async () => {
        if (!user_id) {
            console.log("dsd");

            const user = await get_me(token)
            user_id = user.data.id
        }
        return get_products_user(user_id, start, limit)

    }, {
        staleTime: 1000
    })
}