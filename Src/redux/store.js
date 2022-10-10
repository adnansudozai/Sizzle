
import rootReducers from './reducers/RootReducer'
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userdataReducer'],
}

const persistedReducer = persistReducer(persistConfig, rootReducers)
const store = createStore(persistedReducer)
const persistor = persistStore(store)
export { store, persistor }
