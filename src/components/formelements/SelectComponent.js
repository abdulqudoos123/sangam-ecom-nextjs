import React from 'react'

const SelectComponent = ({ label, value, onchange, options = [], }) => {
    return (
        <div className='relative'>
            <p className="pt-0 pr-2 absolute pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white">

                {label}
            </p>
            <select
                value={value}
                onChange={onchange}
                className='border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-lg'
            >
                {
                    options && options.length ?
                        options.map((optionsitem) => (
                            <option id={optionsitem.id} value={optionsitem.id} key={optionsitem.id}>
                                {optionsitem.label}
                            </option>)) :
                        <option id='' value={''}>select</option>
                }
            </select>
        </div>
    )
}

export default SelectComponent
