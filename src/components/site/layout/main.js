/** @jsx jsx */
import { jsx } from "theme-ui";

const Main = props => (
  <main
    sx={{
      gridArea: "main",
      backgroundColor: "background",
      minHeight: "calc(100vh - 60px)",
      paddingTop: ["2em", "60px", "60px"]
    }}
  >
    {props.children}
  </main>
);

export default Main;
