import React, { useState } from 'react';
import { getRandomColor } from '../../Utils/random_color';

const Question = ({ question, index }) => {
    const [{ bg, border }] = useState(getRandomColor());
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (optionIndex) => {
        setSelectedOption(optionIndex);
    };

    return (
        <div className={`flex flex-col w-full gap-5 ${bg} border ${border} rounded-md mb-6 p-5`}>
            <h3><span className='font-bold'>Q{index}</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, fugiat aut, ab illo repellendus perferendis necessitatibus modi eius excepturi laboriosam minus magni, facilis nobis distinctio suscipit deserunt culpa sequi! Tenetur.</h3>
            <div className='grid grid-row-4 md:grid-rows-2 md:grid-flow-col gap-3'>
                {Array(4).fill(null).map((_, optionIndex) => (
                    <div
                        key={optionIndex}
                        className={`p-2 rounded-lg cursor-pointer ${selectedOption === optionIndex ? 'bg-green-500' : 'bg-green-300'}`}
                        onClick={() => handleOptionClick(optionIndex)}
                    >
                        <label className='flex items-center gap-2 cursor-pointer'>
                            <span>Option {optionIndex + 1}</span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Question;
