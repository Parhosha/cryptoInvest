export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const currency = ["USDT", "UAH", "RUB"];

export const getTime = () => {
  const times = [
    <option value="Average" key="average">
      Average
    </option>,
  ];
  for (let i = 0; i < 24; i++) {
    times.push(
      <option value={i >= 10 ? `${i}:01:00` : `0${i}:01:00`} key={i}>
        {i + `:00`}
      </option>
    );
  }
  return times;
};

export const getDayOfWeek = () => {
  return daysOfWeek.map((el, index) => (
    <option value={index} key={el}>
      {el}
    </option>
  ));
};

export const getCurrency = () => {
  return currency.map((el) => (
    <option value={el} key={el}>
      {el}
    </option>
  ));
};
