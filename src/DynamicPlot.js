import {
    XYPlot,
    MarkSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis, YAxis
} from 'react-vis'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const DatapointCard = ({ title, content }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body2">{content}</Typography>
            </CardContent>
        </Card>
    );
};

const gridLineStyle = {
    stroke: '#aaaaaa',
    strokeWidth: 1,
};
const DynamicPlot = (props) => {
    const [cardVisible,setCardVisible] = useState(false)
    const [cardData, setCardData] = useState({})
    var moreInfoCard;

    if(Object.keys(cardData).length === 0){
        moreInfoCard = {date: "",
                        num: "",
                        fullData:""}
    }
    else{
        moreInfoCard = <DatapointCard
        title={cardData.date + ", " + "Experiment #" + cardData.num}
        content={cardData.fullData.toString()} />
    }
    const updateCard = (datapoint) => {
        console.log(datapoint)
        setCardData(datapoint)
    }
    return (
        <div>
            <XYPlot height={500} width={500}>
                <VerticalGridLines style={gridLineStyle} />
                <HorizontalGridLines style={gridLineStyle} />
                <XAxis title={props.i1} tickTotal={8} />
                <YAxis title={props.i2} tickTotal={8} />
                <MarkSeries data={props.plotData}
                    colorDomain={[0, 1, 2, 3, 4]}
                    colorRange={['#1d4877', '#1b8a5a', '#fbb021', '#f68838', '#ee3e32']}
                    onValueMouseOver={(datapoint, _) => {
                        updateCard(datapoint)
                        setCardVisible(true)
                    }}
                    onValueMouseOut={() => {
                        setCardVisible(false)
                    }} />
            </XYPlot>
            {cardVisible && moreInfoCard}
        </div>
    )
}

export default DynamicPlot;