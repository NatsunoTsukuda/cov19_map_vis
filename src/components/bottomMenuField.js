import classes from "./bottomMenuField.module.css"
import { Slider, Tooltip, ButtonGroup, Button } from "@material-ui/core"
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

export function BottomMenuField(props) {
    return <div className={classes.bottomMenuField}>
        <Slider
            className={classes.slider}
            defaultValue={props.defaultValue}
            ValueLabelComponent={prop => ValueLabelComponent(prop, props.date)}
            valueLabelDisplay="on"
            step={1}
            marks
            min={0}
            max={props.defaultValue}
            onChange={(e, v) => props.onSliderChange(e, v)}
        />
        <ButtonGroup className={classes.group}>
            <Button
                variant="outlined"
                className={classes.button}
                startIcon={<PlayArrowIcon className={classes.icon} />}
                style={{borderColor: "darkturquoise"}}
            />
            <Button
                variant="outlined"
                className={classes.button}
                startIcon={<PauseIcon className={classes.icon} />}
            />
            <Button
                variant="outlined"
                className={classes.button}
                startIcon={<SkipPreviousIcon className={classes.icon} />}
            />
        </ButtonGroup>
    </div>
}

function ValueLabelComponent(props, date) {
    const { children, open } = props;
    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={date}>
            {children}
        </Tooltip>
    );
}