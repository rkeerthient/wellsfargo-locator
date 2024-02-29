type Hours = {
  title?: string;
  hours: Week;
  children?: React.ReactNode;
};

interface Week extends Record<string, any> {
  monday?: Day;
  tuesday?: Day;
  wednesday?: Day;
  thursday?: Day;
  friday?: Day;
  saturday?: Day;
  sunday?: Day;
}

type Day = {
  isClosed: boolean;
  openIntervals: OpenIntervals[];
};

type OpenIntervals = {
  start: string;
  end: string;
};

type HoursTextProps = {
  hours?: any;
  timezone: string;
};

const HoursText = ({ hours, timezone }: HoursTextProps) => {
  const getStatus = (currentDay: any, currentTime: any, hours: any) => {
    if (hours[currentDay.toLowerCase()].isClosed)
      return {
        status: "Closed perm",
        text: `Closed`,
      };
    var startTime =
      (hours[currentDay.toLowerCase()].openIntervals[0].start.split(":")[0] ===
      "00"
        ? 24
        : hours[currentDay.toLowerCase()].openIntervals[0].start.split(
            ":"
          )[0]) *
        60 +
      hours[currentDay.toLowerCase()].openIntervals[0].start.split(":")[1];
    var endTime =
      (hours[currentDay.toLowerCase()].openIntervals[0].end.split(":")[0] ===
      "00"
        ? 24
        : hours[currentDay.toLowerCase()].openIntervals[0].end.split(":")[0]) *
        60 +
      hours[currentDay.toLowerCase()].openIntervals[0].end.split(":")[1];
    var currently = currentTime.split(":")[0] * 60 + currentTime.split(":")[1];
    if (
      hours[currentDay.toLowerCase()].openIntervals[0].start == "00:00" &&
      hours[currentDay.toLowerCase()].openIntervals[0].end == "23:59"
    )
      return { status: "Open", text: "Open 24 Hours" };
    else if (startTime < currently < endTime)
      return {
        status: "Open Now",
        text: `Closes at ${closeOrOpenTime(
          hours[currentDay.toLowerCase()].openIntervals[0].end
        )}`,
      };
    else
      return {
        status: "Closed",
        text: `Opens ${getTomorrow} at ${closeOrOpenTime(
          hours[currentDay.toLowerCase()].openIntervals[0].start
        )}`,
      };
  };
  const getTomorrow = () => {
    var date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toLocaleString("en-us", { weekday: "long" });
  };
  const closeOrOpenTime = (inpTime: any) => {
    let newTime = inpTime;
    if (inpTime.split(":")[0] === "00")
      newTime = `${newTime.split(":")[0].replace(/(.*)/, "24")}:${
        newTime.split(":")[1]
      }`;

    newTime =
      newTime.split(":")[0] >= 12 && newTime.split(":")[0] <= 23
        ? `${newTime.split(":")[0] - 12}:${newTime.split(":")[1]} PM`
        : `${newTime.split(":")[0] - 12}:${newTime.split(":")[1]} AM`;

    return newTime;
  };

  const getDayName = (hours: any, timezone: any) => {
    let currentDay = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: timezone,
    });
    let currentTime = timeNow();
    return getStatus(currentDay, currentTime, hours);
  };
  const timeNow = () => {
    var d = new Date(),
      h = (d.getHours() < 10 ? "0" : "") + d.getHours(),
      m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    return h + ":" + m;
  };
  const res = getDayName(hours, timezone);
  return (
    <div className="hero  w-full">
      <div className="hero-row flex">
        <div
          className={
            res.status.includes("Open")
              ? "text-green-600 Hero-hoursToday flex gap-1 items-center w-max "
              : "text-red-600 Hero-hoursToday flex gap-1 items-center w-max "
          }
        >
          <p className="">
            {res.status.toLowerCase() === "open now"
              ? "Open Now - "
              : res.status.toLowerCase() === "closed"
                ? "Closed  - "
                : res.status.toLowerCase() === "closed perm"
                  ? "Closed"
                  : ""}
          </p>
          {res.status !== "Closed perm" && <p className="">{res.text}</p>}
        </div>
      </div>
    </div>
  );
};

export default HoursText;
