import React, { useState } from 'react';

export default function EcellFormBuilder() {
  const [form, setForm] = useState({ title: '', description: '', questions: [] });
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('text');
  const [options, setOptions] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const addQuestion = () => {
    setForm({
      ...form,
      questions: [
        ...form.questions,
        {
          questionText,
          questionType,
          options: options.split(','),
        },
      ],
    });
    setQuestionText('');
    setQuestionType('text');
    setOptions('');
  };

  const handleSubmit = () => {
    // Just logging the form data for now
    console.log('Form Submitted:', form);
    setFormSubmitted(true);
  };

  return (
    <div className="w-full h-screen overflow-auto">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Create a Form</h1>
        <div className="mb-4">
          <input
            type="text"
            value={form.title}
            placeholder="Form Title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <textarea
            value={form.description}
            placeholder="Form Description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
          />
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-medium">Add Question</h2>
          <div className="mb-4">
            <input
              type="text"
              value={questionText}
              placeholder="Question Text"
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <select
              onChange={(e) => setQuestionType(e.target.value)}
              value={questionType}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="text">Text</option>
              <option value="multiple_choice">Multiple Choice</option>
              <option value="checkbox">Checkbox</option>
              <option value="dropdown">Dropdown</option>
              <option value="date">Date</option>
            </select>
          </div>
          <div className="mb-4">
            <textarea
              value={options}
              placeholder="Options (comma separated)"
              onChange={(e) => setOptions(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="3"
            />
          </div>
          <button
            onClick={addQuestion}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Question
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-medium">Form Preview</h2>
          <div className="border p-4 rounded-md bg-gray-50 mt-4">
            <h3 className="text-2xl font-semibold">{form.title}</h3>
            <p className="mt-2">{form.description}</p>
            {form.questions.map((question, index) => (
              <div key={index} className="mt-4">
                <h4 className="text-lg font-medium">{question.questionText}</h4>
                {question.questionType === 'multiple_choice' && (
                  <ul className="mt-2">
                    {question.options.map((option, idx) => (
                      <li key={idx} className="mb-2">
                        <label className="inline-flex items-center">
                          <input type="radio" name={`question-${index}`} className="mr-2" /> {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
                {question.questionType === 'checkbox' && (
                  <ul className="mt-2">
                    {question.options.map((option, idx) => (
                      <li key={idx} className="mb-2">
                        <label className="inline-flex items-center">
                          <input type="checkbox" name={`question-${index}`} className="mr-2" /> {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
                {question.questionType === 'dropdown' && (
                  <select className="mt-2 p-2 border border-gray-300 rounded-md w-full">
                    {question.options.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
                {question.questionType === 'date' && <input type="date" className="mt-2 p-2 border border-gray-300 rounded-md w-full" />}
                {question.questionType === 'text' && <input type="text" className="mt-2 p-2 border border-gray-300 rounded-md w-full" />}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Submit Form
        </button>
        {formSubmitted && (
          <p className="mt-4 text-green-500">Form has been submitted!</p>
        )}
      </div>
    </div>
  );
}
