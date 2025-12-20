import { useState } from "react";
import CollapsibleSection from "./CollapsibleSection";
import { restaurantStatuses } from "@/app/constants";
import type { OptionsByType, Restaurant } from "../app/page";

interface SidebarProps {
  activeTab: string;
  includeVisited: boolean;
  includeUnvisited: boolean;
  numberOfResults: number;
  selectedStatuses: string[];
  selectedFilters: string[];
  options: OptionsByType;
  onTabSelect: (tab: string) => void;
  onVisitedToggle: () => void;
  onUnvisitedToggle: () => void;
  onStatusToggle: (status: string) => void;
  onFilterToggle: (label: string) => void;
}

const selectableButtonClasses =
  "rounded bg-gray-800 hover:bg-gray-600 p-2 font-semibold text-sm";
const activeButtonClasses = "rounded bg-blue-500 p-2 font-semibold text-sm";

const Sidebar = ({
  activeTab,
  includeVisited,
  includeUnvisited,
  numberOfResults,
  selectedStatuses,
  selectedFilters,
  options,
  onTabSelect,
  onVisitedToggle,
  onUnvisitedToggle,
  onStatusToggle,
  onFilterToggle,
}: SidebarProps) => {
  const [showFilters, setShowFilters] = useState<boolean>(true);
  return (
    <aside className="max-h-full px-4">
      <div>
        <button
          className={
            activeTab === "map" ? activeButtonClasses : selectableButtonClasses
          }
          disabled={activeTab === "map"}
          onClick={() => onTabSelect("map")}
        >
          Show Map
        </button>
        <button
          className={
            activeTab === "list" ? activeButtonClasses : selectableButtonClasses
          }
          disabled={activeTab === "list"}
          onClick={() => onTabSelect("list")}
        >
          Show List
        </button>
      </div>
      <div className="pb-4">
        <label>
          <input
            type="checkbox"
            checked={showFilters}
            onChange={() => setShowFilters(!showFilters)}
          />{" "}
          Show filters
        </label>
      </div>
      {showFilters && (
        <>
          <div>
            <span>
              {numberOfResults} {numberOfResults === 1 ? "result" : "results"}
            </span>
          </div>
          <CollapsibleSection key="group-visited" heading="Visited status">
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={includeVisited}
                  onChange={() => onVisitedToggle()}
                />{" "}
                Show visited
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={includeUnvisited}
                  onChange={() => onUnvisitedToggle()}
                />{" "}
                Show unvisited
              </label>
            </div>
          </CollapsibleSection>
          <CollapsibleSection key="group-statuses" heading="Restaurant status">
            {restaurantStatuses.map((status) => (
              <div key={`status-${status}`}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(status)}
                    onChange={() => onStatusToggle(status)}
                  />{" "}
                  {status}
                </label>
              </div>
            ))}
          </CollapsibleSection>
          {Object.entries(options).map(([type, options]) => (
            <CollapsibleSection
              key={`group-${type}`}
              heading={`${type} options`}
            >
              {options.map((option: string) => (
                <div key={`option-${option}`}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(option)}
                      onChange={() => onFilterToggle(option)}
                    />{" "}
                    {option}
                  </label>
                </div>
              ))}
            </CollapsibleSection>
          ))}
        </>
      )}
    </aside>
  );
};

export default Sidebar;
