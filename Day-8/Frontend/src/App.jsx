import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [profiles, setProfiles] = useState([]);

  // form state
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    profession: "",
    education: "",
    salary: "",
    city: "",
    image: ""
  });

  const [editId, setEditId] = useState(null);

  // GET all profiles
  useEffect(() => {
    axios.get("http://localhost:3000/userprofiles")
      .then((res) => setProfiles(res.data.profiles))
      .catch((err) => console.log(err));
  }, []);

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // CREATE or UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      // PUT - UPDATE ALL FIELDS
      axios.put(`http://localhost:3000/userprofiles/${editId}`, formData)
        .then((res) => {
          setProfiles(
            profiles.map((p) =>
              p._id === editId ? res.data.updatedProfile : p
            )
          );
          resetForm();
        });
    } else {
      // POST - CREATE
      axios.post("http://localhost:3000/userprofiles", formData)
        .then((res) => {
          setProfiles([...profiles, res.data.profile]);
          resetForm();
        });
    }
  };

  // EDIT button click
  const handleEdit = (profile) => {
    setEditId(profile._id);
    setFormData(profile);
  };

  // DELETE
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/userprofiles/${id}`)
      .then(() => {
        setProfiles(profiles.filter((p) => p._id !== id));
      });
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      name: "",
      age: "",
      profession: "",
      education: "",
      salary: "",
      city: "",
      image: ""
    });
  };

  return (
    <>
      {/* FORM */}
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>{editId ? "Update Profile" : "Add Profile"}</h2>

        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
        <input name="profession" placeholder="Profession" value={formData.profession} onChange={handleChange} />
        <input name="education" placeholder="Education" value={formData.education} onChange={handleChange} />
        <input name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />

        <button type="submit">
          {editId ? "Update Profile" : "Add Profile"}
        </button>
      </form>

      {/* CARDS */}
      <div className="profiles">
        {profiles.map((profile) => (
          <div className="profile" key={profile._id}>
            <img
              src={profile.image || "https://via.placeholder.com/150"}
              alt={profile.name}
              className="profile-img"
            />

            <h3>{profile.name}</h3>
            <p><b>Age:</b> {profile.age}</p>
            <p><b>Profession:</b> {profile.profession}</p>
            <p><b>Education:</b> {profile.education}</p>
            <p><b>Salary:</b> ₹{profile.salary}</p>
            <p><b>City:</b> {profile.city}</p>

            <div className="card-buttons">
              <button onClick={() => handleEdit(profile)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(profile._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
