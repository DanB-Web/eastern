export const Content = ({ content }) => {
    return (<div className="bg-white p-4" dangerouslySetInnerHTML={{__html: content }}/>)
}