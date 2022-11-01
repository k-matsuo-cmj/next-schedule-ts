import { Box, Button, Container } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { ReadScheduleType } from "../../utils/types";

const ReadSchedule: NextPage<ReadScheduleType> = ({ schedule }) => {
  console.log(schedule);
  return (
    <Container maxWidth="sm" sx={{ height: "70vh", my: 4 }}>
      <Box>
        <h1>{schedule.title}</h1>
        <p>{schedule.startAt}</p>
        <p>{schedule.endAt}</p>
        <p>{schedule.place}</p>
        <p>{schedule.userName}</p>
        <p>{schedule.description}</p>
        <div>
          <Link href={`/schedule/update/${schedule._id}`}>
            <Button>編集</Button>
          </Link>{" "}
          <Link href={`/schedule/delete/${schedule._id}`}>
            <Button>削除</Button>
          </Link>
        </div>
      </Box>
    </Container>
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
