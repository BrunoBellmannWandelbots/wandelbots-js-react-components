import React, { useState } from "react";
import { ArrowForwardFilledIcon, ExpandFilledIcon, WBLogoIcon } from "../../icons";
import { RunsOnWandelbotsOSLogo } from "../assets";

import Link from "next/link";

interface SidebarCategory {
  label?: string;
  items: (SidebarItem | SidebarCollapsibleItem)[];
}

interface SidebarItem {
  label: string;
  link: string;
  icon: React.ReactNode;
  isSelected: boolean;
}

interface SidebarCollapsibleItem {
  label: string;
  icon: React.ReactNode;
  items: SidebarCollapsedItem[];
}

interface SidebarCollapsedItem {
  label: string;
  link: string;
  isSelected: boolean;
}

type SidebarProps = {
  items: SidebarCategory[];
  expandedByDefault?: boolean;
  setSelectedItemPath: (path: string) => void;
};

export const Sidebar = ({ items, setSelectedItemPath, expandedByDefault = true }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(expandedByDefault);
  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const [uncollapsedSection, setUncollapsedSection] = useState<number | undefined>(undefined);

  return (
    <aside
      // To animate, use `transition-width duration-300`, but this will make several opacity animations necessary
      className={`h-full top-0 left-0 bg-[#010B23] ${isExpanded ? "w-64" : "w-16"} flex flex-col justify-between`}
    >
      <div className="mx-4 my-6 flex flex-col justify-between h-full">
        <div className="flex-grow">
          <Link href="/">
            <div
              onClick={() => {
                setSelectedItemPath("/");
              }}
            >
              <h1 className={`text-white text-xl mb-2 ${isExpanded ? "" : "hidden"}`}>
                Developer <span className="text-[#FF0E65]">Portal</span>
              </h1>
              <div className="flex justify-center items-center mb-2">{!isExpanded && <WBLogoIcon />}</div>
            </div>
          </Link>
          <ul className="list-none m-0 p-0">
            {items.map((category, index) => (
              <li key={index} className="">
                {category.label && isExpanded && (
                  <div
                    className={`text-white uppercase mx-1 ${index !== 0 ? "mt-12" : ""}`}
                    style={{ fontSize: "10px" }}
                  >
                    {category.label}
                  </div>
                )}
                {category.label && !isExpanded && <hr />}
                {category.items.map((item, index) =>
                  item.hasOwnProperty("items") ? (
                    <SidebarCollapsibleItemComponent
                      key={index}
                      item={item as SidebarCollapsibleItem}
                      setSelectedItemPath={setSelectedItemPath}
                      isCollapsed={uncollapsedSection !== index}
                      toggleIsCollapsed={() => {
                        setUncollapsedSection(uncollapsedSection === index ? undefined : index);
                      }}
                      sidebarIsExpanded={isExpanded}
                    />
                  ) : (
                    <SidebarItemComponent
                      key={index}
                      item={item as SidebarItem}
                      setSelectedItemPath={setSelectedItemPath}
                      sidebarIsExpanded={isExpanded}
                    />
                  )
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={`flex ${isExpanded ? "justify-between" : "justify-center"}`}>
          {isExpanded && (
            <div className="ml-4">
              <RunsOnWandelbotsOSLogo />
            </div>
          )}
          <button onClick={toggleSidebar} className="text-white">
            {isExpanded ? (
              <div style={{ transform: "rotate(180deg)" }}>
                <ArrowForwardFilledIcon />
              </div>
            ) : (
              <ArrowForwardFilledIcon />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

function SidebarItemComponent({
  item,
  setSelectedItemPath,
  sidebarIsExpanded,
}: {
  item: SidebarItem;
  setSelectedItemPath: (path: string) => void;
  sidebarIsExpanded: boolean;
}) {
  return (
    <li className="list-none mx-1 p-0 my-6">
      <Link href={item.link}>
        <div
          onClick={() => {
            setSelectedItemPath(item.link);
          }}
          className="flex items-center text-white"
        >
          <span className="mr-6 w-6">{item.icon}</span>
          {sidebarIsExpanded && item.label}
        </div>
      </Link>
      {item.isSelected && (
        <div className="relative">
          <div className="absolute h-0.5 w-full bg-[#47D3FF] mt-2" />
        </div>
      )}
    </li>
  );
}

function SidebarCollapsibleItemComponent({
  item,
  setSelectedItemPath,
  isCollapsed,
  toggleIsCollapsed,
  sidebarIsExpanded,
}: {
  item: SidebarCollapsibleItem;
  setSelectedItemPath: (path: string) => void;
  isCollapsed: boolean;
  toggleIsCollapsed: () => void;
  sidebarIsExpanded: boolean;
}) {
  return (
    <li className="text-white list-none mx-1 p-0 my-6">
      <button className="w-full" onClick={toggleIsCollapsed} disabled={!sidebarIsExpanded}>
        <div className="flex items-center">
          <span className="mr-6">{item.icon}</span>
          <div className="flex justify-between flex-1">
            {sidebarIsExpanded && item.label}

            {sidebarIsExpanded &&
              (isCollapsed ? (
                <ExpandFilledIcon />
              ) : (
                <div style={{ transform: "rotate(180deg)" }}>
                  <ExpandFilledIcon />
                </div>
              ))}
          </div>
        </div>
      </button>

      {sidebarIsExpanded && !isCollapsed && (
        <ul className="list-none">
          {item.items.map((collapsedItem, index) => (
            <li key={index} className="text-sm list-none ml-12 p-0 my-4">
              <Link href={collapsedItem.link} className="text-white">
                <div
                  onClick={() => {
                    setSelectedItemPath(collapsedItem.link);
                  }}
                  className="flex items-center text-white"
                >
                  {collapsedItem.label}
                </div>
              </Link>
              {collapsedItem.isSelected && (
                <div className="relative">
                  <div className="absolute h-0.5 w-full bg-[#47D3FF] mt-2" />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
