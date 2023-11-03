import './App.css';
import DynamicPlot from './DynamicPlot';
import DropDownMenus from './DropDownMenus';
import data from './Uncountable Front End Dataset.json';

import { useEffect, useState } from 'react';

function getData(i1, i2, o) {
  var ret = [];
  var min = Infinity
  var max = -Infinity
  for (const key in data){
    ret.push({x: data[key]['inputs'][i1],
              y: data[key]['inputs'][i2],
              color: data[key]['outputs'][o]})
    if(data[key]['outputs'][o] > max)
      max = data[key]['outputs'][o]
    if(data[key]['outputs'][o] < min)
      min = data[key]['outputs'][o]
  }
  console.log(ret)
  return ret;
}

function App() {
  const [InputCategory1, setI1] = useState('Polymer 1')
  const [InputCategory2, setI2] = useState('Polymer 2')
  const [OutputCategory, setO] = useState('Viscosity')
  const [sortedData, setData] = useState()
  useEffect(()=>{
    console.log(InputCategory1, InputCategory2, OutputCategory)
    setData(getData(InputCategory1, InputCategory2, OutputCategory))
  }, [InputCategory1, InputCategory2, OutputCategory])
  return (
    <div className="App">
      <header className="App-header">
        <h1>Uncountable: Experiment Visualization</h1>
      </header>
      <body className="App-body">
        <DropDownMenus
          rawData={data}
          si1={setI1}
          si2={setI2}
          so={setO}/>
          <DynamicPlot data={sortedData} />
      </body>
    </div>
  );
}

export default App;
