import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import ModalComponent from "./components/ModalComponent";
import { useDispatch } from "react-redux";
import { toggleModal } from "../features/generalStore/generalSlice";

function Layout() {
  const dispatch = useDispatch();
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
    </div>
  );
}

export default Layout;
