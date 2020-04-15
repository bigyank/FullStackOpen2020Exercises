import React from "react";

const Header = () => {
  return <h1>Web Development</h1>;
};

const Content = ({ contents }) => {
  return contents.map((item) => (
    <div key={item.id}>
      <h2>{item.name}</h2>
      <Part parts={item.parts} />
      <Footer parts={item.parts} />
    </div>
  ));
};

const Part = ({ parts }) => {
  return parts.map((content) => (
    <p key={content.id}>
      {content.name} {content.exercises}
    </p>
  ));
};

const Footer = ({ parts }) => {
  return (
    <h3>
      Total of {parts.reduce((ini, part) => ini + part.exercises, 0)} exercises
    </h3>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header />
      <Content contents={course} />
    </div>
  );
};

export default Course;
