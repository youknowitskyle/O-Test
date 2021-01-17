import React from "react";
import axios from "axios";

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
}));

const Quiz = () => {
  const classes = useStyles();
  const [sex, setSex] = useState("f");
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0.0);
  const [weight, setWeight] = useState(0.0);
  const [family, setFamily] = useState(false);
  const [highCaloricFood, setHighCaloricFood] = useState(false);
  const [meals, setMeals] = useState(0);
  const [betweenMeals, setBetweenMeals] = useState(0);
  const [smoke, setSmoke] = useState(false);
  const [water, setWater] = useState(0.0);
  const [monitorCalories, setMonitorCalories] = useState(false);
  const [workoutDays, setWorkoutDays] = useState(0);
  const [hoursTech, setHoursTech] = useState(0);

  return (
    <div className={classes.container}>
      <div className={classes.cardContainer}>
        <Card raised="true" variant="outlined" className={classes.card}>
          <section
            class="container-fluid px-0 quiz overflow-hidden"
            className={classes.section}
          >
            <div class="row">
              <div class="col-sm">
                <form id="question-form">
                  <div id="basic-info">
                    <h2>
                      <u>Information Form</u>
                    </h2>
                    <div className={classes.row}>
                      <FormLabel component="legend">Sex:</FormLabel>
                      <RadioGroup aria-label="gender" name="gender1" required>
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                      </RadioGroup>
                    </div>
                    <div className={classes.row}>
                      <TextField
                        label="Age"
                        variant="outlined"
                        type="number"
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                        }}
                        required
                      />
                    </div>
                    <div className={classes.row}>
                      <TextField
                        label="Height (m)"
                        variant="outlined"
                        type="number"
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                        }}
                        required
                      />
                    </div>
                    <div className={classes.row}>
                      <TextField
                        label="Weight (kg)"
                        variant="outlined"
                        type="number"
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                        }}
                        required
                      />
                    </div>
                    <div className={classes.row}>
                      <FormLabel component="legend">
                        Has a family member suffered from being overweight?
                      </FormLabel>
                      <RadioGroup aria-label="gender" name="gender1" required>
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </div>
                    <div className={classes.row}>
                      <FormLabel component="legend">
                        Do you eat high caloric food frequently?
                      </FormLabel>
                      <RadioGroup aria-label="gender" name="gender1" required>
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </div>
                    <div className={classes.row}>
                      <InputLabel id="label">
                        How many main meals do you have a day?
                      </InputLabel>
                      <Select labelId="label" id="select" value="1">
                        <MenuItem value="1">1-2</MenuItem>
                        <MenuItem value="2">3</MenuItem>
                        <MenuItem value="3">4 or more</MenuItem>
                      </Select>
                    </div>
                    <div className={classes.row}>
                      <InputLabel id="label">
                        Do you eat any food between meals?
                      </InputLabel>
                      <Select labelId="label" id="select" value="1">
                        <MenuItem value="1">No</MenuItem>
                        <MenuItem value="2">Sometimes</MenuItem>
                        <MenuItem value="3">Frequently</MenuItem>
                        <MenuItem value="4">Always</MenuItem>
                      </Select>
                    </div>
                    <div className={classes.row}>
                      <FormLabel component="legend">Do you smoke?</FormLabel>
                      <RadioGroup aria-label="gender" name="gender1" required>
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </div>
                    <div className={classes.row}>
                      <InputLabel id="label">
                        How much water do you drink daily?
                      </InputLabel>
                      <Select labelId="label" id="select" value="1">
                        <MenuItem value="1">Less than a liter</MenuItem>
                        <MenuItem value="2">Between 1 and 2 liters</MenuItem>
                        <MenuItem value="3">More than 2 liters</MenuItem>
                      </Select>
                    </div>
                    <div className={classes.row}>
                      <FormLabel component="legend">
                        Do you monitor the calories you eat daily?
                      </FormLabel>
                      <RadioGroup aria-label="gender" name="gender1" required>
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </div>
                    <div className={classes.row}>
                      <InputLabel id="label">
                        How many days do you workout per week?
                      </InputLabel>
                      <Select labelId="label" id="select" value="1">
                        <MenuItem value="1">Less than 1 day</MenuItem>
                        <MenuItem value="2">1 or 2 days</MenuItem>
                        <MenuItem value="3">2-4 days</MenuItem>
                        <MenuItem value="4">More than 4 days</MenuItem>
                      </Select>
                    </div>
                    <div className={classes.row}>
                      <InputLabel id="label">
                        How much time do you use technological devices per day?
                      </InputLabel>
                      <Select labelId="label" id="select" value="1">
                        <MenuItem value="1">0-2 hours</MenuItem>
                        <MenuItem value="2">3-5 hours</MenuItem>
                        <MenuItem value="3">More than 5 hours</MenuItem>
                      </Select>
                    </div>
                    <div className={classes.row}>
                      <InputLabel id="label">
                        How often do you drink alcohol?
                      </InputLabel>
                      <Select labelId="label" id="select" value="1">
                        <MenuItem value="1">I do not</MenuItem>
                        <MenuItem value="2">Sometimes</MenuItem>
                        <MenuItem value="3">Frequently</MenuItem>
                        <MenuItem value="4">Always</MenuItem>
                      </Select>
                    </div>
                    <div className={classes.row}>
                      <InputLabel id="label">
                        What is your main form of transportation?
                      </InputLabel>
                      <Select labelId="label" id="select" value="1">
                        <MenuItem value="1">Automobile</MenuItem>
                        <MenuItem value="2">Motorbike</MenuItem>
                        <MenuItem value="3">Bike</MenuItem>
                        <MenuItem value="4">Public Transportation</MenuItem>
                        <MenuItem value="5">Walking</MenuItem>
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
  );
};

export default Quiz;
