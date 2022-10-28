import { NextPage } from "next";
import React, { useState } from "react";
import useAuth from "../../utils/useAuth";

const CreateSchedule: NextPage = () => {
    const [title, setTitle] = useState("");
    const [place, setPlace] = useState("");
    const [startAt, setStartAt] = useState("");
    const [endAt, setEndAt] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/schedule/create", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    place: place,
                    startAt: startAt,
                    endAt: endAt,
                    description: description,
                }),
            })
            const jsonData = await response.json();
            alert(jsonData.message);
        } catch(err) {
            alert("作成失敗");
        }
    };

    const loginUser = useAuth();
    console.log(loginUser);
    if (loginUser) {
      return (
        <div>
          <h1 className="page-title">スケジュール作成</h1>
          <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="title" placeholder="件名" required/>
            <input value={place} onChange={(e)=>setPlace(e.target.value)} type="text" name="place" placeholder="場所" required/>
            <input value={startAt} onChange={(e)=>setStartAt(e.target.value)} type="text" name="startAt" placeholder="開始" required/>
            <input value={endAt} onChange={(e)=>setEndAt(e.target.value)} type="text" name="endAt" placeholder="終了" required/>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} name="description" rows={15} placeholder="説明" required/>
            <button>作成</button>
          </form>
        </div>
      );
    } else {
        return <></>;
    }
};
export default CreateSchedule;