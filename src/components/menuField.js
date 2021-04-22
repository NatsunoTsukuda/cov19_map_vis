import classes from "./menuField.module.css";

export function MenuField() {
  return (
    <div className={classes.field}>
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
      <div className={classes.column}>
        <div>Polygon Layer</div>
        <form>
          <label>
            <input type="checkbox" name="color1" value="red" checked />
            {"全国"}
          </label>
          <br/>
          <label>
            <input type="checkbox" name="color1" value="red" />
            {"都道府県別"}
          </label>
        </form>
      </div>
      <div className={classes.column}>
        <div>Arc Layer</div>
        <form>
          <label>
            <input type="checkbox" name="color1" value="red" checked />
            {"全国"}
          </label>
          <br/>
          <label>
            <input type="checkbox" name="color1" value="red" />
            {"都道府県別"}
          </label>
        </form>
      </div>
    </div>
  );
}
