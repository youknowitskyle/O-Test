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
  textContainer: {
    maxWidth: "80%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: "0 auto",
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.textContainer}>
        <div>
          <Typography variant="h5" style={{ display: "inline-block" }}>
            Goal
          </Typography>
        </div>
        <div>
          <Typography variant="body1" style={{ display: "inline-block" }}>
            Today, over 40% of Americans suffer from obesity. Obesity and
            excessive weight have been associated with severe risk of illness (
            <a href="https://www.cdc.gov/obesity/data/obesity-and-covid-19.html">
              CDC
            </a>
            ). We find this problem especially relevant given the current
            COVID-19 pandemic, as many people have found themselves confined
            indoors with little to no exercise. By providing a predictive model
            to guage the impact a person's lifestyle has on their health, we
            hope to aid in preventing health risks that arise from obesity and
            excessive weight.
          </Typography>
        </div>
        <br />
        <div>
          <Typography variant="h5" style={{ display: "inline-block" }}>
            Technology
          </Typography>
        </div>
        <div>
          <Typography variant="body1" style={{ display: "inline-block" }}>
            This project was created with a wide range of technologies. The
            frontend was developed using React, Firebase, Axios, and
            Material-UI. The backend consists of a REST service created with
            Flask and hosted on Google Cloud Platform. Our ML predictive model
            was crafted using NumPy and Matplotlib with a dataset acquired from{" "}
            <a href="https://www.kaggle.com/ankurbajaj9/obesity-levels">
              Kaggle
            </a>
            .
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default About;
