import { GetServerSideProps, NextPage } from "next";
import { ReadScheduleType } from "../../utils/types";

const ReadSchedule: NextPage<ReadScheduleType> = ({ schedule }) => {
  console.log(schedule);
  return (
    <div>
      <h1>{schedule.title}</h1>
      <p>{schedule.startAt}</p>
      <p>{schedule.endAt}</p>
      <p>{schedule.place}</p>
      <p>{schedule.userName}</p>
      <p>{schedule.description}</p>
    </div>
  );
};
export default ReadSchedule;

export const getServerSideProps: GetServerSideProps<ReadScheduleType> = async (
  content
) => {
  const response = await fetch(
    `http://localhost:3000/api/schedule/${content.query.id}`
  );
  const schedule = await response.json();
  return { props: schedule };
};
