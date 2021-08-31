/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

//// 606060;
// 7ABDB4
import React from 'react';
import AppNavigation from './Navigation';
import {AuthProvider} from './AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
};

export default App;
