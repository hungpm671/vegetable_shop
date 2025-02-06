import moment from "moment";

const dateFormat = (date: Date) => {
  const dateFor = moment(date);
  return dateFor.format("dddd, DD/MM/YYYY HH:mm");
};

export default dateFormat;
