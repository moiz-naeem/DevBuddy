import React, { useState } from 'react';

function Dropdown({ label, items, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item) => {

    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen)}}
        className="btn m-1 w-full bg-gray-800 text-white"
      >
        {label}
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-base-100 rounded-box p-2 shadow max-h-48 overflow-y-auto border border-gray-300">
          {items.map((item, index) => (
            <li key={item.id}>
              <a
                
                onClick={(e) => {
                    e.preventDefault()
                     
                    handleSelect(item)}}
                className="block px-4 py-2 hover:bg-gray-600 cursor-pointer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
