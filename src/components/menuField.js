import classes from "./menuField.module.css";
import { prefectures } from "../metadata";

export function MenuField(props) {
  return (
    <div className={classes.field}>
      <div className={classes.column}>
        <div className={classes.columnTitle}>Polygon Layer</div>
        <label className={classes.checkIsDisplaying}>
          <input
            type="checkbox"
            name="color1"
            value="red"
            checked={!props.isDiplayPolygon}
            onChange={(e) => props.setIsDisplayPolygon(e.target.checked)}
          />
          {"非表示"}
        </label>
        <div className={classes.column}>
          <div>表示データ</div>
          <form>
            <select>
              <option>1日の陽性者数</option>
              <option>1日の10万人あたり陽性者数</option>
              <option>1日の死亡者数</option>
              <option>1日の10万人あたり死亡者数</option>
            </select>
          </form>
        </div>
        <div className={classes.column}>
          <div>比較先</div>
          <form>
            <select>
              <option>当日</option>
              <option>前日</option>
              <option>前週</option>
            </select>
          </form>
        </div>
        <div>表示範囲</div>
        <form>
          <label>
            <input
              type="checkbox"
              name="color1"
              value="polygon"
              checked={props.isZenkoku}
              onChange={() => {
                if (!props.isZenkoku) {
                  props.onIsZenkokuChange(true);
                }
              }}
            />
            {"全国"}
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="color1"
              value="polygon"
              checked={!props.isZenkoku}
              onChange={() => {
                if (props.isZenkoku) {
                  props.onIsZenkokuChange(false);
                }
              }}
            />
            {"都道府県別"}
          </label>
        </form>
        <div className={classes.selectPref}>
          <form>
            {prefectures.map((pref, i) => {
              return (
                <label className={classes.prefCheckbox}>
                  <input
                    type="checkbox"
                    name="pref"
                    value={pref}
                    key={pref + "-polygon"}
                    checked={props.isPrefsPolygon[i]}
                    onChange={(e) => {
                      const tmp = props.isPrefsPolygon.map((i) => {
                        return i;
                      });
                      tmp[i] = e.target.checked;
                      props.setIsPrefsPolygon(tmp);
                    }}
                  />
                  {pref}
                </label>
              );
            })}
          </form>
        </div>
      </div>
      <div className={classes.column}>
        <div className={classes.columnTitle}>Arc Layer</div>
        <label className={classes.checkIsDisplaying}>
          <input
            type="checkbox"
            name="color1"
            value="red"
            checked={!props.isDiplayArc}
            onChange={(e) => props.setIsDisplayArc(e.target.checked)}
          />
          {"非表示"}
        </label>
        <div className={classes.column}>
          <div>表示データ</div>
          <form>
            <select>
              <option>1日の陽性者数</option>
              <option>1日の10万人あたり陽性者数</option>
              <option>1日の死亡者数</option>
              <option>1日の10万人あたり死亡者数</option>
            </select>
          </form>
        </div>
        <div className={classes.column}>
          <div>比較先</div>
          <form>
            <select>
              <option>当日</option>
              <option>前日</option>
              <option>前週</option>
            </select>
          </form>
        </div>
        <div>表示範囲</div>
        <form>
          <label>
            <input
              type="checkbox"
              name="color1"
              value="red"
              checked={props.isZenkokuArc}
              onChange={() => {
                if (!props.isZenkokuArc) {
                  props.onIsZenkokuArcChange(true);
                }
              }}
            />
            {"全国"}
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="color1"
              value="red"
              checked={!props.isZenkokuArc}
              onChange={() => {
                if (props.isZenkokuArc) {
                  props.onIsZenkokuArcChange(false);
                }
              }}
            />
            {"都道府県別"}
          </label>
        </form>
        <div className={classes.selectPref}>
          <form>
            {prefectures.map((pref, i) => {
              return (
                <label className={classes.prefCheckbox}>
                  <input
                    type="checkbox"
                    name="pref"
                    value={pref}
                    key={pref + "-arc"}
                    checked={props.isPrefsArc[i]}
                    onChange={(e) => {
                      const tmp = props.isPrefsArc.map((i) => {
                        return i;
                      });
                      tmp[i] = e.target.checked;
                      props.setIsPrefsArc(tmp);
                    }}
                  />
                  {pref}
                </label>
              );
            })}
          </form>
        </div>
      </div>
    </div>
  );
}
