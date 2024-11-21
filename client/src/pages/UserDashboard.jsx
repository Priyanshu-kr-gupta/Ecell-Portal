import React from "react";

export default function UserDashboard() {
  const notices = [
    { id: 1, message: "Meeting scheduled at 3 PM" },
    { id: 2, message: "E submitt will be on february" },
    { id: 3, message: "a for apple b for ball c for cat" },
  ];

  return (
    <div className="w-full h-screen p-5 overflow-y-auto flex flex-col">
      <h1 className="text-2xl font-bold m-4 p-4 left-0 text-white">
        User Dashboard
      </h1>
      <div className="w-full flex flex-col items-center bg-[#222E3C] h-full p-4 overflow-y-auto">
        <h1 className="text-xl font-bold m-4 p-4 left-0 text-white">
          Noticeboard
        </h1>
        {notices.length > 0 ? (
            notices.map((notice) => (
              <div
                key={notice.id}
                className="text-gray-200 text-lg cursor-pointer hover:bg-[#52729b8b] bg-[#344050] px-5 py-4 rounded-md mb-2 w-full"
              >
                {"🔹 "+notice.message}
              </div>
            ))
        ) : (
          <p className="text-white text-sm italic w-full text-center">
            No notices to display at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
