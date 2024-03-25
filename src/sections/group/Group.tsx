import useGroup from "./services/hooks/useGroup"; // Update the path accordingly
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";

import { useEffect, useState } from "react";
import { TabOptions } from "./interfaceTypes";
import Tabs from "./components/tabs/Tabs";
import Home from "./components/tabs/home/Home";
import Challenges from "./components/tabs/challenges/Challenges";
import InviteUsers from "./components/tabs/inviteUsers/InviteUsers";
import useUsers from "./services/hooks/useUsers";
import useActiveChallenge from "./services/hooks/useActiveChallenge";

const Group = () => {
  const { groupId, refetchGroupData } = useSelector(
    (state: RootState) => state.group
  );

  //Fetch groups
  const {
    data: group,
    error: groupError,
    isLoading: groupLoading,
    refetch: groupRefetch,
  } = useGroup(groupId ? groupId : 0);

  //Fetch users
  const {
    data: usersData,
    error: usersError,
    isLoading: usersLoading,
    // refetch: usersRefetch,
  } = useUsers();

  //Fetch active challenge
  const {
    data: activeChallenge,
    // error: activeChallengeError,
    isLoading: activeChallengeLoading,
    // refetch: activeChallengeRefetch,
  } = useActiveChallenge(groupId ? groupId : 0);

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
      groupRefetch();
    }
    setComponentLoaded(true);
  }, [refetchGroupData]);

  if (groupLoading || usersLoading) return <div>Loading...</div>;
  if (groupError || usersError) return <div>An error occurred</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <Home
            activeChallenge={activeChallenge}
            loading={activeChallengeLoading}
          />
        );
      case "challenges":
        return <Challenges group={group} setActiveTab={setActiveTab} />;
      case "inviteUsers":
        return <InviteUsers users={usersData?.users} loading={usersLoading} />;
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
