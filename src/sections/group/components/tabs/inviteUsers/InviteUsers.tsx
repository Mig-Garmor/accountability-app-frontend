import { UserType } from "../../../interfaceTypes";
import User from "./User";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../features/store";

interface Props {
  loading: boolean;
}

function InviteUsers({ loading }: Props) {
  const { usersDataStore } = useSelector((state: RootState) => state.group);
  return (
    <div className="flex h-fit flex-wrap justify-start gap-[5px]">
      {loading ? (
        <LoadingSpinner />
      ) : (
        usersDataStore?.users?.map((user: UserType, index: number) => {
          return <User key={index} user={user} />;
        })
      )}
    </div>
  );
}

export default InviteUsers;
