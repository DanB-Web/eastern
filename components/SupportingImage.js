import Image from 'next/image'
import { SOURCE_URL } from '../config'

export const SupportingImage = ({title, image}) => (
    <div className="flex flex-col items-center bg-white">
        <Image 
            src={`${SOURCE_URL}/${image.src}`} 
            alt={title}
            height={300}
            width={300}
            />
        <p className="information">{title}</p>
    </div>
);
