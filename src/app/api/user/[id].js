// pages/api/users/[id].js
export default function handler(req, res) {
  const { id } = req.query; // Access dynamic parameter "id"

  // Use the id to fetch user data from a database or an external API
  const userData = { id, name: "John Doe", email: "john@example.com" };

  // Send back the user data as a JSON response
  res.status(200).json(userData);
}
