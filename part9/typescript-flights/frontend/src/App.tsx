import { useState, useEffect } from "react";
import { getAllDiaryEntries, createDiary } from "./services/diaryServices";
import { type DiaryEntry, Weather, Visibility } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Sunny);
  const [newVisibility, setNewVisibility] = useState<Visibility>(
    Visibility.Great
  );
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
      setNewWeather(Weather.Sunny);
      setNewVisibility(Visibility.Good);
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
            type="date"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
        </div>
        <div>
          <div>
            weather
            <input
              type="radio"
              name="weather"
              value="sunny"
              id="sunny"
              onChange={() => setNewWeather(Weather.Sunny)}
            />
            <label htmlFor="sunny">Sunny</label>
            <input
              type="radio"
              name="weather"
              value="rainy"
              id="rainy"
              onChange={() => setNewWeather(Weather.Rainy)}
            />
            <label htmlFor="rainy">Rainy</label>
            <input
              type="radio"
              name="weather"
              value="cloudy"
              id="cloudy"
              onChange={() => setNewWeather(Weather.Cloudy)}
            />
            <label htmlFor="cloudy">Cloudy</label>
            <input
              type="radio"
              name="weather"
              value="stormy"
              id="stormy"
              onChange={() => setNewWeather(Weather.Stormy)}
            />
            <label htmlFor="Stormy">Stormy</label>
            <input
              type="radio"
              name="weather"
              value="windy"
              id="windy"
              onChange={() => setNewWeather(Weather.Windy)}
            />
            <label htmlFor="Windy">Windy</label>
          </div>
        </div>
        <div>
          <div>
            visibility
            <input
              type="radio"
              name="visibility"
              value="great"
              id="great"
              onChange={() => setNewVisibility(Visibility.Great)}
            />
            <label htmlFor="great">Great</label>
            <input
              type="radio"
              name="visibility"
              value="good"
              id="good"
              onChange={() => setNewVisibility(Visibility.Good)}
            />
            <label htmlFor="good">Good</label>
            <input
              type="radio"
              name="visibility"
              value="ok"
              id="ok"
              onChange={() => setNewVisibility(Visibility.Ok)}
            />
            <label htmlFor="ok">Ok</label>
            <input
              type="radio"
              name="visibility"
              value="poor"
              id="poor"
              onChange={() => setNewVisibility(Visibility.Poor)}
            />
            <label htmlFor="poor">Poor</label>
          </div>
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
