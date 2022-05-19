const fetchActivities = async () => {
  let res = await fetch(
    `https://foliolens-backend.herokuapp.com/trading-days/date`
  );
  let data = await res.json();
  return data;
};

export default async function handler(req, res) {
  let date = await fetchActivities();
  res.status(200).json(date);
}
