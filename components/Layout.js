import { Box } from "@material-ui/core";
import { createGlobalStyle } from "styled-components";
import NavBar from "components/NavBar";
import Footer from "components/Footer";

const GlobalStyle = createGlobalStyle`
  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <NavBar />
    <Box flexGrow={1}>{children}</Box>
    <Footer />
  </>
);

export default Layout;
