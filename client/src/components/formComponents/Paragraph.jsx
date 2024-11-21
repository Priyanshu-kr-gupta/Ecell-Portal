import React from 'react'

export default function Paragraph({questionId,value,onChange}) {
  return (
    <textarea
    className="w-full min-h-[120px] mt-2 p-2 rounded-lg border border-[#3A4A5F] bg-[#2E3A4D] outline-none"
    placeholder="Paragraph Answer"
    value={value || ''}
    onChange={(e) => onChange(questionId, e.target.value)}
  />
  )
}
