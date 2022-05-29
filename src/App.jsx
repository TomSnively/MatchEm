import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Title from './components/Title';
import HowToPlay from './components/HowToPlay';
import Match10Fast from './components/Match10Fast';
import ThirtySecondRush from './components/ThirtySecondRush';

const App = () => {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  };

  const { height, width } = useWindowDimensions();
  const windowSize = { height, width };

  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" render={() => <Title windowSize={windowSize} />} />
          <Route exact path="/howtoplay" render={() => <HowToPlay windowSize={windowSize} />} />
          <Route exact path="/match10fast" render={() => <Match10Fast windowSize={windowSize} />} />
          <Route exact path="/30secondrush" render={() => <ThirtySecondRush windowSize={windowSize} />} />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
