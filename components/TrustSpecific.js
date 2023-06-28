
import { CURRENT_TRUST } from '../config';
import { SubHeading } from './Subheading';

export const TrustSpecific = ({trust, content}) => {

    // Check env var for trust - return null
    if (trust !== CURRENT_TRUST) {
        return null;
    }

    const title = `${trust} Trust Supporting Information`

    return (
        <div>
            <SubHeading heading={title}/>
            <div className="bg-white px-4 pb-4" dangerouslySetInnerHTML={{__html: content }}/>
        </div>
    )
}