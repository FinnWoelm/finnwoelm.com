import Link from "next/link";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import styled from "styled-components";
import ExternalLink from "components/ExternalLink";
import { TwitterIcon, LinkedInIcon, GitHubIcon } from "components/SocialIcons";

const UnpaddedListItemIcon = styled(ListItemIcon)`
  && {
    min-width: 32px;
  }
`;

const NavBarDrawer = ({ open, onClose, twitter, linkedin, github }) => (
  <Drawer open={open} onClose={onClose}>
    <List>
      <Link href="/" passHref>
        <ListItem button component="a">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ maxWidth: "100%", padding: "16px 0" }}
          />
        </ListItem>
      </Link>
    </List>
    <Divider />
    <List>
      <Link href="/posts" passHref>
        <ListItem button component="a">
          <ListItemText primary="News" />
        </ListItem>
      </Link>
    </List>
    <Divider />
    <List>
      <ListItem button component={ExternalLink} href={twitter}>
        <UnpaddedListItemIcon>
          <TwitterIcon />
        </UnpaddedListItemIcon>
        <ListItemText primary="Twitter" />
      </ListItem>
      <ListItem button component={ExternalLink} href={linkedin}>
        <UnpaddedListItemIcon>
          <LinkedInIcon />
        </UnpaddedListItemIcon>
        <ListItemText primary="LinkedIn" />
      </ListItem>
      <ListItem button component={ExternalLink} href={github}>
        <UnpaddedListItemIcon>
          <GitHubIcon />
        </UnpaddedListItemIcon>
        <ListItemText primary="GitHub" />
      </ListItem>
    </List>
  </Drawer>
);

export default NavBarDrawer;
