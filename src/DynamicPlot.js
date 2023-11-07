import {
    FlexibleXYPlot,
    MarkSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis, YAxis
} from 'react-vis'
import { Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';

export const baseContent = (obj) => {
    return <Typography variant="body">
        <Typography variant='h6'>Inputs</Typography>
        <Typography variant="body">
            {`${obj.i1k}: ${obj.i1v}\n\n${obj.i2k}: ${obj.i2v}`}
        </Typography>
        <Typography variant='h6'>Outputs</Typography>
        <Typography variant="body">
            {`${obj.ok}: ${obj.ov}\n`}
        </Typography>
        <Typography>Click dot to see more data</Typography>
    </Typography>
}
export const allContent = (obj) => {
    if (obj)
        return <Typography variant="body">
            <Typography variant='h6'>Inputs</Typography>
            <Typography variant="body">
                {JSON.stringify(obj.inputs, null, 2).slice(1, -1)}
            </Typography>
            <Typography variant='h6'>Outputs</Typography>
            <Typography variant="body">
                {JSON.stringify(obj.outputs, null, 2).slice(1, -1)}
            </Typography>
        </Typography>
    else return <Typography />
}
const DatapointCard = ({ title, content, cardType }) => {
    return (
        <div className='card-data'>
            <Card style={{ width: 400, height: 600 }}>
                <CardContent>
                    <Typography variant="h5">{title}</Typography>
                    {cardType === 1 && baseContent(content)}
                    {cardType === 2 && allContent(content)}
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
    const [cardType, setCardType] = useState(0)
    const [cardData, setCardData] = useState(DefCardData)
    var moreInfoCard;
    function convertDate(d) {
        return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}, ${d.getFullYear()}`
    }
    if (Object.keys(cardData).length === 0) {
        setCardType(0)
        moreInfoCard = DefCardData
    }
    else {
        moreInfoCard = <DatapointCard
            title={`${convertDate(cardData.date)}: Experiment #${cardData.num}`}
            content={cardData.fullData}
            cardType={cardType} />
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
                    onValueMouseOver={(dp, _) => {
                        console.log(props.o)
                        updateCard({
                            date: dp.date,
                            num: dp.num,
                            fullData: {
                                i1k: props.i1,
                                i1v: dp.fullData.inputs[props.i1],
                                i2k: props.i2,
                                i2v: dp.fullData.inputs[props.i2],
                                ok: props.o,
                                ov: dp.fullData.outputs[props.o],
                            }
                        })
                        setCardType(1)
                    }}
                    onValueMouseOut={() => {
                        setCardType(0)
                    }}
                    onValueClick={(dp) => {
                        updateCard(dp)
                        setCardType(2)
                    }} />
            </FlexibleXYPlot>
            {(cardType > 0) && moreInfoCard}
        </div>
    )
}

export default DynamicPlot;