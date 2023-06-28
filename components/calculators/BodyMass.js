import { useState } from 'react'

export const BodyMass = () => {

    const DEFAULT_BMI = 40

    const [calculatorInputs, setCalculatorInputs] = useState({
        height: 100,
        weight: 40
    })
    const [result, setResult] = useState(DEFAULT_BMI.toFixed(2))

    const submitHandler = (e) => {
        e.preventDefault();
        const { height, weight } = calculatorInputs
        const heightMetres = height / 100;
        const bmi = weight / heightMetres / (heightMetres * heightMetres);
        setResult(bmi.toFixed(2))
    }

    const formHandler = (e) => {
        const { name, value } = e.target
        setCalculatorInputs({...calculatorInputs, [name]: parseInt(value)})
    }

    return(
        <div className="flex flex-col items-center bg-white">
            <p className="text-xl mb-6">BMI: {result}</p>
            <form onSubmit={submitHandler} className="flex flex-col md:flex-row justify-between items-center w-3/5">
            <fieldset className="mb-4 md:mb-0">
                <label 
                    htmlFor="height" 
                    className="p-2">Height (cm):</label>
                <input 
                    name="height" 
                    type="number" 
                    value={calculatorInputs.height} 
                    onChange={formHandler}/>
            </fieldset>
            <fieldset className="mb-4 md:mb-0">
                <label 
                    htmlFor="weight" 
                    className="p-2">Weight (kg):</label>
                <input 
                    name="weight" 
                    type="number" 
                    value={calculatorInputs.weight} 
                    onChange={formHandler}/>
            </fieldset>
                <button className="calc-btn" type="submit">Submit</button>
            </form>
            <p className="information">Body Mass Index Calculator</p>
        </div>
    )
}