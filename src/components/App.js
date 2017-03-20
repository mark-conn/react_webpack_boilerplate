import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import styles from './App.scss';
import HelloWorld from './HelloWorld';


const App = () => {
    return (
        <Provider store={store}>
            <div className={styles.app}>
              <h2>REACT/REDUX APP</h2>
              <HelloWorld />
            </div>
        </Provider>
    );
};

export default App;
