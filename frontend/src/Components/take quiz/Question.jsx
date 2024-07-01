import React, { useState } from 'react';
import { getRandomColor } from '../../Utils/random_color';

const Question = ({ question, index, handleOptionClick }) => {
    const [{ bg, border }] = useState(getRandomColor());
    const [selectedOption, setSelectedOptions] = useState(-1);

    const handleClick = (optionIndex, option) => () => {
        handleOptionClick(index, option);
        setSelectedOptions(optionIndex);
    };

    return (
        <div className={`flex flex-col w-full gap-5 ${bg} border ${border} rounded-md mb-6 p-5`}>
            <h3><span className='font-bold'>Q{index+1}</span> {question.question}</h3>
            <div className='grid grid-row-4 md:grid-rows-2 md:grid-flow-col gap-3'>
                {question.options.map((option, optionIndex) => (
                    <div
                        key={optionIndex}
                        className={`p-2 rounded-lg cursor-pointer ${selectedOption === optionIndex ? 'bg-green-500' : 'bg-green-300'}`}
                        onClick={handleClick(optionIndex, option)}
                    >
                        <label className='flex items-center gap-2 cursor-pointer'>
                            <span>{option}</span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Question;
