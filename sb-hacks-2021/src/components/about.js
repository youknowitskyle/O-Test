import {
  makeStyles,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>
        <Typography variant="h3" style={{ display: "inline-block" }}>
          How It Works
        </Typography>
      </div>
      <br />
      <div>
        <Typography variant="body1" style={{ display: "inline-block" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </div>
    </div>
  );
};

export default About;
