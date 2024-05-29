"use client";
import { useThemeContext } from "./ColorModeContext";

export const AboutContent = () => {
  const { mode } = useThemeContext();
  const styling = {
    backgroundImage:
      mode === "light"
        ? `url(images/LightAbout.png)`
        : `url(images/DarkAbout.jpg)`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  };

  return <div style={styling}></div>;
};
