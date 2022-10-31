import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { ReadScheduleType } from "../../../utils/types";
import useAuth from "../../../utils/useAuth";

const DeleteSchedule: NextPage<ReadScheduleType> = ({ schedule }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/schedule/delete/${schedule._id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (err) {
      alert("削除失敗");
    }
  };
  const loginUser = useAuth();
  if (loginUser.userId === schedule.userId) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <h1>{schedule.title}</h1>
          <p>{schedule.startAt}</p>
          <p>{schedule.endAt}</p>
          <p>{schedule.place}</p>
          <p>{schedule.userName}</p>
          <p>{schedule.description}</p>
          <button>削除</button>
        </form>
      </>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};
export default DeleteSchedule;

export const getServerSideProps: GetServerSideProps<ReadScheduleType> = async (
  content
) => {
  const response = await fetch(
    `http://localhost:3000/api/schedule/${content.query.id}`
  );
  const schedule = await response.json();
  return { props: schedule };
};
