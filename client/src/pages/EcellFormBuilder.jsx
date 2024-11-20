import React, { useState } from 'react';
import NewQuestion from '../components/NewQuestion';

export default function EcellFormBuilder() {
  const [formQuestions, setFormQuestions] = useState([]);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const handleAddQuestion = () => {
    const newQuestion = { id: Date.now(), text: '', type: 'Short Answer' };
    setFormQuestions([...formQuestions, newQuestion]);
  };

  const handleUpdateQuestion = (id, updatedQuestion) => {
    setFormQuestions((previousQuestions) => {
      const updatedQuestions = previousQuestions.map((question) => {
        if (question.id === id) {
          const newQuestion = {
            ...question,
            ...updatedQuestion,
          };
          return newQuestion;
        } else {
          return question;
        }
      });
      return updatedQuestions;
    });
  };
  

  const handleDeleteQuestion = (id) => {
    setFormQuestions((previousQuestions) => {
      const remainingQuestions = previousQuestions.filter((question) => {
        const check= question.id !== id;
        return check;
      });
      return remainingQuestions;
    });
  };

  const handleSaveForm = async () => {
    try {
      const formData = {
        title: formTitle,
        description: formDescription,
        questions: formQuestions.map((question) => ({
          text: question.text,
          type: question.type,
          options: question.options || [],
          required: question.required || false,
        })),
      };
  
      const response = await fetch(  import.meta.env.VITE_BACKEND_URL+"/api/admin/create-form", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Form saved successfully!');
      } else {
        alert(`Error: ${data.error || 'Failed to save form'}`);
      }
    } catch (error) {
      console.error('Error saving form:', error);
      alert('An unexpected error occurred while saving the form.');
    }
  };
  

  return (
    <>
      <div className="w-full h-screen p-5 overflow-y-auto flex flex-col">
      <h1 className="text-2xl font-bold m-4 p-4  left-0 text-white">Ecell-Forms</h1>
        
        <div className="w-full flex flex-col items-center">
          <input
            type="text"
            placeholder="Untitled Form"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="w-full max-w-[1000px] min-w-[300px] p-3 bg-[#19222C] mb-4 text-4xl outline-none focus:border-b-2 focus:border-blue-500 text-white"
          />
          <input
            type="text"
            placeholder="Form Description"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="w-full max-w-[1000px] min-w-[300px] p-3 mb-4 bg-[#19222C] text-lg outline-none focus:border-b-2 focus:border-blue-500 text-white"
          />
        </div>

        <div className="w-full mb-6 flex items-center flex-col">
          {formQuestions.map((question) => (
            <NewQuestion
              key={question.id}
              id={question.id}
              onUpdate={handleUpdateQuestion}
              onDelete={handleDeleteQuestion}
            />
          ))}
        </div>


        <button
          onClick={handleAddQuestion}
          className="px-4 py-2 max-w-[200px] ml-auto text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Add Question
        </button>

      </div>
      
      <button
  onClick={handleSaveForm}
  className="fixed bottom-2 right-2  ml-auto px-4 py-2 max-w-[200px] mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700"
>
  Save Form
</button>
    </>
  );
}
