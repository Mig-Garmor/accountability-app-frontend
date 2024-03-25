import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import { ChallengeType, UserType } from "../../../interfaceTypes";
import { RootState } from "../../../../../features/store";
import TaskArea from "./components/TaskArea";

interface Props {
  activeChallenge: ChallengeType | undefined;
  loading: boolean;
}

function Home({ activeChallenge, loading }: Props) {
  const { userInfo } = useSelector((state: RootState) => state.general);

  const calculateEndDate = (startDate: string) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 30);
    return date.toISOString().split("T")[0];
  };

  const currentUserChallengeInfo: UserType | undefined =
    activeChallenge?.users?.find((user: UserType) => user.id === userInfo?.id);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <h1 className="text-3xl mb-[30px]">Active Challenge</h1>
          {activeChallenge ? (
            <div className="mb-[20px]">
              <div>
                <h2>Start Date: {activeChallenge.start_date}</h2>
                <h2>
                  End Date: {calculateEndDate(activeChallenge.start_date)}
                </h2>
              </div>
            </div>
          ) : null}
          {/* <pre>{JSON.stringify(activeChallenge, null, 2)}</pre> */}
          {/* Main user section */}
          <TaskArea user={currentUserChallengeInfo} />

          {/* Other users */}
          {activeChallenge?.users?.map((user: UserType) => {
            if (user.id !== userInfo?.id) {
              return <TaskArea user={user} />;
            }
          })}
        </div>
      )}
    </>
  );
}

export default Home;
