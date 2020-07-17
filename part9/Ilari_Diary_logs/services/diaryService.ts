import diaryData from "../data/diaries";
import { DiaryEntry, NonSensitiveDiaryEntry } from "../src/types";

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

const addEntry = (): [] => {
  return [];
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
};
