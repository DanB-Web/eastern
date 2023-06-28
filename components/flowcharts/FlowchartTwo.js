import Image from 'next/image'

export const FlowchartTwo = () => (
    <div className="flex flex-col items-center bg-white">
        <Image 
            src="/flowchart.png"
            alt="Flowchart 2"
            height={300}
            width={300}
            />
        <p className="information">Flowchart 2</p>
    </div>
)