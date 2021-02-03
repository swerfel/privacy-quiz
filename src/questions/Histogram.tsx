import { Box } from '@material-ui/core';


export function Histogram({ values } : {values: number[]}) {
    const graphWidth = 700;
    const graphHeight = 100;
    const AXIS_WIDTH = 2;
    const LABEL_OFFSET = 20;
    const X_LABELS_COUNT = 10;
    const TICS_LENGTH = 3;

    const barCount = values.length;
    const barWidth = graphWidth/barCount;
    const maxBarHeight = 80;
    const barPadding = graphWidth*0.05/barCount

    const maxValue = Math.max(...values);
    console.log(values)
    
    return (
      /*<Box boxShadow={1}>
          <Box height="100px" width="100%" 
          display="flex"
          alignItems="flex-end">
              {values.map(value => 
              <Box height={value / maxValue} minHeight="1px" bgcolor="grey.300"  width={barWidth} display="inline-block" fontSize="0.8em" textAlign="center">
                  0% - 10%
              </Box>) 
              }
          </Box>
      </Box>*/
        <svg width="100%" height="100px" viewBox={(-AXIS_WIDTH-LABEL_OFFSET)+" "+ (-graphHeight) + " " +(graphWidth+AXIS_WIDTH+2*LABEL_OFFSET)+" " + (graphHeight+AXIS_WIDTH+LABEL_OFFSET)}>
          <g strokeWidth={AXIS_WIDTH} strokeLinecap="round">
            {/* axis */}
            <path d={"M 0 0 L 0 "+-maxBarHeight*1.1} stroke="black"/>
            <path d={"M 0 0 L "+graphWidth+" 0"} stroke="black"/>

            {/* histogram blocks */}
            <g transform="scale(1,-1)">
                {values.map((value, i) => 
                    <rect width={barWidth-2*barPadding} height={value/maxValue * (maxBarHeight -2*barPadding)} x={i * barWidth + barPadding} y={barPadding} fill="#008d46"  />
                )}
            </g>

            {/* x axis labeling */}
            {Array.from({length: X_LABELS_COUNT+1}, (x,i) => <>
              <text x={i/X_LABELS_COUNT*graphWidth} y={LABEL_OFFSET} textAnchor="middle">{i/X_LABELS_COUNT*100}%</text>
              <path d={"M "+(i/X_LABELS_COUNT*graphWidth)+" "+(-TICS_LENGTH)+" l 0 "+2*TICS_LENGTH} stroke="black"/>
            </>)}
            
            {/* y axis labeling */}
            <text x={-LABEL_OFFSET} y={-maxBarHeight+barPadding} textAnchor="end" alignmentBaseline="central">{maxValue}</text>
          </g>
        </svg>
    );
}