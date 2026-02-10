const express = require("express")
const app = express()
const cors = require("cors")
const profileModel = require("./models/userProfile.model")
app.use(cors())
app.use(express.json())

/*post api*/
app.post("/userprofiles", async (req, res) =>{
const {name,age,profession,image,education,salary,city } = req.body;
  const profile =   await profileModel.create({
    name,age,profession,image,education,salary,city
  })
   res.status(201).json({
      message: "User profile created successfully",
      profile
    });


}) 
 
/*get api*/
app.get("/userprofiles", async (req, res) => {
  const profiles = await profileModel.find();

  res.status(200).json({
    message: "All user profiles fetched successfully",
    profiles
  });
});

/*delete*/
app.delete("/userprofiles/:id", async (req, res) => {
  const { id } = req.params;

  const deletedProfile = await profileModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "User profile deleted successfully",
    deletedProfile
  });
});

/*patch*/
app.patch("/userprofiles/:id", async (req, res) => {
  const { id } = req.params;
  const { city } = req.body;

  const updatedProfile = await profileModel.findByIdAndUpdate(
    id,
    { city },
    { new: true }
  );

  res.status(200).json({
    message: "City updated successfully",
    updatedProfile
  });
});

/*put*/
app.put("/userprofiles/:id", async (req, res) => {
  const { id } = req.params;

  const updatedProfile = await profileModel.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      age: req.body.age,
      profession: req.body.profession,
      image: req.body.image,
      education: req.body.education,
      salary: req.body.salary,
      city: req.body.city
    },
    {
      new: true,
      overwrite: true
    }
  );

  res.status(200).json({
    message: "User profile updated (PUT)",
    updatedProfile
  });
});


module.exports = app 