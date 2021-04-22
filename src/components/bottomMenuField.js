import classes from "./bottomMenuField.module.css";
import { Slider, Tooltip, ButtonGroup, Button } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import { useState, createRef } from "react";

const sliderRef = createRef(null);

export function BottomMenuField(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalID, setIntervalID] = useState(0);

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
            if (!isPlaying) {
              setIntervalID(
                dataPlaying(
                  props.onSliderChange,
                  props.original_index,
                  props.date_length
                )
              );
              setIsPlaying(true)
            }
          }}
        />
        <Button
          variant="outlined"
          className={classes.button}
          startIcon={<PauseIcon className={classes.icon} />}
          onClick={() => {
            clearInterval(intervalID);
            setIsPlaying(false)
          }}
        />
        <Button
          variant="outlined"
          className={classes.button}
          startIcon={<SkipPreviousIcon className={classes.icon} />}
          onClick={() => {
            clearInterval(intervalID);
            props.onSliderChange(0);
            setIsPlaying(false)
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

function dataPlaying(onSliderChange, original_index, length) {
  var index = original_index;
  var intervalID = setInterval(function () {
    if (index === length - 1) {
      clearInterval(intervalID);
    }
    onSliderChange(index);
    index++;
  }, 100);
  return intervalID;
}
