export const FormatTime = (time_entered: Date) => {
  const lastModifiedHours = new Date(time_entered).getHours().toString();

  const lastModifiedMinutes = new Date(time_entered).getMinutes().toString();

  const lastModifiedHoursF =
    lastModifiedHours.length === 0
      ? "00"
      : lastModifiedHours.length === 1
      ? "0" + lastModifiedHours
      : lastModifiedHours;

  const lastModifiedMinutesF =
    lastModifiedMinutes.length === 0
      ? "00"
      : lastModifiedMinutes.length === 1
      ? "0" + lastModifiedMinutes
      : lastModifiedMinutes;

  return `${lastModifiedHoursF}:${lastModifiedMinutesF}`;
};
