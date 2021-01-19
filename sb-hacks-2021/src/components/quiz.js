import React from "react";
import axios from "axios";
import firebase from "firebase";
import ReactLoading from "react-loading";

import { useEffect, useState } from "react";

import "./quiz.css";
import {
  makeStyles,
  TextField,
  Button,
  Typography,
  Link,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  Card,
} from "@material-ui/core";
import * as ROUTES from "../constants/routes";

import { FullscreenExit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  card: {
    padding: 30,
    boxShadow: "2px 5px 4px 5px #888888",
    maxWidth: "1000px",
    margin: 20,
  },
  row: {
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
  cardContainer: {
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
  },
  section: {
    marginLeft: 100,
    marginRight: 100,
    marginTop: 20,
  },
  loadContainer: {
    height: "100%",
    position: "relative",
  },
  centerLoad: {
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    msTransform: "translate(-50%, 50%)",
    transform: "translate(-50%, 50%)",
  },
}));

const Quiz = (props) => {
  const classes = useStyles();
  const [sex, setSex] = useState(-1);
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0.0);
  const [weight, setWeight] = useState(0);
  const [vegetables, setVegetables] = useState(-1);
  const [water, setWater] = useState(-1);
  const [physical, setPhysical] = useState(-1);
  const [betweenMeals, setBetweenMeals] = useState(-1);
  const [family, setFamily] = useState(-1);
  const [smoke, setSmoke] = useState(-1);
  const [alcohol, setAlcohol] = useState(-1);
  const [loading, setLoading] = useState(false);

  const handleSexChange = (event) => {
    if (sex == 1) setSex(0);
    else setSex(1);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleVegetableChange = (event) => {
    setVegetables(event.target.value);
  };

  const handleWaterChange = (event) => {
    setWater(event.target.value);
  };

  const handlePhysicalChange = (event) => {
    setPhysical(event.target.value);
  };

  const handleBetweenChange = (event) => {
    setBetweenMeals(event.target.value);
  };

  const handleFamilyChange = (event) => {
    setFamily(event.target.value);
  };

  const handleSmokeChange = (event) => {
    setSmoke(event.target.value);
  };

  const handleAlcoholChange = (event) => {
    setAlcohol(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    const data = {
      gender: parseInt(sex),
      age: parseInt(age),
      height: parseFloat(height * parseFloat(0.0254)),
      weight: parseFloat(weight * parseFloat(0.453592)),
      fcvc: parseInt(vegetables),
      ch2o: parseInt(water),
      faf: parseInt(physical),
      caec: parseInt(betweenMeals),
      family: parseInt(family),
      smoke: parseInt(smoke),
      calc: parseInt(alcohol),
    };
    console.log(data);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("https://todo-jx3gabef3q-uc.a.run.app/predict", requestOptions).then(
      (res) => {
        res.json().then((data) => {
          console.log(data);
          firebase
            .database()
            .ref("users/" + props.user.uid)
            .update({ diagnosis: data });
          setLoading(false);
          props.history.push(ROUTES.RESULTS);
        });
      }
    );
  };

  // useEffect(() => {
  //   console.log(diagnosis);
  //   if (diagnosis != "" && diagnosis) {
  //     console.log(props);
  //     firebase
  //       .database()
  //       .ref("users/" + props.user.uid)
  //       .update({ diagnosis: diagnosis });
  //   }
  // }, [diagnosis]);

  return (
    <>
      {loading ? (
        <div className={classes.container}>
          <div className={classes.loadContainer}>
            <Typography variant="body1" style={{marginTop: 50}}>Your results are loading...</Typography>
            <div className={classes.centerLoad}>
              <ReactLoading
                type="spin"
                color="#000000"
                height={166}
                width={94}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes.cardContainer}>
            <Card raised="true" variant="outlined" className={classes.card}>
              <section
                class="container-fluid px-0 quiz overflow-hidden"
                className={classes.section}
              >
                <div class="row">
                  <div class="col-sm">
                    <form id="question-form" onSubmit={handleSubmit}>
                      <div id="basic-info">
                        <h2>
                          <u>Information Form</u>
                        </h2>
                        <div className={classes.row}>
                          <FormLabel component="legend">Sex:</FormLabel>
                          <RadioGroup
                            aria-label="gender"
                            name="gender1"
                            required
                            value={sex}
                            onChange={handleSexChange}
                          >
                            <FormControlLabel
                              value={1}
                              control={<Radio />}
                              label="Female"
                              checked={sex == 1}
                            />
                            <FormControlLabel
                              value={0}
                              control={<Radio />}
                              label="Male"
                              checked={sex == 0}
                            />
                          </RadioGroup>
                        </div>
                        <div className={classes.row}>
                          <TextField
                            label="Age"
                            variant="outlined"
                            type="number"
                            value={age}
                            InputProps={{
                              inputProps: {
                                min: 0,
                              },
                            }}
                            required
                            onChange={handleAgeChange}
                          />
                        </div>
                        <div className={classes.row}>
                          <TextField
                            label="Height (inches)"
                            variant="outlined"
                            type="number"
                            value={height}
                            InputProps={{
                              inputProps: {
                                min: 0,
                              },
                            }}
                            required
                            onChange={handleHeightChange}
                          />
                        </div>
                        <div className={classes.row}>
                          <TextField
                            label="Weight (lbs)"
                            variant="outlined"
                            type="number"
                            value={weight}
                            InputProps={{
                              inputProps: {
                                min: 0,
                              },
                            }}
                            required
                            onChange={handleWeightChange}
                          />
                        </div>
                        <div className={classes.row}>
                          <InputLabel id="label">
                            Do you usually eat vegetables in your meals?
                          </InputLabel>
                          <Select
                            labelId="label"
                            id="select"
                            value={vegetables}
                            onChange={handleVegetableChange}
                          >
                            <MenuItem value={0}>Never</MenuItem>
                            <MenuItem value={1}>Sometimes</MenuItem>
                            <MenuItem value={2}>Always</MenuItem>
                          </Select>
                        </div>
                        <div className={classes.row}>
                          <InputLabel id="label">
                            How much water do you drink daily?
                          </InputLabel>
                          <Select
                            labelId="label"
                            id="select"
                            value={water}
                            onChange={handleWaterChange}
                          >
                            <MenuItem value={0}>Less than a liter</MenuItem>
                            <MenuItem value={1}>
                              Between 1 and 2 liters
                            </MenuItem>
                            <MenuItem value={2}>More than 2 liters</MenuItem>
                          </Select>
                        </div>
                        <div className={classes.row}>
                          <InputLabel id="label">
                            How many days do you workout per week?
                          </InputLabel>
                          <Select
                            labelId="label"
                            id="select"
                            value={physical}
                            onChange={handlePhysicalChange}
                          >
                            <MenuItem value={0}>Less than 1 day</MenuItem>
                            <MenuItem value={1}>1 or 2 days</MenuItem>
                            <MenuItem value={2}>2-4 days</MenuItem>
                            <MenuItem value={3}>More than 4 days</MenuItem>
                          </Select>
                        </div>
                        <div className={classes.row}>
                          <InputLabel id="label">
                            Do you eat any food between meals?
                          </InputLabel>
                          <Select
                            labelId="label"
                            id="select"
                            value={betweenMeals}
                            onChange={handleBetweenChange}
                          >
                            <MenuItem value={0}>No</MenuItem>
                            <MenuItem value={1}>Sometimes</MenuItem>
                            <MenuItem value={2}>Frequently</MenuItem>
                            <MenuItem value={3}>Always</MenuItem>
                          </Select>
                        </div>
                        <div className={classes.row}>
                          <FormLabel component="legend">
                            Has a family member suffered from being overweight?
                          </FormLabel>
                          <RadioGroup
                            aria-label="gender"
                            name="gender1"
                            required
                            value={family}
                            onChange={handleFamilyChange}
                          >
                            <FormControlLabel
                              value={1}
                              control={<Radio />}
                              label="Yes"
                              checked={family == 1}
                            />
                            <FormControlLabel
                              value={0}
                              control={<Radio />}
                              label="No"
                              checked={family == 0}
                            />
                          </RadioGroup>
                        </div>
                        <div className={classes.row}>
                          <FormLabel component="legend">
                            Do you smoke?
                          </FormLabel>
                          <RadioGroup
                            aria-label="gender"
                            name="gender1"
                            required
                            value={smoke}
                            onChange={handleSmokeChange}
                          >
                            <FormControlLabel
                              value={1}
                              control={<Radio />}
                              label="Yes"
                              checked={smoke == 1}
                            />
                            <FormControlLabel
                              value={0}
                              control={<Radio />}
                              label="No"
                              checked={smoke == 0}
                            />
                          </RadioGroup>
                        </div>
                        <div className={classes.row}>
                          <InputLabel id="label">
                            How often do you drink alcohol?
                          </InputLabel>
                          <Select
                            labelId="label"
                            id="select"
                            value={alcohol}
                            onChange={handleAlcoholChange}
                          >
                            <MenuItem value={0}>I do not</MenuItem>
                            <MenuItem value={1}>Sometimes</MenuItem>
                            <MenuItem value={2}>Frequently</MenuItem>
                            <MenuItem value={3}>Always</MenuItem>
                          </Select>
                        </div>
                      </div>
                      <div className="but">
                        <Button
                          variant="outlined"
                          type="submit"
                          className={classes.button}
                        >
                          Submit
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
