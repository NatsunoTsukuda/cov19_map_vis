import classes from "./bottomMenuField.module.css";
import { Slider, Tooltip, ButtonGroup, Button } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import { useState, createRef } from "react";

const sliderRef = createRef(null);

export function BottomMenuField(props) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={classes.bottomMenuField}>
      <Slider
        className={classes.slider}
        ref={sliderRef}
        value={props.original_index}
        defaultValue={props.defaultValue}
        ValueLabelComponent={(prop) => ValueLabelComponent(prop, props.date)}
        valueLabelDisplay="on"
        step={1}
        marks
        min={0}
        max={props.defaultValue}
        onChange={(e, v) => props.onSliderChange(v)}
      />
      <ButtonGroup className={classes.group}>
        <Button
          variant="outlined"
          className={classes.button}
          startIcon={<PlayArrowIcon className={classes.icon} />}
          style={{ borderColor: "darkturquoise" }}
          onClick={() => {
            dataPlaying(
              !isPlaying,
              props.onSliderChange,
              props.original_index,
              props.date_length
            );
            setIsPlaying(!isPlaying);
          }}
        />
        <Button
          variant="outlined"
          className={classes.button}
          startIcon={<PauseIcon className={classes.icon} />}
          onClick={() => {
            dataPlaying(
              false,
              props.onSliderChange,
              props.original_index,
              props.date_length
            );
            setIsPlaying(false);
          }}
        />
        <Button
          variant="outlined"
          className={classes.button}
          startIcon={<SkipPreviousIcon className={classes.icon} />}
          onClick={() => {
            dataPlaying(
              false,
              props.onSliderChange,
              props.original_index,
              props.date_length
            );
            setIsPlaying(false);
          }}
        />
      </ButtonGroup>
    </div>
  );
}

function ValueLabelComponent(props, date) {
  const { children, open } = props;
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={date}>
      {children}
    </Tooltip>
  );
}

function dataPlaying(isPlaying, onSliderChange, original_index, length) {
  var index = original_index;
  var intervalID;
  if (isPlaying) {
    intervalID = setInterval(function () {
      onSliderChange(index);
      index++;
    }, 100);
    if (!isPlaying || index === length) {
      console.log("pause", intervalID);
      clearInterval(intervalID);
    }
  }
  console.log(intervalID);
}
