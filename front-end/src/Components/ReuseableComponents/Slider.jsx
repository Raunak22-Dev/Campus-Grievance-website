import { useState, useEffect } from 'react';

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const sections = [
    {
      title: 'Easy Reporting',
      description: 'Report any issues or grievances in a simple and straightforward process.',
    },
    {
      title: 'Track Status',
      description: 'Stay updated with the progress of your grievance and resolutions.',
    },
    {
      title: 'Support Team',
      description: 'Our support team is here to assist you with any concerns.',
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % sections.length);
    }, 3000); // Change slide every 10 seconds

    return () => clearInterval(intervalId);
  }, [sections.length]);

  return (
    <div id="carousel" className="relative w-full max-w-screen-xl mx-auto perspective-1000">
      {/* Carousel Wrapper */}
      <div className="relative h-80 flex justify-center items-center overflow-hidden rounded-lg">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`absolute w-full flex justify-center items-center transition-opacity duration-700 ease-in-out ${
              activeIndex === index ? 'opacity-100 z-20' : 'opacity-0 z-10'
            }`}
            style={{
              transform: `translateX(${
                (index - activeIndex) * 100
              }%) rotateY(${(index - activeIndex) * 60}deg)`,
              transformOrigin: 'center center',
              transition: 'transform 1s ease-in-out, opacity 1s ease-in-out',
            }}
          >
            <div className="bg-white p-8 rounded-xl shadow-xl text-center transform hover:scale-110 transition-transform duration-300 ease-in-out max-w-lg">
              <h3 className="text-3xl font-semibold mb-4 text-blue-700">{section.title}</h3>
              <p className="text-xl text-gray-700">{section.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Indicators */}
      <div className="absolute z-30 flex justify-center bottom-5 left-1/2 transform -translate-x-1/2 space-x-3 rtl:space-x-reverse">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              activeIndex === index ? 'bg-blue-500' : 'bg-gray-400'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
