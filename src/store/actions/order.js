import * as types from './actionType'
import axios from '../../axios-orders'

/*
 * action creators
 */
export const purchaseSuccess = (id, orderData) => ({
    type: types.PURCHASE_SUCCESS,
    orderId: id,
    orderData
})

export const purchaseFailed = (error) => ({
    type: types.PURCHASE_FAILED,
    error
})

export const purchaseStart = () => ({
    type: types.PURCHASE_START,
})

export const initPurchase = () => ({
    type: types.INIT_PURCHASE
})

export const fetchOrdersStart = () => ({
    type: types.FETCH_ORDERS_START
})

export const fetchOrdersSuccess = orders => ({
    type: types.FETCH_ORDERS_SUCCESS,
    orders
})

export const fetchOrdersFailed = error => ({
    type: types.FETCH_ORDERS_FAILED,
    error
})

/*
 * Async Task
 */
export const purchase = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseStart());
        axios.post("orders.json?auth=" + token, orderData)
          .then(res => {
            dispatch(purchaseSuccess(res.data.name, orderData))
          })
          .catch(err => {
            dispatch(purchaseFailed(err))
          });
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        const query = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('/orders.json' + query)
            .then(res => {
                const fetchOrders = [];
                for (let key in res.data) {
                    fetchOrders.push({
                    id: key,
                    ...res.data[key]
                    });
                }
                dispatch(fetchOrdersSuccess(fetchOrders))
            })
            .catch(err => {
                dispatch(fetchOrdersFailed(err))
            });
        }
}