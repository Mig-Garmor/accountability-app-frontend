import useGroup from "./services/hooks/useGroup"; // Update the path accordingly
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";

import { useEffect, useState } from "react";
import { TabOptions } from "./interfaceTypes";
import Tabs from "./components/tabs/Tabs";
import Home from "./components/tabs/home/Home";
import Challenges from "./components/tabs/challenges/Challenges";
import InviteUsers from "./components/tabs/inviteUsers/InviteUsers";
import useUsers from "./services/hooks/useUsers";
import useActiveChallenge from "./services/hooks/useActiveChallenge";
import {
  storeActiveChallenge,
  storeChallengeId,
  storeGroupChallenges,
  storeGroupData,
  storeGroupUserPermission,
} from "../../features/groupStore/groupSlice";

const Group = () => {
  const dispatch = useDispatch();
  const {
    groupId,
    refetchGroupData,
    refetchActiveChallengeData,
    groupDataStored,
  } = useSelector((state: RootState) => state.group);

  //Fetch groups
  const {
    data: groupData,
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

  const [shouldFetchActiveChallenge, setShouldFetchActiveChallenge] =
    useState(false);

  //Fetch active challenge
  const {
    data: activeChallenge,
    // error: activeChallengeError,
    isLoading: activeChallengeLoading,
    refetch: activeChallengeRefetch,
  } = useActiveChallenge(
    groupId ? groupId : 0,
    shouldFetchActiveChallenge && groupId && groupId !== 0 ? true : false
  );

  const [componentLoaded, setComponentLoaded] = useState(false);

  //Tab state
  const [activeTab, setActiveTab] = useState<
    "home" | "challenges" | "inviteUsers"
  >("home");

  const [tabsArray, setTabsArray] = useState<
    { name: string; tab: TabOptions }[] | undefined
  >(undefined);

  useEffect(() => {
    if (groupData) {
      dispatch(storeGroupData(groupData));
    }
  }, [groupData]);

  useEffect(() => {
    if (groupDataStored?.activeChallenge) {
      setShouldFetchActiveChallenge(true);
    } else {
      setShouldFetchActiveChallenge(false);
    }

    if (groupDataStored?.userPermission) {
      dispatch(storeGroupUserPermission(groupDataStored.userPermission));
    }

    if (groupDataStored?.group.challenges) {
      dispatch(storeGroupChallenges(groupData?.group.challenges));
    }

    if (groupDataStored) {
      dispatch(storeGroupData(groupData));
    }
  }, [groupDataStored, groupId]);

  useEffect(() => {
    let tempTabsArray: { name: string; tab: TabOptions }[] = [
      { name: "Challenges", tab: "challenges" },
    ]; // Default to showing at least the Home tab

    if (groupDataStored?.activeChallenge) {
      console.log("ACTIVE CHALLENGE: ", activeChallenge);
      tempTabsArray = [{ name: "Home", tab: "home" }, ...tempTabsArray];
    }
    if (activeChallenge?.userPermission === "ADMIN") {
      // If the user is an admin, add additional tabs
      tempTabsArray = [
        ...tempTabsArray,

        { name: "Invite Users", tab: "inviteUsers" },
      ];
    }

    if (!groupDataStored?.activeChallenge && !groupLoading) {
      setActiveTab("challenges");
    } else {
      setActiveTab("home");
    }

    // Update the state with the appropriate tabs for the user's permission
    setTabsArray(tempTabsArray);
  }, [activeChallenge, groupDataStored]);

  useEffect(() => {
    if (componentLoaded) {
      groupRefetch();
    }
    setComponentLoaded(true);
  }, [refetchGroupData]);

  useEffect(() => {
    if (componentLoaded) {
      activeChallengeRefetch();
    }
    setComponentLoaded(true);
  }, [refetchActiveChallengeData]);

  useEffect(() => {
    if (activeChallenge) {
      dispatch(storeChallengeId(activeChallenge.id));
      dispatch(storeActiveChallenge(activeChallenge));
    }
  }, [activeChallenge]);

  if (groupLoading || usersLoading) return <div>Loading...</div>;
  if (groupError || usersError) return <div>An error occurred</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <Home loading={activeChallengeLoading} />;
      case "challenges":
        return <Challenges setActiveTab={setActiveTab} />;
      case "inviteUsers":
        return <InviteUsers users={usersData?.users} loading={usersLoading} />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full pt-[10px]">
      {tabsArray && tabsArray?.length > 1 && (
        <div className="px-[20px]">
          <Tabs
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            tabs={tabsArray}
          />
        </div>
      )}

      {/* Tab content */}
      <div
        className={`flex w-full h-full px-[20px] py-[10px] ${
          tabsArray && tabsArray?.length > 1 && "border-t border-black"
        }`}
      >
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Group;
