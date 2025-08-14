import React,{useState} from 'react'

export default function Checkboxes({questionId,options,onChange,setRequire}) {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionChange = (option, isChecked) => {
        const updatedOptions = isChecked ? [...selectedOptions, option]
          : selectedOptions.filter((opt)=>opt!==option); 

        setSelectedOptions(updatedOptions);
        onChange(questionId, updatedOptions.join(", "));
      };
  return (
    <div className="mt-2">
    {options.map((option, index) => (
      <label key={index} className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          checked={selectedOptions.includes(option)}
          onChange={(e) => handleOptionChange(option, e.target.checked)}
          required={setRequire}
        />{" "}
        {option}
      </label>
    ))}
  </div>
  )
}
