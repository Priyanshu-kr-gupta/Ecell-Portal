// import React from 'react'

// export default function Setting() {
//   return (
//     <div>Setting</div>
//   )
// }
// import React from 'react';
// // Replace with the actual path to your image

// // const TestimonialCard = () => {
// //   return (
// //     <div className="bg-gray-900 text-white p-10 rounded-lg shadow-lg">
// //       <div className="flex justify-center">
// //         <div className="w-32 h-32 rounded-full overflow-hidden">
// //           <img src="https://images.pexels.com/photos/28993970/pexels-photo-28993970/free-photo-of-stylish-woman-in-black-against-concrete-wall.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Vijay Shekhar Sharma" className="w-full h-full object-cover" />
// //         </div>
// //       </div>
// //       <div className="mt-5 text-center">
// //         <h2 className="text-xl font-bold mb-2">Mr. Vijay Shekhar Sharma</h2>
// //         <p className="text-sm font-light text-gray-400 mb-5">Founder & CEO, Paytm</p>
// //         <p className="text-sm font-light">
// //           <span className="text-gray-400">"</span>
// //           I had a great time at E-Cell DTU's event, feeling the excitement from all the young folks. It's cool to see E-Cell DTU bringing in leaders like me for chats. They're creating a space where students can have good talks and learn a lot about starting their own thing.
// //           <span className="text-gray-400">"</span>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// export default TestimonialCard;

import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
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
  // Add more testimonials here...
];
const ImgSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000); // 3 seconds interval
    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full">
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
            <p className="text-base font-light text-gray-400 mb-5 ">
              {data[currentIndex].intro}
            </p>
            <div className="text-lg font-light  mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" class="w-8 h-8 mr-auto ml-10 dark:text-violet-400"><path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path><path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path></svg>
            <p className=" max-w-2xl mx-auto">{data[currentIndex].about}</p>
              
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" class="w-8 h-8 ml-auto mr-10 dark:text-violet-400"><path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path><path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImgSlider;
