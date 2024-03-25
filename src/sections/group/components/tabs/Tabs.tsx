import { SetStateAction, Dispatch } from "react";
import { TabOptions } from "../../interfaceTypes";

interface Props {
  setActiveTab: Dispatch<SetStateAction<TabOptions>>;
  activeTab: TabOptions;
  tabs: { name: string; tab: TabOptions }[];
}

function Tabs({ setActiveTab, activeTab, tabs }: Props) {
  const renderTabs = () => {
    return tabs.map((tab: { name: string; tab: TabOptions }, index: number) => (
      <div
        key={index}
        className={`px-[10px] py-[10px] rounded-t-[5px] hover:cursor-pointer
         ${activeTab === tab.tab && "bg-black text-white"}`}
        onClick={() => {
          setActiveTab(tab.tab);
        }}
      >
        {tab.name}
      </div>
    ));
  };
  return <div className="flex">{renderTabs()}</div>;
}

export default Tabs;
