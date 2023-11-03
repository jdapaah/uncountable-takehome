import './App.css';
import DynamicPlot from './DynamicPlot';
import DropDownMenus from './DropDownMenus';
import data from './Uncountable Front End Dataset.json';

import { useEffect, useState } from 'react';

function getData(i1, i2, o) {
  var ret = [];
  if(!i1 || !i2 || !o){
    return ret
  }
  var min = Infinity
  var max = -Infinity
  for (const key in data){
    // if(!i1 in data[key]['inputs'])
    //   return [];
    var rawDate = key.substring(0, 4) + '-' +
                  key.substring(4, 6) + '-' +
                  key.substring(6, 8) + " EST"
    ret.push({x: data[key]['inputs'][i1],
              y: data[key]['inputs'][i2],
              color: data[key]['outputs'][o],
              date: new Date(rawDate),
              num: key.substring(key.lastIndexOf("_")+1),
              fullData: data[key]})
    if(data[key]['outputs'][o] > max)
      max = data[key]['outputs'][o]
    if(data[key]['outputs'][o] < min)
      min = data[key]['outputs'][o]
  }
  for(var k = 0; k < ret.length; k++){
    ret[k]['color'] = 4*(ret[k]['color']-min)/(max-min)
  }
  return ret;
}

function App() {
  const [InputCategory1, setI1] = useState('')
  const [InputCategory2, setI2] = useState('')
  const [OutputCategory, setO] = useState('')
  const [sortedData, setData] = useState([])
  
  useEffect(()=>{
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
          i1={InputCategory1}
          si1={setI1}
          i2={InputCategory2}
          si2={setI2}
          so={setO}/>
          <DynamicPlot 
          plotData={sortedData}
          i1={InputCategory1}
          i2={InputCategory2 }
          />
      </body>
    </div>
  );
}

export default App;
