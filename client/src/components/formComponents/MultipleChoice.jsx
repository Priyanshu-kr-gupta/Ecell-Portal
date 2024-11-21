import React from 'react'

export default function MultipleChoice({questionId,options,selectedOption,onChange}) {
  return (
    <div className="mt-2">
    {options.map((option, i) => (
      <label key={i} className="block">
        <input
          type="radio"
          name={`question-${questionId}`}
          value={option}
          checked={selectedOption === option}
          onChange={() => onChange(questionId, option)}
        />{' '}
        {option}
      </label>
    ))}
  </div>
  )
}
