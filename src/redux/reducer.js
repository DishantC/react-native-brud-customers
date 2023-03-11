export const ADD_ITEM = 'ADD_ITEM';
export const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM';

export const addItem = item => ({
  type: ADD_ITEM,

  payload: item,
});

export const addOrderItem = item => ({
  type: ADD_ORDER_ITEM,

  payload: item,
});


const initialState = {
  itemList: [],
  orderList: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ADD_ITEM:
      return {
        ...state,

        itemList: state.itemList.concat(action.payload),
      };
      case ADD_ORDER_ITEM:
        return {
          ...state,
  
          orderList: state.orderList.concat(action.payload),
        };

    default:
      return state;
  }
};

export default rootReducer;
