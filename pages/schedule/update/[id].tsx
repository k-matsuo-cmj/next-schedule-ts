import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import { ReadScheduleType } from "../../../utils/types";
import useAuth from "../../../utils/useAuth";

const UpdateSchedule: NextPage<ReadScheduleType> = ({ schedule }) => {
  const [title, setTitle] = useState(schedule.title);
  const [place, setPlace] = useState(schedule.place);
  const [startAt, setStartAt] = useState(schedule.startAt);
  const [endAt, setEndAt] = useState(schedule.endAt);
  const [description, setDescription] = useState(schedule.description);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/schedule/update/${schedule._id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: title,
            place: place,
            startAt: startAt,
            endAt: endAt,
            description: description,
          }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (err) {
      alert("更新失敗");
    }
  };
  const loginUser = useAuth();
  if (loginUser.userId === schedule.userId) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            placeholder="件名"
            required
          />
          <input
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            type="text"
            name="place"
            placeholder="場所"
            required
          />
          <input
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
            type="text"
            name="startAt"
            placeholder="開始時間"
            required
          />
          <input
            value={endAt}
            onChange={(e) => setEndAt(e.target.value)}
            type="text"
            name="endAt"
            placeholder="終了時間"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            rows={15}
            placeholder="説明"
            required
          />
          <button>更新</button>
        </form>
      </>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};
export default UpdateSchedule;

export const getServerSideProps: GetServerSideProps<ReadScheduleType> = async (
  content
) => {
  const response = await fetch(
    `http://localhost:3000/api/schedule/${content.query.id}`
  );
  const schedule = await response.json();
  return { props: schedule };
};
