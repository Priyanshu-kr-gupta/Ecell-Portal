import React, { useState, useEffect } from "react";

const data = [
  {
    _id: "6733414dd4cbf0963b249494",
    name: "Light Yagami2",
    intro: "Death Note Owner",
    avatar:
      "https://res.cloudinary.com/dnefmapsj/image/upload/v1731412299/rclbggdycrtqn5ti6odm.jpg",
    about: "Masterminded, Killer , God of New World lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
  },
  {
    _id: "6736d125ffccc956f14968a8",
    name: "Mr. Boss",
    intro: "Boss Owner",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4D35AQEZh9Cm1jGZ6A/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1726451468052?e=1732251600&v=beta&t=GeKnVnT9nicCsDSlDDT0w86hiH6AqjbIt_QAteccP34",
    about: "Boss Of the World Masterminded, Killer , God of New World lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
  },
  {
    _id: "6736d743ffccc956f14968bd",
    name: "M S Dhoni",
    intro: "A Good Speaker",
    avatar:
      "https://res.cloudinary.com/dnefmapsj/image/upload/v1731647299/jdtizy0ru0xkngwelyv7.jpg",
    about: "jhfhff Masterminded, Killer , God of New World lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
  },
];

const ImgSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return; // Stop auto-slide if hovered
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 1000); // Slide every 3 seconds
    return () => clearInterval(interval);
  }, [isHovered, data.length]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-800">
      
      <div
        className="w-full max-w-3xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-gray-900 text-white p-10 rounded-lg shadow-lg">
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src={data[currentIndex].avatar}
                alt={data[currentIndex].name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="mt-5 text-center">
            <h2 className="text-2xl font-semibold mb-2 text-violet-500">
              {data[currentIndex].name}
            </h2>
            <p className="text-base font-light text-gray-400 mb-5">
              {data[currentIndex].intro}
            </p>
            <div className="text-lg font-light mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="w-8 h-8 mr-auto ml-10 dark:text-violet-400"
              >
                <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
              </svg>
              <p className="max-w-2xl mx-auto">{data[currentIndex].about}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="w-8 h-8 ml-auto mr-10 dark:text-violet-400"
              >
                <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImgSlider;
