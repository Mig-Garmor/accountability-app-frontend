import { useDispatch } from "react-redux";
import IconButton from "../../components/buttons/IconButton";
import { GoPlus } from "react-icons/go";
import {
  storeModalData,
  toggleModal,
} from "../../features/generalStore/generalSlice";

function Home() {
  //Here we can:
  // - Create a group
  // - Join a group

  const dispatch = useDispatch();
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
