import React, { useState } from "react";

interface CollapsibleSectionProps {
  children: React.ReactNode;
  heading: string;
}

const CollapsibleSection = ({ children, heading }: CollapsibleSectionProps) => {
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <details
      className="pb-4"
      open={visible}
      onToggle={() => setVisible(!visible)}
    >
      <summary className="font-bold text capitalize">{heading}</summary>
      {children}
    </details>
  );
};

export default CollapsibleSection;
