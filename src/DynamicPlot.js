import {
    FlexibleXYPlot,
    MarkSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis, YAxis
} from 'react-vis'
import { Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';

export const prettyPrint = (obj) => {
    if (obj)
        return JSON.stringify(obj, null, 2).slice(1, -1)
    else return ""
}
const DatapointCard = ({ title, content }) => {
    return (
        <div className='card-data'>
            <Card style={{width:400, height: 600}}>
                <CardContent>
                    <Typography variant="h5">{title}</Typography>
                    <Typography variant="body">
                        <Typography variant='h6'>Inputs</Typography>
                        <Typography variant="body">
                            {prettyPrint(content.inputs)}
                        </Typography>
                        <Typography variant='h6'>Outputs</Typography>
                        <Typography variant="body">
                            {prettyPrint(content.outputs)}
                        </Typography>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

const gridLineStyle = {
    stroke: '#aaaaaa',
    strokeWidth: 1,
};
const DefCardData = {
    date: new Date(),
    num: "",
    fullData: ""
};
const DynamicPlot = (props) => {
    const [cardVisible, setCardVisible] = useState(false)
    const [cardData, setCardData] = useState(DefCardData)
    var moreInfoCard;
    function convertDate(d){
        return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}, ${d.getFullYear()}`
    }
    if (Object.keys(cardData).length === 0) {
        moreInfoCard = DefCardData
    }
    else {
        moreInfoCard = <DatapointCard
            title={`${convertDate(cardData.date)}, Experiment #${cardData.num}`}
            content={cardData.fullData} />
    }
    const updateCard = (datapoint) => {
        console.log(datapoint)
        setCardData(datapoint)
    }
    return (
        <div>
            <FlexibleXYPlot height={500} width={500}>
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
            </FlexibleXYPlot>
            {cardVisible && moreInfoCard}
        </div>
    )
}

export default DynamicPlot;