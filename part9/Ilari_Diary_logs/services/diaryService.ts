import diaryData from "../data/diaries";
import { DiaryEntry } from "../src/types";

const getEntries = (): Array<DiaryEntry> => {
  return diaryData;
};

const addEntry = (): null => {
  return null;
};

export default {
  getEntries,
  addEntry,
};
