import React, { useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

export default function NewQuestion({ id, onUpdate, onDelete }) {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('Short Answer');
  const [options, setOptions] = useState(['']);
  const [required, setRequired] = useState(false);

  const handleUpdate = () => {
    onUpdate(id, {
      text: questionText,
      type: questionType,
      options: options,
      required: required,
    });
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const updateOption = (index, value) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? value : option
    );
    setOptions(updatedOptions);
    handleUpdate();
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    handleUpdate();
  };

  return (
    <div className="w-full max-w-[800px] mt-4 p-6 bg-slate-50 flex flex-col items-center relative">
      <div className="w-full flex flex-wrap justify-end items-center">
        <input
          type="text"
          placeholder="Enter your question"
          value={questionText}
          onChange={(e) => {
            setQuestionText(e.target.value);
            handleUpdate();
          }}
          className="w-full p-3 mb-4 text-lg border-b outline-none"
        />

        <select
          className="max-w-[200px] p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={questionType}
          onChange={(e) => {
            setQuestionType(e.target.value);
            handleUpdate();
          }}
        >
          <option>Short Answer</option>
          <option>Paragraph</option>
          <option>Multiple Choice</option>
          <option>Dropdown</option>
          <option>Checkboxes</option>
        </select>
      </div>

      {['Multiple Choice', 'Dropdown', 'Checkboxes'].includes(questionType) &&(
        <div className="w-full">
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                className="w-full max-w-[200px] p-2 m-2 mb-0 text-lg border rounded-md outline-none"
              />
              <button
                onClick={() => removeOption(index)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            onClick={addOption}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaPlus className="mr-2" />
            Add Option
          </button>
        </div>
      )}

      <div className="w-full flex items-center justify-end mt-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => {
              setRequired(e.target.checked);
              handleUpdate();
            }}
            className="mr-2 w-4 h-4"
          />
          Required
        </label>
            
        <button
          onClick={() => onDelete(id)}
          className="px-4 py-2 text-red-500"
        >
          <FaTrash className="mr-2" />
        </button>
      </div>
      
    </div>
  );
}
