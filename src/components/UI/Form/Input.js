import React from 'react'

export default function Input(props) {
    let inputElement = null;
    const inputClasses = ["bg-gray-700 mt-4 border border-gray-600 rounded-lg py-2 px-4 w-full"]

    if(props.invalid && props.shouldValidate && props.clicked){
        inputClasses.push("bg-red-600")
    }

    switch(props.elementType){
        case 'input': 
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} value={props.value} onChange={props.changed} autoComplete
            />
            break
        case 'textarea':
            inputElement = <textarea 
                className={inputClasses} 
                {...props.elementConfig} value={props.value} onChange={props.changed}
            />
            break
        case 'select':
            inputElement = <select 
                className={inputClasses} 
                value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option value={option.value} key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            break
        default: 
            inputElement = <input 
                className={inputClasses} 
                {...props.elementConfig} value={props.value} onChange={props.changed}
            />
    }

    return (
        <>
            <label className="block mb-2">{props.label}</label>
            {inputElement}
        </>
    )
}
