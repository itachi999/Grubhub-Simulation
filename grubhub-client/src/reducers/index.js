import { combineReducers } from 'redux';
import profileReducer from './profileReducer'
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import restaurantReducer from './restaurantReducer';
import menuSectionReducer from './menuSectionReducer';
import menuItemReducer from './menuItemReducer';
import orderReducer from './orderReducer';
import messageReducer from './messageReducer';
import imageUploadReducer from './imageUploadReducer';

export default combineReducers({
    login: loginReducer,
    signup: signupReducer,
    profile: profileReducer,
    restaurant: restaurantReducer,
    menuSection: menuSectionReducer,
    menuItem: menuItemReducer,
    order: orderReducer,
    messenger: messageReducer,
    image: imageUploadReducer
});