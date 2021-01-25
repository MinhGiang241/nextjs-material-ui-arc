import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Link from "../Link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

interface Props {
  window?: () => Window;
  children?: React.ReactElement | any;
  value?: number;
  setValue?: any;
  selectedIndex?: number;
  setSelectedIndex?: any;
}

// interface Process {
//   browser: boolean;
// }
// declare const process: Process;

function ElevationScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme: any) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  logoContainer: {
    padding: 0,
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
    color: "white",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
    color: "white",
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
    "&:hover": { opacity: 1 },
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
    color: "white",
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },
  drawItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

export default function Header(props: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const iOS =
    (process as any).browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const { value, setValue, selectedIndex, setSelectedIndex } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [previousURL, setPreviousURL] = useState("");

  const handleChange = (event: React.ChangeEvent<{}>, NewValue: any) => {
    setValue(NewValue);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClick = (e: React.MouseEvent<HTMLElement>, i: number) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };
  // eslint-disable-next-line
  const menuOptions = [
    { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
    {
      name: "Custom Software Development",
      link: "/customSoftware",
      activeIndex: 1,
      selectedIndex: 1,
    },
    {
      name: "iOS/Android App Development",
      link: "/mobileApp",
      activeIndex: 1,
      selectedIndex: 2,
    },
    {
      name: "Website Development",
      link: "/websites",
      activeIndex: 1,
      selectedIndex: 3,
    },
  ];

  // eslint-disable-next-line
  const routes = [
    { name: "Home", link: "/", activeIndex: 0 },
    {
      name: "Services",
      link: "/services",
      activeIndex: 1,
      ariaOwns: anchorEl ? "simple-menu" : undefined,
      ariaPopup: anchorEl ? "true" : undefined,
      mouseOver: (e: any) => handleClick(e),
    },
    {
      name: "The Revolution",
      link: "/revolution",
      activeIndex: 2,
    },
    { name: "About Us", link: "/aboutUs", activeIndex: 3 },
    { name: "Contact Us", link: "/contactUs", activeIndex: 4 },
    { name: "Estimate", link: "/estimates", activeIndex: 5 },
  ];

  useEffect(() => {
    if (previousURL !== window.location.pathname) {
      setPreviousURL(window.location.pathname);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
    [...menuOptions, ...routes].forEach((route: any) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        case "/estimates":
          setValue(5);
          break;
        default:
          break;
      }
    });
    // eslint-disable-next-line
  }, [value, menuOptions, selectedIndex, routes]);

  const tabs = (
    <>
      <Tabs
        className={classes.tabContainer}
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
      >
        {routes.map((route, index) => (
          // @ts-ignore
          <Tab
            key={`${route}${index}`}
            className={classes.tab}
            component={Link}
            href={route.link}
            label={route.name}
            aria-owns={route.ariaOwns}
            // @ts-ignore
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.mouseOver}
          />
        ))}
      </Tabs>
      {/* @ts-ignore */}
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        component={Link}
        href="/estimates"
        onClick={() => {
          setValue(5);
          ReactGA.event({
            category: "Estimate",
            action: "Desktop Header Press",
          });
        }}
      >
        Free Estimate
      </Button>
      <Menu
        id="simple"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        style={{ zIndex: 1302 }}
        keepMounted
      >
        {menuOptions.map((option, i) => (
          // @ts-ignore
          <MenuItem
            // @ts-ignore
            component={Link}
            key={`${option}${i}`}
            selected={i === selectedIndex && value === 1}
            href={option.link}
            classes={{ root: classes.menuItem }}
            onClick={(e: any) => {
              handleMenuItemClick(e, i);
              setValue(1);
              handleClose();
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <List disablePadding>
          <div className={classes.toolbarMargin} />
          {routes.map((route, index) => (
            // @ts-ignore
            <ListItem
              divider
              key={`${route}${index}`}
              // @ts-ignore
              component={Link}
              button
              href={route.link}
              selected={value === route.activeIndex}
              classes={{ selected: classes.drawItemSelected }}
              onClick={() => {
                setOpenDrawer(false);
                setValue(route.activeIndex);
              }}
            >
              <ListItemText disableTypography className={classes.drawItem}>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          {/* @ts-ignore */}
          <ListItem
            divider
            // @ts-ignore
            component={Link}
            button
            href="/estimates"
            selected={value === 5}
            classes={{
              root: classes.drawItemEstimate,
              selected: classes.drawItemEstimate,
            }}
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
              ReactGA.event({
                category: "Estimate",
                action: "Mobile Header Press",
              });
            }}
          >
            <ListItemText disableTypography className={classes.drawItem}>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar disableGutters>
            {/* @ts-ignore */}
            <Button
              component={Link}
              href="/"
              className={classes.logoContainer}
              onClick={() => setValue(0)}
              disableRipple
            >
              <img
                alt="company logo"
                src="/assets/logo.svg"
                className={classes.logo}
              />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}

// export default Header;
