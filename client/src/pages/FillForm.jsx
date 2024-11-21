import React,{useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import Checkboxes from "../components/formComponents/Checkboxes"
import Paragraph from "../components/formComponents/Paragraph"
import ShortAnswer from "../components/formComponents/ShortAnswer"
import MultipleChoice from "../components/formComponents/MultipleChoice"
import Dropdown from "../components/formComponents/Dropdown"
export default function FillForm() {

  const {formId}=useParams();
  const [formDetails, setFormDetails] = useState({});
  const [responses, setResponses] = useState([]);

  const handleResponseChange = (id, answer) => {
    setResponses((prevResponses) => {
      const existingResponse = prevResponses.find((resp) => resp.questionId === id);

      if (existingResponse) {
        return prevResponses.map((resp) =>
          resp.questionId === id ? { ...resp, answer } : resp
        );
      } else {
        return [...prevResponses, { questionId: id, answer }];
      }
    });
  };
  const showResponse=()=>{
    console.log(responses)
  }



  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/get-form`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({formId}),
      });

        const data = await response.json();
        if (response.ok) {
          setFormDetails(data.form[0]);
        } else {
          console.error(data.error || 'Failed to fetch form details');
        }
      } catch (error) {
        console.error('Error fetching form details:', error);
      }
    };

    fetchFormDetails();
  }, [formId]);
  return (
   <div className="p-5 pt-10 w-full h-screen overflow-y-auto">
        <p className='w-full text-right text-[1rem] font-medium mb-10 text-gray-400'>Last Date: {formDetails.endDate}</p>
      <h1 className="text-3xl font-bold mb-4 text-white">{formDetails.title}</h1>
      <p className="text-lg font-medium mb-10 text-gray-300">{formDetails.description}</p>
      {formDetails.questions?.length > 0 ? 
      formDetails.questions.map((question, index) => 
    
      <div key={question._id} className="mb-6 text-white">
           <label className="block text-lg font-semibold">{question.text}</label>
           {question.type === 'Short Answer' && (
          <ShortAnswer
            questionId={question._id}
            value={responses.find((resp) => resp.questionId === question._id)?.answer}
            onChange={handleResponseChange}
          />
        )}
        {question.type === 'Paragraph' && (
          <Paragraph
            questionId={question._id}
            value={responses.find((resp) => resp.questionId === question._id)?.answer}
            onChange={handleResponseChange}
          />
        )}
        {question.type === 'Multiple Choice' && (
          <MultipleChoice
            questionId={question._id}
            options={question.options}
            selectedOption={responses.find((resp) => resp.questionId === question._id)?.answer}
            onChange={handleResponseChange}
          />
        )}
        {question.type === 'Checkboxes' && (
          <Checkboxes
            questionId={question._id}
            options={question.options}
            onChange={handleResponseChange}
          />
        )}
        {question.type === 'Dropdown' && (
          <Dropdown
            questionId={question._id}
            options={question.options}
            selectedOption={responses.find((resp) => resp.questionId === question._id)?.answer}
            onChange={handleResponseChange}
          />
        )}
    </div>
        )
      
      :''}
    </div>
  )
}
