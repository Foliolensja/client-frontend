const fetchIndices = async (date) => {
  let res = await fetch(
    `https://foliolens-backend.herokuapp.com/indices/${date}`
  );
  if (res.ok) {
    if (date) {
      try {
        let data = await res.json();
        return data;
      } catch (error) {
        return null;
      }
    } else {
      return null;
    }
  } else {
  }
};

export default async function handler(req, res) {
  let test = JSON.parse(req.body);
  let date = test.date;
  let indices = await fetchIndices(date);
  res.status(200).json({ indices });
}
