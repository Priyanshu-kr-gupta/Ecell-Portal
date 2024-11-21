import React from 'react'

export default function Dropdown({questionId,options,selectedOption,onChange}) {
  return (
    <select
    className="w-full mt-2 p-2 border rounded-lg border-[#3A4A5F] bg-[#2E3A4D] outline-none"
    value={selectedOption || ''}
    onChange={(e) => onChange(questionId, e.target.value)}
  >
    <option value="" disabled>
      Select an option
    </option>
    {options.map((option, i) => (
      <option key={i} value={option}>
        {option}
      </option>
    ))}
  </select>
  )
}
