import { Box, Button, Container, Grid } from "@material-ui/core";

const Footer = () => (
  <Box paddingY={5} style={{ background: "#0f0f1e" }}>
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <img src="/logo-white.png" style={{ height: 30 }} />
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default Footer;
