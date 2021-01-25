import React, { useState } from "react";
import Head from "next/head";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonArrow from "../src/ui/ButtonArrow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Link from "../src/Link";
import axios from "axios";

const useStyles = makeStyles((theme: any) => ({
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
  },
  background: {
    // @ts-ignore
    backgroundImage: `url("/assets/background.jpg")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "60em",
    paddingBottom: "10em",
    [theme.breakpoints.down("md")]: {
      // @ts-ignore
      backgroundImage: `url("assets/mobileBackground.jpg")`,
    },
  },
  estimateButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 80,
    width: 205,
    backgroundColor: theme.palette.common.orange,
    fontSize: "1.5rem",
    marginRight: "5em",
    marginLeft: "2em",
    "&:hover": {
      backgroundColor: theme.palette.secondary,
    },
    [theme.breakpoints.down("md")]: {
      marginRight: 0,
      marginLeft: 0,
    },
  },
  message: {
    border: `2px solid ${theme.palette.common.blue}`,
    marginTop: "5em",
    borderRadius: 5,
  },
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 45,
    width: 245,
    fontSize: "1rem",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225,
    },
  },
}));

export default function ContactUs(props: any) {
  const { setValue, setSelectedIndex } = props;
  const classes = useStyles();
  const theme = useTheme() as any;
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneHelper, setPhoneHelper] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const onChange = (e: any) => {
    let valid;
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+/.test(
          e.target.value
        );
        if (!valid) {
          setEmailHelper("Invalid email");
        } else {
          setEmailHelper("");
        }
        break;
      case "name":
        setName(e.target.value);
        break;
      case "phone":
        setPhone(e.target.value);
        valid = /^\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/.test(
          e.target.value
        );
        if (!valid) {
          setPhoneHelper("Invalid phone");
        } else {
          setPhoneHelper("");
        }
        break;
      case "message":
        setMessage(e.target.value);
        break;
      default:
        break;
    }
  };

  const onConfirm = () => {
    setLoading(true);
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        console.log(response);
        setLoading(false);
        setOpen(false);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setAlert({
          open: true,
          message: "Successfully",
          backgroundColor: "#4BB543",
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setAlert({
          open: true,
          message: "Some thing went wrong",
          backgroundColor: "#FF3232",
        });
      });
  };

  const buttonContents = (
    <>
      SEND MESSAGE
      <img
        src="/assets/send.svg"
        alt="paper airplane"
        style={{ marginLeft: "1em" }}
      />
    </>
  );

  return (
    <Grid container direction="row">
      <Head>
        <title key="title">Contact Us | Arc Development</title>
        <meta
          name="description"
          key="description"
          content="Let us guide you through the custom software design and development process. Send us a message with any of your ideas or questions to get started!"
        />
        <meta
          property="og:title"
          key="og:title"
          content="Bringing West Coast Technology to te Midwest | Contact Us"
        />
        <meta
          property="og:url"
          key="og:url"
          content="https://nextjs-material-ui-arc.vercel.app/contactUs"
        />
        <link
          rel="canonical"
          key="canonical"
          href="https://nextjs-material-ui-arc.vercel.app/contactUs"
        />
      </Head>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{
          marginBottom: matchesMD ? "5em" : 0,
          marginTop: matchesSM ? "1em" : matchesMD ? "5em" : 0,
        }}
        lg={4}
        xl={3}
      >
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography
                align={matchesMD ? "center" : undefined}
                variant="h2"
                style={{ lineHeight: 1 }}
              >
                Contact Us
              </Typography>
              <Typography
                align={matchesMD ? "center" : undefined}
                variant="body1"
                style={{ color: theme.palette.common.blue }}
              >
                we're waiting
              </Typography>
            </Grid>
            <Grid item container style={{ marginTop: "2em", maxWidth: "20em" }}>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <img
                  src="/assets/phone.svg"
                  alt="phone"
                  style={{ marginRight: "0.5em" }}
                />
              </Grid>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <Typography
                  variant="body1"
                  style={{ color: theme.palette.common.blue, fontSize: "1rem" }}
                >
                  <a
                    href="tel:5555555555"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    (555) 555-5555
                  </a>
                </Typography>
              </Grid>
            </Grid>
            <Grid item container style={{ marginBottom: "2em" }}>
              <Grid item>
                <img
                  src="/assets/email.svg"
                  alt="envelop"
                  style={{ marginRight: "0.5em", verticalAlign: "bottom" }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  style={{ color: theme.palette.common.blue, fontSize: "1rem" }}
                >
                  <a
                    href="mailto:zachary@gmail.com"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    zachary@gmail.com
                  </a>
                </Typography>
              </Grid>
            </Grid>
            <Grid item container direction="column" style={{ width: "20em" }}>
              <Grid item>
                <TextField
                  label="Name"
                  id="name"
                  fullWidth
                  value={name}
                  onChange={onChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  error={emailHelper.length !== 0}
                  helperText={emailHelper}
                  fullWidth
                  label="Email"
                  id="email"
                  value={email}
                  onChange={onChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  error={phoneHelper.length !== 0}
                  helperText={phoneHelper}
                  fullWidth
                  label="Phone"
                  id="phone"
                  value={phone}
                  onChange={onChange}
                />
              </Grid>
              <Grid item style={{ width: "20em" }}>
                <TextField
                  id="message"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  className={classes.message}
                  value={message}
                  multiline
                  fullWidth
                  rows={10}
                  onChange={onChange}
                />
              </Grid>
              <Grid item container justify="center">
                <Button
                  onClick={() => setOpen(true)}
                  disabled={
                    name.length === 0 ||
                    email.length === 0 ||
                    phone.length === 0 ||
                    message.length === 0 ||
                    phoneHelper.length !== 0 ||
                    emailHelper.length !== 0
                  }
                  variant="contained"
                  style={{ marginTop: "2em" }}
                  className={classes.sendButton}
                >
                  {buttonContents}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        style={{ zIndex: 1302 }}
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={matchesSM}
        PaperProps={{
          style: {
            paddingTop: matchesXS ? "1em" : "5em",
            paddingBottom: matchesXS ? "1em" : "5em",
            paddingLeft: matchesXS
              ? 0
              : matchesSM
              ? "5em"
              : matchesMD
              ? "15em"
              : "25em",
            paddingRight: matchesXS
              ? 0
              : matchesSM
              ? "5em"
              : matchesMD
              ? "15em"
              : "25em",
          },
        }}
      >
        <DialogContent>
          <Grid container direction="column">
            <Grid item>
              <Typography align="center" variant="h4" gutterBottom>
                Confirm Message
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Name"
                id="name"
                fullWidth
                value={name}
                onChange={onChange}
              />
            </Grid>
            <Grid item>
              <TextField
                error={emailHelper.length !== 0}
                helperText={emailHelper}
                fullWidth
                label="Email"
                id="email"
                value={email}
                onChange={onChange}
              />
            </Grid>
            <Grid item>
              <TextField
                error={phoneHelper.length !== 0}
                helperText={phoneHelper}
                fullWidth
                label="Phone"
                id="phone"
                value={phone}
                onChange={onChange}
              />
            </Grid>
            <Grid item style={{ width: matchesSM ? "100%" : "20em" }}>
              <TextField
                id="message"
                InputProps={{
                  disableUnderline: true,
                }}
                className={classes.message}
                value={message}
                multiline
                fullWidth
                rows={10}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction={matchesSM ? "column" : "row"}
            alignItems="center"
            style={{ marginTop: "2em" }}
          >
            <Grid item>
              <Button
                style={{ fontWeight: 300 }}
                color="primary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={onConfirm}
                disabled={
                  name.length === 0 ||
                  email.length === 0 ||
                  phone.length === 0 ||
                  message.length === 0 ||
                  phoneHelper.length !== 0 ||
                  emailHelper.length !== 0
                }
                variant="contained"
                className={classes.sendButton}
              >
                {loading ? <CircularProgress /> : buttonContents}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
      <Grid
        item
        container
        direction={matchesMD ? "column" : "row"}
        alignItems="center"
        justify={matchesMD ? "center" : undefined}
        className={classes.background}
        lg={8}
        xl={9}
      >
        <Grid
          item
          style={{
            marginLeft: matchesMD ? 0 : "3em",
            textAlign: matchesMD ? "center" : "inherit",
          }}
        >
          <Grid container direction="column">
            <Grid item>
              <Typography align={matchesMD ? "center" : undefined} variant="h2">
                Simple Software.
                <br /> Revolutionary Results.
              </Typography>
              <Typography
                align={matchesMD ? "center" : undefined}
                variant="subtitle2"
                style={{ fontSize: "2.5rem" }}
              >
                Take advantage of the 21st Century
              </Typography>
              <Grid container justify={matchesSM ? "center" : undefined} item>
                {/* @ts-ignore */}
                <Button
                  onClick={() => setValue(2)}
                  component={Link}
                  href="/revolution"
                  variant="outlined"
                  className={classes.learnButton}
                >
                  <span style={{ marginRight: 5 }}>Learn More</span>
                  <ButtonArrow
                    width={15}
                    height={15}
                    // @ts-ignore
                    fill={theme.palette.common.blue}
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {/* @ts-ignore */}
          <Button
            onClick={() => setValue(5)}
            component={Link}
            href="/estimate"
            variant="contained"
            className={classes.estimateButton}
          >
            Free Estimate
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
