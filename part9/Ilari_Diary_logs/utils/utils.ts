/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewDiaryEntry, Weather, Visibility } from "../src/types";

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    date: parseDate(object.date),
    comment: parseComment(object.comment),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility),
  };

  return newEntry;
};

const parseComment = (comment: any): string => {
  if (!comment || !isString(comment)) {
    throw new Error("Comment feild is missing");
  }
  return comment;
};

const parseDate = (date: any): string => {
  if (!date || !isDate(date) || !isString(date)) {
    throw new Error("date is invalid");
  }
  return date;
};

const parseWeather = (weather: any): Weather => {
  if (!weather || !isWeather(weather)) {
    throw new Error("Weather data is not correct");
  }
  return weather;
};

const parseVisibility = (visibility: any): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
    throw new Error("Visibility data is incorrect");
  }
  return visibility;
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const isWeather = (param: any): param is Weather => {
  return Object.values(Weather).includes(param);
};

const isVisibility = (param: any): param is Visibility => {
  return Object.values(Visibility).includes(param);
};

export default toNewDiaryEntry;
