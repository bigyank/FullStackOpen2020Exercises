import diaryData from "../data/diaries";
import {
  DiaryEntry,
  NonSensitiveDiaryEntry,
  NewDiaryEntry,
} from "../src/types";

const getEntries = (): Array<DiaryEntry> => {
  return diaryData;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryData.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addEntry = (dataToAdd: NewDiaryEntry): DiaryEntry => {
  const id = Math.max(...diaryData.map((data) => data.id)) + 1;
  const newEntry = { id, ...dataToAdd };
  diaryData.push(newEntry);
  return newEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  return diaryData.find((data) => data.id === id);
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  findById,
};
