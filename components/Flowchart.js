import { FlowchartOne, FlowchartTwo, FlowchartThree} from './flowcharts'

export const Flowchart = ({ flowchart }) => {
    if (flowchart === 'FLOWCHART1') {
        return <div className="flowchart grey-outline"><FlowchartOne/></div>
    } else if (flowchart === 'FLOWCHART2') {
        return <div className="flowchart grey-outline"><FlowchartTwo/></div>
    } else if (flowchart === 'FLOWCHART3') {
        return <div className="flowchart grey-outline"><FlowchartThree/></div>
    } else {
        return null
    }
}