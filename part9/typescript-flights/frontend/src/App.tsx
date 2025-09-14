import { useState, useEffect } from "react";
import { getAllDiaryEntries, createDiary } from "./services/diaryServices";
import type { DiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newWeather, setNewWeather] = useState("");
  const [newVisibility, setNewVisibility] = useState("");
  const [newComment, setNewComment] = useState("");
  const [notify, setNotify] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaryEntries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const response = await createDiary({
        date: newDate,
        weather: newWeather,
        visibility: newVisibility,
        comment: newComment,
      });
      setDiaries(diaries.concat(response));
      setNewDate("");
      setNewWeather("");
      setNewVisibility("");
      setNewComment("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setNotify(error.message);
        setTimeout(() => {
          setNotify(null);
        }, 5000);
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <p style={{ color: "red" }}>{notify}</p>
      <form onSubmit={diaryCreation}>
        <div>
          date
          <input
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
        </div>
        <div>
          weather
          <input
            value={newWeather}
            onChange={(event) => setNewWeather(event.target.value)}
          />
        </div>
        <div>
          visibility
          <input
            value={newVisibility}
            onChange={(event) => setNewVisibility(event.target.value)}
          />
        </div>
        <div>
          comment
          <input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>

      <h1>Diary entries</h1>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <p>
            visibility: {diary.visibility}
            <br />
            weather: {diary.weather}
            <br />
            comment: {diary.comment}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
