import Image from 'next/image'

export const FlowchartThree = () => (
    <div className="flex flex-col items-center bg-white">
        <Image 
            src="/flowchart.png"
            alt="Flowchart 3"
            height={300}
            width={300}
            />
        <p className="information">FLowchart 3</p>
    </div>
)