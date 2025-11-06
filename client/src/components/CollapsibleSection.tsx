import React from "react";

interface CollapsibleSectionProps {
  children: React.ReactNode;
  heading: string;
}

const CollapsibleSection = ({ children, heading }: CollapsibleSectionProps) => {
  // `details` open state is not controlled as onToggle can cause infinite re-renders
  // https://github.com/facebook/react/issues/15486
  return (
    <details className="py-2 cursor-pointer border-b-2 border-b-gray-500" open>
      <summary className="font-bold text capitalize">{heading}</summary>
      {children}
    </details>
  );
};

export default CollapsibleSection;
