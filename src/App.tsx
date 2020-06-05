import React from 'react';

import * as C from './components';
import { diagramEngine } from './diagramEngine'

function App() {
  return (
    <>
      <h1>Factorio Calc</h1>
      <C.Canvas engine={diagramEngine} />
    </>
  );
}

export default App;
