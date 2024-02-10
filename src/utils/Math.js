export const Greetings = () => {
  [22, "Working late"],
    [18, "Good evening"],
    [12, "Good afternoon"],
    [5, "Good morning"],
    [0, "Whoa, early bird"];

  const hours = new Date().getHours();

  switch (true) {
    case hours >= 4 && hours < 12:
      return "Good Morning";
    case hours >= 12 && hours < 18:
      return "Good Afternoon";
    case hours >= 18 && hours < 21:
      return "Good Evening";
    case (hours >= 21 && hours <= 23) || hours < 4:
      return "Good Night";
  }
};

export const timeAndDate = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  getDate: (val) => {
    let month = +val.slice(5, 7);
    let day = +val.slice(-2);
    let year = +val.slice(0, 4);
    return `${timeAndDate.months[month - 1]} ${day}, ${year}`;
  },
};

export const playbackTime = (val) => {
  const value = val.reduce((acc, time) => time + acc, 0);
  const songsList = val.filter((song) => song > 0).length;
  const s = Math.floor((value / 1000) % 60);
  const m = Math.floor((value / 1000 / 60) % 60);
  const h = Math.floor((value / 1000 / 60 / 60) % 24);

  return `${songsList > 0 ? songsList + " Songs" : ""} • ${
    h > 0 ? h + " hr " : ""
  } ${m > 0 ? m + " min " : ""} ${s > 0 ? s + " s " : ""}`;
};

export const playbackTimeSimple = (val) => {
  const h = Math.floor((val / 1000 / 60 / 60) % 24);
  const m = Math.floor((val / 1000 / 60) % 60);
  const s = Math.floor((val / 1000) % 60);
  return `${h > 0 ? h + ":" : ""}${m > 0 ? m : "00"}${
    s > 0 && s < 10 ? ":0" + s : s > 10 ? ":" + s : ":00"
  }`;
};

export const range = (elapsed, total) => {
  return (elapsed / total) * 100;
};

export const randNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
