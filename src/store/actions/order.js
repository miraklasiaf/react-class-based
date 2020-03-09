import * as types from './actionType'
import axios from '../../axios-orders'

/*
 * action creators
 */
export const purchaseSuccess = (id, orderData) => {
    return {
        type: types.PURCHASE_SUCCESS,
        orderId: id,
        orderData
    }
}

export const purchaseFailed = (error) => {
    return {
        type: types.PURCHASE_FAILED,
        error
    }
}

export const purchaseStart = () => {
    return {
        type: types.PURCHASE_START,
    }
}

export const initPurchase = () => {
    return {
        type: types.INIT_PURCHASE
    }
}

export const fetchOrdersStart = () => {
    return {
      type: types.FETCH_ORDERS_START
    };
}

export const fetchOrdersSuccess = orders => {
    return {
        type: types.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrdersFailed = error => {
  return {
    type: types.FETCH_ORDERS_FAILED,
    error
  };
};

/*
 * Async Task
 */
export const purchase = (orderData) => {
    return dispatch => {
        dispatch(purchaseStart());
        axios.post("orders.json", orderData)
          .then(res => {
            dispatch(purchaseSuccess(res.data.name, orderData))
          })
          .catch(err => {
            dispatch(purchaseFailed(err))
          });
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get("/orders.json")
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