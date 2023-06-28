import { SOURCE_URL } from '../config'

export const SupportingVideo = ({title, url, type }) => (
    <div className="flex flex-col items-center bg-white">
        <video width="640" height="240" controls>
            <source src={`${SOURCE_URL}/${url}`} type={type}></source>
        </video>
        <p className="information">{title}</p>
    </div>
)