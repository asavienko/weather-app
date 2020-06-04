import { SET_CITY_LIST } from '../constants/constantsActions';

const initState = { cityList: [{ id: 0 }] };

const cvReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CITY_LIST:
      return { ...state, cityList: action.cityList };
    default:
      return state;
  }
};

export default cvReducer;
