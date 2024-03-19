import useGroup from "./services/hooks/useGroup"; // Update the path accordingly
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";

import { useEffect, useState } from "react";
import { TabOptions } from "./interfaceTypes";
import Tabs from "./components/tabs/Tabs";
import Home from "./components/tabs/Home";
import Challenges from "./components/tabs/Challenges";
import InviteUsers from "./components/tabs/InviteUsers";

const Group = () => {
  const { groupId, refetchGroupData } = useSelector(
    (state: RootState) => state.group
  );
  const {
    data: group,
    error,
    isLoading,
    refetch,
  } = useGroup(groupId ? groupId : 0);

  const [componentLoaded, setComponentLoaded] = useState(false);

  //Tab state
  const [activeTab, setActiveTab] = useState<
    "home" | "challenges" | "inviteUsers"
  >("home");

  const tabs: { name: string; tab: TabOptions }[] = [
    { name: "Home", tab: "home" },
    { name: "Challenges", tab: "challenges" },
    { name: "Invite Users", tab: "inviteUsers" },
  ];

  useEffect(() => {
    if (componentLoaded) {
      refetch();
    }
    setComponentLoaded(true);
  }, [refetchGroupData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <Home group={group} />;
      case "challenges":
        return <Challenges />;
      case "inviteUsers":
        return <InviteUsers />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full pt-[10px]">
      <div className="px-[20px]">
        <Tabs setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} />
      </div>

      {/* Tab content */}
      <div className="flex w-full h-full border-t border-black px-[20px] py-[10px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Group;
