import { useState } from 'react'

export const BloodPressure = () => {

    const NORMAL = 'Normal'
    const HIGH = 'High'

    const [calculatorInputs, setCalculatorInputs] = useState({
        systolic: 110,
        diastolic: 70
    })
    const [result, setResult] = useState(NORMAL)

    const submitHandler = (e) => {
        e.preventDefault();
        const { systolic, diastolic } = calculatorInputs
        if (systolic >= 130 || diastolic >= 80) {
            setResult(HIGH)
        } else {
            setResult(NORMAL)
        }
    }

    const formHandler = (e) => {
        const { name, value } = e.target
        setCalculatorInputs({...calculatorInputs, [name]: parseInt(value)})
    }

    return(
        <div className="flex flex-col items-center bg-white">
            <p className="text-xl mb-6">Blood Pressure: {result}</p>
            <form onSubmit={submitHandler} className="flex flex-col md:flex-row justify-between items-center w-3/5">
            <fieldset className="mb-4 md:mb-0">
                <label 
                    htmlFor="systolic" 
                    className="p-2">Systolic:</label>
                <input 
                    name="systolic" 
                    type="number" 
                    value={calculatorInputs.systolic} 
                    onChange={formHandler}/>
            </fieldset>
            <fieldset className="mb-4 md:mb-0">
                <label 
                    htmlFor="diastolic" 
                    className="p-2">Diastolic:</label>
                <input 
                    name="diastolic" 
                    type="number" 
                    value={calculatorInputs.diastolic} 
                    onChange={formHandler}/>
            </fieldset>
                <button className="calc-btn" type="submit">Submit</button>
            </form>
            <p className="information">Blood Pressure Calculator</p>
        </div>
    )
}
