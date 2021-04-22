import classes from "./menuField.module.css";

const pref_list = [
  "北海道",
  "青森県",
  "山形県",
  "岩手県",
  "新潟県",
  "宮城県",
  "福島県",
  "茨城県",
  "群馬県",
  "栃木県",
  "埼玉県",
  "千葉県",
  "東京都",
];

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
      <div className={classes.columnTitle}>Polygon Layer</div>
        <label className={classes.checkIsDisplaying}>
          <input type="checkbox" name="color1" value="red" />
          {"非表示"}
        </label>
        <form>
          <label>
            <input type="checkbox" name="color1" value="red" checked />
            {"全国"}
          </label>
          <br />
          <label>
            <input type="checkbox" name="color1" value="red" />
            {"都道府県別"}
          </label>
        </form>
        <div className={classes.selectPref}>
          <form>
            {pref_list.map((pref) => {
              return (
                <label className={classes.prefCheckbox}>
                  <input type="checkbox" name="pref" value={pref} key={pref} />
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
          <input type="checkbox" name="color1" value="red" />
          {"非表示"}
        </label>
        <form>
          <label>
            <input type="checkbox" name="color1" value="red" checked />
            {"全国"}
          </label>
          <br />
          <label>
            <input type="checkbox" name="color1" value="red" />
            {"都道府県別"}
          </label>
        </form>
        <div className={classes.selectPref}>
          <form>
            {pref_list.map((pref) => {
              return (
                <label className={classes.prefCheckbox}>
                  <input type="checkbox" name="pref" value={pref} key={pref} />
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
