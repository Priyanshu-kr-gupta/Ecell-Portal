import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import TeamCard from '../components/TeamCard';

export default function ManageTeam() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamMemberData, setTeamMemberData] = useState({
    name: '',
    designation: '',
    email: '',
    linkedin: '',
  });
  const [profileImgFile, setProfileImgFile] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState('Developer');
  const designations = ['Developer', 'Designer', 'Manager', 'Tester'];

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamMemberData({ ...teamMemberData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfileImgFile(e.target.files[0]);
  };

  const handleAddTeamMember = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', teamMemberData.name);
    formData.append('designation', teamMemberData.designation);
    formData.append('email', teamMemberData.email);
    formData.append('linkedin', teamMemberData.linkedin);

    if (profileImgFile) {
      try {
        const compressedFile = await imageCompression(profileImgFile, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });
        formData.append('profile', compressedFile, compressedFile.name);
      } catch (error) {
        console.error('Image compression failed:', error);
      }
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/add-team-member', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Team member added successfully:', data);
        setTeamMembers([...teamMembers, data]);
        setIsModalOpen(false);
      } else {
        console.error('Failed to add team member');
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/public/get-team-members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ designation: selectedDesignation }),
      });
      if (response.ok) {
        const data = await response.json();
        setTeamMembers(data.teamMembers);
      } else {
        console.error('Failed to fetch team members');
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [selectedDesignation]);

  return (
    <div>
      <h1 className="text-2xl font-bold m-4">Manage Team</h1>

      {/* Filter by designation */}
      <div className="mb-5 pl-5">
        <label className="mr-2 text-gray-700">Filter by Designation:</label>
        <select
          value={selectedDesignation}
          onChange={(e) => setSelectedDesignation(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          {designations.map((designation) => (
            <option key={designation} value={designation}>
              {designation}
            </option>
          ))}
        </select>
      </div>

      {/* Display team members */}
      <div className="lg:w-[70%] md:w-[80%] sm:w-[90%] w-full max-w-7xl px-4 mb-5 ">
          <div className="grid gap-5 max-[390px]:gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 lg:gap-10">
          {teamMembers.map((member) => (
          <TeamCard member={member}/>
         
  ))}
  </div>
  </div>
  

      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white py-2 px-4 rounded fixed bottom-5 right-5"
      >
        Add New Team Member
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center p-2">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Team Member</h2>
            <form onSubmit={handleAddTeamMember}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={teamMemberData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Designation</label>
                <select
                  name="designation"
                  value={teamMemberData.designation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select Designation</option>
                  {designations.map((designation) => (
                    <option key={designation} value={designation}>
                      {designation}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={teamMemberData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={teamMemberData.linkedin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Profile Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
