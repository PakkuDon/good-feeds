import React, { useState } from "react";

interface CollapsibleSectionProps {
  children: React.ReactNode;
  heading: string;
}

const CollapsibleSection = ({ children, heading }: CollapsibleSectionProps) => {
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <div className="pb-4">
      <header className="flex justify-between">
        <h2 className="font-bold">
          <span className="capitalize">{heading}</span>
        </h2>
        {visible ? (
          <button
            className="rounded bg-gray-800 hover:bg-gray-600 px-2 font-semibold text-sm"
            aria-label={`Hide ${heading}`}
            onClick={() => setVisible(false)}
          >
            -
          </button>
        ) : (
          <button
            className="rounded bg-gray-800 hover:bg-gray-600 px-2 font-semibold text-sm"
            aria-label={`Show ${heading}`}
            onClick={() => setVisible(true)}
          >
            +
          </button>
        )}
      </header>
      {visible && children}
    </div>
  );
};

export default CollapsibleSection;
