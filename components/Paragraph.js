import { Typography } from "@material-ui/core";
import styled from "styled-components";

const Paragraph = styled(Typography).attrs({
  variant: "body1",
})`
  && {
    margin-bottom: 16px;
  }
`;

export default Paragraph;
