import { Link, Route, Routes } from "react-router-dom";
import "./styles/index.scss";
import Counter from "./components/Counter";
import { MainPageAsync } from "./pages/MainPage/MainPage.async";
import { AboutPageAsync } from "./pages/AboutPage/AboutPage.async";
import { Suspense, useContext, useState } from "react";
import { Theme, ThemeContext } from "./theme/ThemeContext";
import { useTheme } from "./theme/useTheme";
import { classNames } from './helpers/classNames/classNames';

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Link to="/">Главная</Link>
      <Link to="/about">О сайте</Link>
      <button onClick={toggleTheme} type="button">
        toggle theme
      </button>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/about" element={<AboutPageAsync />} />
          <Route path="/" element={<MainPageAsync />} />
        </Routes>
      </Suspense>
      <Counter />
    </div>
  );
};

export default App;
