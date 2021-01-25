import React from "react";
import Head from "next/head";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Link from "../src/Link";

import ButtonArrow from "../src/ui/ButtonArrow";

const useStyles = makeStyles((theme: any) => ({
  specialText: {
    fontFamily: "Pacifico",
    color: theme.palette.common.orange,
  },
  subtitle: {
    marginBottom: "1em",
  },
  icon: {
    marginLeft: "2em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  serviceContainer: {
    marginTop: "10em",
    [theme.breakpoints.down("sm")]: {
      padding: 25,
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
}));

export default function Services(props: any) {
  const classes = useStyles();
  const theme = useTheme();
  const { setValue, setSelectedIndex } = props;
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid container direction="column">
      <Head>
        <title key="title">
          Top Custom Software Development Services | Arc Development
        </title>
        <meta
          name="description"
          key="description"
          content="Cutting-edge software, mobile app, and website development services with sleek custom designs - get a free oline estimate instantly!"
        />
        <meta
          property="og:title"
          key="og:title"
          content="Bringing West Coast Technology to te Midwest | Services"
        />
        <meta
          property="og:url"
          key="og:url"
          content="https://nextjs-material-ui-arc.vercel.app/services"
        />
        <link
          rel="canonical"
          key="canonical"
          href="https://nextjs-material-ui-arc.vercel.app/services"
        />
      </Head>
      <Grid item>
        <Typography
          align={matchesSM ? "center" : undefined}
          variant="h2"
          gutterBottom
          style={{
            marginLeft: matchesSM ? 0 : "5em",
            marginTop: matchesSM ? "1em" : "2em",
          }}
        >
          Services
        </Typography>
      </Grid>
      <Grid item>
        {/* ------iOS/Android Block------- */}
        <Grid
          container
          direction="row"
          justify={matchesSM ? "center" : "flex-end"}
          className={classes.serviceContainer}
          style={{ marginTop: matchesSM ? "1em" : "5em" }}
        >
          <Grid
            item
            style={{
              marginLeft: matchesSM ? 0 : "5em",
              textAlign: matchesSM ? "center" : undefined,
              width: matchesSM ? undefined : "35em",
            }}
          >
            <Typography variant="h4">iOS/Android Development</Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Extend Functionality. Extend Access. Increase Engagement.
            </Typography>
            <Typography variant="subtitle1">
              Integrate your web experience or create a standalone app
              {matchesSM ? null : <br />}with either mobile platform.
            </Typography>
            {/* @ts-ignore */}
            <Button
              onClick={() => {
                setValue(1);
                setSelectedIndex(2);
              }}
              component={Link}
              href="/mobileapps"
              className={classes.learnButton}
              variant="outlined"
            >
              <span style={{ marginRight: 10 }}>Learn More</span>
              <ButtonArrow
                width={15}
                height={15}
                // @ts-ignore
                fill={theme.palette.common.blue}
              />
            </Button>
          </Grid>
          <Grid item style={{ marginRight: matchesSM ? 0 : "5em" }}>
            <img
              className={classes.icon}
              alt="mobile phone icon"
              src="/assets/mobileIcon.svg"
              width="250em"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {/* ------Services Block------- */}
        <Grid
          container
          direction="row"
          justify={matchesSM ? "center" : undefined}
          className={classes.serviceContainer}
        >
          <Grid
            item
            style={{
              marginLeft: matchesSM ? 0 : "5em",
              textAlign: matchesSM ? "center" : undefined,
            }}
          >
            <Typography variant="h4">Custom Software Development</Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Save Energy. Save Time. Save Money.
            </Typography>
            <Typography variant="subtitle1">
              Complete digital solutions, from investigation to{" "}
              <span className={classes.specialText}>celebration</span>
            </Typography>
            {/* @ts-ignore */}
            <Button
              onClick={() => {
                setValue(1);
                setSelectedIndex(1);
              }}
              component={Link}
              href="/customsoftware"
              className={classes.learnButton}
              variant="outlined"
            >
              <span style={{ marginRight: 10 }}>Learn More</span>
              <ButtonArrow
                width={15}
                height={15}
                // @ts-ignore
                fill={theme.palette.common.blue}
              />
            </Button>
          </Grid>
          <Grid item>
            <img
              className={classes.icon}
              alt="custom software icon"
              src="/assets/Custom Software Icon.svg"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        {/* ------Websites Block------- */}
        <Grid
          container
          direction="row"
          justify={matchesSM ? "center" : "flex-end"}
          className={classes.serviceContainer}
          style={{ marginBottom: "10em" }}
        >
          <Grid
            item
            style={{
              textAlign: matchesSM ? "center" : undefined,
              width: matchesSM ? undefined : "35em",
            }}
          >
            <Typography variant="h4">Websites Development</Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Read More. Discover More. Sell More.
            </Typography>
            <Typography variant="subtitle1">
              Optimized for Search Engines, built for speed.
            </Typography>
            {/* @ts-ignore */}
            <Button
              onClick={() => {
                setValue(1);
                setSelectedIndex(3);
              }}
              component={Link}
              href="/websites"
              className={classes.learnButton}
              variant="outlined"
            >
              <span style={{ marginRight: 10 }}>Learn More</span>
              <ButtonArrow
                width={15}
                height={15}
                // @ts-ignore
                fill={theme.palette.common.blue}
              />
            </Button>
          </Grid>
          <Grid item style={{ marginRight: matchesSM ? 0 : "5em" }}>
            <img
              className={classes.icon}
              alt="websites icon"
              src="/assets/websiteIcon.svg"
              width="250em"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
