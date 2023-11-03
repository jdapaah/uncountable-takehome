import {
    XYPlot,
    MarkSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis, YAxis
  } from 'react-vis'
const DynamicPlot = (props) => {
    

return <XYPlot height={300} width={300}>
<VerticalGridLines/>
<HorizontalGridLines/>
<XAxis/>
<YAxis/>
<MarkSeries data={props.data}/>
</XYPlot>   
}

export default DynamicPlot;