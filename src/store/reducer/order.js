import * as types from '../actions/actionType'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.INIT_PURCHASE: return purchaseInit(state);
        case types.PURCHASE_START: return purchaseStart(state);
        case types.PURCHASE_SUCCESS: return purchaseSuccess(state, action);
        case types.PURCHASE_FAILED:  return purchaseFailed(state);
        case types.FETCH_ORDERS_START: return fetchOrdersStart(state);
        case types.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case types.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state);
        default: return state
    }
} 

const purchaseInit = (state) => {
    return { 
        ...state, 
        purchased: false 
    };
};

const purchaseStart = (state) => {
    return { 
        ...state, 
        loading: true 
    };
};

const purchaseSuccess = (state, action) => {
    const newOrder = {
      ...action.orderData,
      id: action.orderId
    };
    return {
      ...state,
      loading: false,
      purchased: true,
      orders: state.orders.concat(newOrder)
    };
};

const purchaseFailed = (state) => {
    return { 
        ...state, 
        loading: false 
    };
};

const fetchOrdersStart = (state) => {
    return {
        ...state,
        loading: true
    };
};

const fetchOrdersSuccess = (state, action) => {
    return {
        ...state,
        orders: action.orders,
        loading: false
    };
};

const fetchOrdersFailed = (state) => {
    return {
        ...state,
        loading: false
    };
};

export default reducer;