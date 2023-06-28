import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHand, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

export const Label = ({ type, label }) => {
    if (type === "BLUE") {
        return <div className="info-label label bg-infoLabel mx-4">
                    <FontAwesomeIcon icon={faHand}/>
                    <p className="text-center text-2xl text-colorSecondary">{label}</p>
                </div>
    } else if (type === 'AMBER') {
        return <div className="warning-label label bg-warningLabel mx-4">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    <p className="text-center text-2xl text-white">{label}</p>
                </div>
    } else if (type === "RED") {
        return <div className="danger-label label bg-dangerLabel mx-4">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    <p className="text-center text-2xl text-white">{label}</p>
                </div>
    } else {
        return null
    }
}