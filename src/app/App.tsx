import { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { MainPage } from "pages/MainPage";
import { AboutPage } from "pages/AboutPage";
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "./providers/ThemeProvider";
import "./styles/index.scss";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <Link to="/">Главная</Link>
      <Link to="/about">О сайте</Link>
      <button onClick={toggleTheme} type="button">
        toggle theme
      </button>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
