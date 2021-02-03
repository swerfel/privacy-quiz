const GRAPH_WIDTH = 700;
const MAX_BAR_HEIGHT = 80;
const LABEL_OFFSET = 20;
const GRAPH_HEIGHT = MAX_BAR_HEIGHT + LABEL_OFFSET;

const STROKE_WIDTH = 2;
const X_LABELS_COUNT = 10;
const TICS_LENGTH = 3;
const STROKE_COLOR = "black";

export function Axes(){
  return <g stroke={STROKE_COLOR}>
    <path d={"M 0 0 L 0 " + (-MAX_BAR_HEIGHT*1.1)}/>
    <path d={"M 0 0 L " + GRAPH_WIDTH + " 0"}/>
  </g>
}

export function Tics(){
  return <g>
    {Array.from({length: X_LABELS_COUNT + 1}, (x,i) => 
      <path key={i} d={"M " + (i/X_LABELS_COUNT*GRAPH_WIDTH) + " " + (-TICS_LENGTH) + " l 0 " + 2*TICS_LENGTH} stroke={STROKE_COLOR}/>
    )}
    <path d={"M " + (-TICS_LENGTH) + " 0 l " + 2*TICS_LENGTH + " 0"} stroke={STROKE_COLOR}/>
    <path d={"M " + (-TICS_LENGTH) + " " + (-MAX_BAR_HEIGHT) + " l " + 2*TICS_LENGTH + " 0"} stroke={STROKE_COLOR}/>
  </g>
}

export function Labels({maxValue}: {maxValue: number}){
  return <g>
    {Array.from({length: X_LABELS_COUNT + 1}, (x,i) => 
      <text key={i} x={i/X_LABELS_COUNT*GRAPH_WIDTH} y={LABEL_OFFSET} textAnchor="middle">{i/X_LABELS_COUNT*100}%</text>
    )}
    <text x={-2*TICS_LENGTH} y={-MAX_BAR_HEIGHT} textAnchor="end" alignmentBaseline="central">{maxValue}</text>
  </g>
}

export function Histogram({ values } : {values: number[]}) {
    const barCount = values.length;
    const barWidth = GRAPH_WIDTH / barCount;
    const barPadding = barWidth * 0.1;
    const maxValue = Math.max(...values, 1);
    
    return (
        <svg width="100%" height="100px" viewBox={(-LABEL_OFFSET) + " " + (-GRAPH_HEIGHT) + " " +(GRAPH_WIDTH + 2*LABEL_OFFSET) + " " + (GRAPH_HEIGHT + LABEL_OFFSET)}>
          <g strokeWidth={STROKE_WIDTH} strokeLinecap="round">
            <Axes/>
            <Tics/>
            <Labels maxValue={maxValue}/>

            <g transform="scale(1,-1)">
                {values.map((value, i) => 
                    <rect key={i} x={i * barWidth + barPadding} y={barPadding} width={barWidth - 2*barPadding} height={value/maxValue * (MAX_BAR_HEIGHT - 2*barPadding)} fill="#51a025"  />
                )}
            </g>
          </g>
        </svg>
    );
}