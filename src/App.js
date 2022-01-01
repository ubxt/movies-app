import React from 'react';
//Styles
import { GlobalStyle } from './GlobalStyle';
import Header from './components/Header';

const App = () => {
  return (
    <div className="App">
      <Header />
      Start Here.
      <GlobalStyle />
    </div>
  );
}

export default App;
