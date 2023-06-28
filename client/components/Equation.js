import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
// import { MathComponent } from "mathjax-react";

const MathJax = dynamic(() => {
    return import('mathjax-react')
}, {
    ssr: false,
    loading: () => <p>Loading MathJax...</p>
})

// export const Equation = ({ title, equation }) => {

//     const [equationComponent, setEquationComponent] = useState(null)

//     useEffect(() => {
//         setEquationComponent(<MathComponent tex={equation}/>)
//     }, []);

//     return (
//         <div className="flex flex-col items-center bg-white">
//         {equationComponent}
//         <p className="information">{title}</p>
//     </div>
//     )
// };


export const Equation = ({ title, equation }) => {

    const [content, setContent] = useState(null);

    useEffect(() => {
        const loadLibrary = async () => {
            const MathJaxLib = await import('mathjax-react')
            const { MathComponent } = MathJaxLib;
            setContent(<MathComponent tex={equation}/>)
        }
        loadLibrary();
    }, [])    

    return (
        <div className="flex flex-col items-center bg-white">
            {content}
            <p className="information">{title}</p>
        </div>
    )
};