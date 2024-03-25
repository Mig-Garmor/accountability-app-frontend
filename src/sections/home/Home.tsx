import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../components/buttons/IconButton";
import { GoPlus } from "react-icons/go";
import {
  storeModalData,
  toggleModal,
} from "../../features/generalStore/generalSlice";
import { RootState } from "../../features/store";
import { useEffect } from "react";
import { storeGroupId } from "../../features/groupStore/groupSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const { userInfo } = useSelector((state: RootState) => state.general);

  const { groupId } = useSelector((state: RootState) => state.group);
  //Here we can:
  // - Create a group
  // - Join a group
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    const groupIdStorage = localStorage.getItem("groupId");
    if (groupIdStorage && userInfo) {
      if (!groupId) {
        dispatch(storeGroupId(parseInt(groupIdStorage)));
      }
      navigation("/group");
    }
  }, [groupId, userInfo]);

  return (
    <div className="flex h-screen justify-center items-center">
      <IconButton
        Icon={<GoPlus />}
        action={() => {
          dispatch(storeModalData({ name: "createGroup", type: "confirm" }));
          dispatch(toggleModal());
        }}
        label="Create new group"
        showStyles
      />
    </div>
  );
}

export default Home;
