export default async function handler(req, res) {
  let person = {};
  let user = JSON.parse(req.body);
  let payload = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    dob: user.dob,
    salary: user.salary,
    netWorth: user.netWorth,
    riskRating: user.riskRating,
  };

  try {
    const test = await fetch(
      `https://foliolens-backend.herokuapp.com/users/${user.id}`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en-US",
        },
      }
    );

    let data = await test.json();

    if (data.statusCode === 403) {
      res.status(403).json({ status: data.message });
    }

    res.status(200).json({ status: "User successfully updated" });
  } catch (error) {
    res.status(403).json({ status: error });
  }
}
