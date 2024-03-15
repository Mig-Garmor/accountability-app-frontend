import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import ModalComponent from "./components/ModalComponent";
import { useDispatch } from "react-redux";
import { toggleModal } from "../features/generalStore/generalSlice";
import CustomModal from "./components/CustomModal";
import { useEffect } from "react";
import { storeGroupId } from "../features/groupStore/groupSlice";

function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const groupIdStorage = localStorage.getItem("groupId");

    if (groupIdStorage) {
      dispatch(storeGroupId(parseInt(groupIdStorage)));
    }
  }, []);

  return (
    <div className="flex flex-col">
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
