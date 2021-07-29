import { useQuery } from 'react-query'
import { get_product } from './requests'

export const getProduct = (id) => {
    console.log("test");
    return useQuery(["product", id], async () => {
        return get_product(id)
    }, {
        staleTime: 1000
    })
}
