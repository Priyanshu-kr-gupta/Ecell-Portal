import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Responses = (Props) => {
  const { formId } = Props;
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResponses = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/get-responses`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formId }),
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch responses');
        setResponses(data.responses);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [formId]);

  if (loading) return <p className="text-gray-300">Loading…</p>;
  if (error)   return <p className="text-red-400">Error: {error}</p>;
  if (responses.length === 0) return <p>No responses yet.</p>;

  return (
    <div className="p-4 bg-[#222E3C] text-white rounded-lg shadow-md">
      <div className="flex justify-end mb-4">
        <a
          href={`${import.meta.env.VITE_BACKEND_URL}/api/admin/export-responses/${formId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
          download
        >
          Download Excel
        </a>
      </div>

      <h2 className="text-2xl font-bold mb-4">Responses</h2>

      <div className="space-y-4">
        {responses.map((r, i) => (
          <div key={i} className="p-4 bg-[#2E3A4D] rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">
              {r.userId.Name}
            </h3>
            <h3 className='text-sm'>{r.userId.Email}</h3>
            <p className="text-sm text-gray-400">
              Reg No: {r.userId.Reg_No} | Contact: {r.userId.Contact_No}
            </p>
            <p className="text-sm text-gray-400">
              Submitted At: {new Date(r.submittedAt).toLocaleString()}
            </p><br/>
            <hr/>
            {r.answers.map((ans, idx) => (
              <div key={idx} className="mt-2">
                <p className="font-medium">{ans.questionId.text}</p>
                <p>{ans.answer}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Responses;
