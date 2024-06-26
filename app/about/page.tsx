import { AboutContent } from "@/components/about";
import ResponsiveAppBar from "@/components/appbar";
import { Box } from "@mui/material";

const styling = {
  backgroundImage: `url(images/about.png)`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "100vh",
};
export default function About() {
  return (
    <>
      <ResponsiveAppBar />
      <AboutContent></AboutContent>
    </>
  );
}
