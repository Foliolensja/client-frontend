const fetchActivities = async (date) =>{

    let res = await fetch(
        `https://foliolens-backend.herokuapp.com/trading-days/${date}`,
      );
      if (res.ok) {
        if (date) {
          try {
            let data = await res.json();
            return data
          } catch (error) {
            console.log("Can't find data");
            return null
          }
        } else {
          return null
        }
      } else {
    }
}


export default async function handler(req, res) {
    let test = JSON.parse(req.body);
    let date = test.date
    let activities = await fetchActivities(date)
    res.status(200).json({ activities })
  }
  