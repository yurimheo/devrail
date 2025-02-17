import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PricingAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border rounded-lg overflow-hidden">
          <motion.div
            className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
            onClick={() => toggle(index)}
            whileHover={{ backgroundColor: '#e5e7eb' }}
          >
            <div className="flex items-center space-x-2">
              <img
                src={item.icon || '/placeholder.svg'}
                alt={`${item.title} icon`}
                className="h-6 w-6"
              />
              <span className="text-lg font-semibold text-gray-800">
                {item.title}
              </span>
            </div>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              animate={{ rotate: openIndex === index ? 180 : 0 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </motion.div>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-white">
                  <p className="text-sm text-gray-600">{item.content}</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-blue-100 px-2 py-1 rounded-md text-sm text-blue-700 mt-2">
                      학습 일정: {item.learningPeriod}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default PricingAccordion;
