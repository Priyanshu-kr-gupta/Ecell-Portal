import React from 'react'

export default function ShortAnswer({questionId,value,onChange,setRequire}) {
  return (
    <input
    type="text"
    className="w-full mt-2 p-2 rounded-lg border border-[#3A4A5F] bg-[#2E3A4D] outline-none"
    placeholder="Short Answer"
    value={value || ''}
    onChange={(e) => onChange(questionId, e.target.value)}
    required={setRequire}
  />
  )
}
