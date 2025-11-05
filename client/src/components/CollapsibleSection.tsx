import React from "react";

interface CollapsibleSectionProps {
  children: React.ReactNode;
  heading: string;
}

const CollapsibleSection = ({ children, heading }: CollapsibleSectionProps) => {
  // `details` open state is not controlled as onToggle can cause infinite re-renders
  // https://github.com/facebook/react/issues/15486
  return (
    <details className="pb-4 cursor-pointer" open>
      <summary className="font-bold text capitalize">{heading}</summary>
      {children}
    </details>
  );
};

export default CollapsibleSection;
