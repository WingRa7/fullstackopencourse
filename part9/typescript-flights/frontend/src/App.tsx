import { useState, useEffect } from "react";
import { getAllDiaryEntries } from "./services/diaryServices";
import type { DiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  // const [newNote, setNewNote] = useState("");

  useEffect(() => {
    getAllDiaryEntries().then((data) => {
      setDiaries(data);
    });
  }, []);

  // const diaryCreation = (event: React.SyntheticEvent) => {
  //   event.preventDefault();
  //   createDiary({ content: newDiaryEntry }).then((data) => {
  //     setDiaries(diaries.concat(data));
  //   });

  //   setNewDiary("");
  // };

  return (
    <div>
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
