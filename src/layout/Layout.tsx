import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import ModalComponent from "./components/ModalComponent";
import { useDispatch } from "react-redux";
import {
  storeUserInfo,
  toggleModal,
} from "../features/generalStore/generalSlice";
import CustomModal from "./components/CustomModal";
import { useEffect } from "react";
import { storeGroupId } from "../features/groupStore/groupSlice";
import useCurrentUser from "../sections/home/services/hooks/useCurrentUser";

function Layout() {
  const dispatch = useDispatch();

  //Fetch currentUser
  const {
    data: currentUser,
    // error: currentUserError,
    // isLoading: currentUserLoading,
    // refetch: currentUserRefetch,
  } = useCurrentUser();

  useEffect(() => {
    dispatch(storeUserInfo(currentUser));
  }, [currentUser]);

  useEffect(() => {
    console.log("starting layout");
    const groupIdStorage = localStorage.getItem("groupId");

    if (groupIdStorage) {
      dispatch(storeGroupId(parseInt(groupIdStorage)));
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Header />
      <Outlet />
      <ModalComponent
        onCancel={() => {
          dispatch(toggleModal());
        }}
        onAccept={() => {
          dispatch(toggleModal());
        }}
      />
      <CustomModal />
    </div>
  );
}

export default Layout;
