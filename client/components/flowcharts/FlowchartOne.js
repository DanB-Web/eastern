import Image from 'next/image'

export const FlowchartOne = () => (
    <div className="flex flex-col items-center bg-white">
        <Image 
            src="/flowchart.png"
            alt="Flowchart 1"
            height={300}
            width={300}
            />
        <p className="information">Flowchart 1</p>
    </div>
)