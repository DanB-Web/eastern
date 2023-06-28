import { BodyMass, BloodPressure } from './calculators'

export const Calculator = ({ calculator }) => {
    if (calculator === 'BM') {
        return <BodyMass/>
    } else if (calculator === 'BL') {
        return <BloodPressure/>
    } else {
        return null;
    }
}