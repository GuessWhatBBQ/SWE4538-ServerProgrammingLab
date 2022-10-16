const fs = require("fs");

const getCV = (req, res) => {
  educations = fs.readFileSync("data/education", { encoding: "utf-8" });
  educations = JSON.parse(String(educations));

  edus = [];

  for (let key in educations) {
    edus.push(educations[key]);
  }

  res.render("cv", { name: "Tasnim Ahmed", educations: edus });
};

const getCVForm = (req, res) => {
  res.render("form", { name: "Tasnim Ahmed" });
};

/**
 * @param {Request} req
 * @param {Response} res
 */
const updateCV = (req, res) => {
  console.log(req.body);
  const {
    degree1_degree,
    degree1_duration,
    degree1_text,
    degree2_degree,
    degree2_duration,
    degree2_text,
    degree3_degree,
    degree3_duration,
    degree3_text,
  } = req.body;
  const educations = JSON.parse(
    String(fs.readFileSync("data/education", { encoding: "utf-8" }))
  );
  const edus = {
    1: {
      degree: degree1_degree ? degree1_degree : educations["1"].degree,
      duration: degree1_duration ? degree1_duration : educations["1"].duration,
      text: degree1_text ? degree1_text : educations["1"].text,
    },
    2: {
      degree: degree2_degree ? degree2_degree : educations["2"].degree,
      duration: degree2_duration ? degree2_duration : educations["2"].duration,
      text: degree2_text ? degree2_text : educations["2"].text,
    },
    3: {
      degree: degree3_degree,
      duration: degree3_duration ? degree3_duration : educations["3"].duration,
      text: degree3_text ? degree3_text : educations["3"].text,
    },
  };
  fs.writeFile("./data/education", JSON.stringify(edus), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
    res.redirect(303, "/");
  });
};

module.exports = { getCV: getCV, getCVForm, updateCV };
