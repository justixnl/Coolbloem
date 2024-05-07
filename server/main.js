// THIS FILE IS TO RUN Express.js a fake backend / API
// Dependencies
import express from "express";
import path from "path";
import fileUpload from "express-fileupload";
import ViteExpress from "vite-express";
import fs from "fs";

// Utils
import { convertToDDMMYY } from "./../server/utils/convertData.js";

const app = express();
const __dirname = path.resolve(); // Retrieves path
const portNumber = 3000; // The port that Express is running on

// MiddleWare
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

// END POINT TO RETRIEVE THE NEWS ARTICLES
app.get("/news", (req, res) => {
  // Path to the JSON file
  const filePath = path.join(__dirname, "/server/nieuws.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading JSON file");
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Send the JSON data as response
    res.json(jsonData);
  });
});

// END POINT TO RETRIEVE A PERSONNEL LIST
app.get("/smoelenboek", (req, res) => {
  // Path to the JSON file
  const filePath = path.join(__dirname, "/server/smoelenboek.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading JSON file");
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Send the JSON data as response
    res.json(jsonData);
  });
});

// END POINT TO ADD NEW NEWS ARTICLE
app.post("/add-news-article", function (req, res) {
  // Access form data
  const formData = req.body;
  // Access uploaded file
  const sampleFile = req.files.ImageUpload;

  // Check if file was uploaded
  if (!sampleFile) {
    return res.status(400).send("No file uploaded.");
  }

  // Move the uploaded file to a desired location
  const uploadPath = __dirname + "/src/assets/images/news/" + sampleFile.name;
  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    const newsDB = path.join(__dirname, "/server/nieuws.json");

    // Check if the file exists
    if (!fs.existsSync(newsDB)) {
      console.error("File not found at:", newsDB);
      return res.status(404).send("JSON file not found");
    }

    // Read the existing JSON data from the file
    fs.readFile(newsDB, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).send("Error reading JSON file");
      }

      let jsonData;

      try {
        // Parse the existing JSON data
        jsonData = JSON.parse(data);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        return res.status(500).send("Error parsing JSON data");
      }

      // Find the maximum ID currently in the JSON data
      const maxID = jsonData.nieuws.reduce((max, article) => Math.max(max, parseInt(article.ID)), 0);

      // Generate a new ID above the maximum ID
      const newID = Math.max(maxID + 1, 21).toString();

      // Update the new article object with the generated ID
      const newArticle = {
        ID: newID,
        ...formData,
        Category: "News",
        HeaderImage: `/images/news/${sampleFile.name}`, // Assuming the header image is the same as the uploaded image
        PublishDate: convertToDDMMYY(new Date().toISOString()), // Use the current date as the publish date
      };

      // Add the new article to the existing JSON data
      jsonData.nieuws.push(newArticle);

      // Write the updated JSON data back to the file
      fs.writeFile(newsDB, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Error updating JSON file");
        }

        // Redirect to the news page after successfully updating the JSON file
        res.redirect("/nieuws.html");
      });
    });
  });
});

// END POINT TO ADD A NEW PERSONNEL
app.post("/add-new-personnel", function (req, res) {
  // Access form data
  const formData = req.body;
  // Access uploaded file
  const sampleFile = req.files.ImageUpload;

  // Check if file was uploaded
  if (!sampleFile) {
    return res.status(400).send("No file uploaded.");
  }

  // Move the uploaded file to a desired location
  const uploadPath = __dirname + "/src/assets/images/avatar/" + sampleFile.name;
  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    const smoelenboekDB = path.join(__dirname, "/server/smoelenboek.json");

    // Check if the file exists
    if (!fs.existsSync(smoelenboekDB)) {
      console.error("File not found at:", smoelenboekDB);
      return res.status(404).send("JSON file not found");
    }

    // Read the existing JSON data from the file
    fs.readFile(smoelenboekDB, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).send("Error reading JSON file");
      }

      let jsonData;

      try {
        // Parse the existing JSON data
        jsonData = JSON.parse(data);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        return res.status(500).send("Error parsing JSON data");
      }

      // Find the maximum ID currently in the JSON data
      const maxID = jsonData.smoelenboek.reduce((max, article) => Math.max(max, parseInt(article.ID)), 0);

      // Generate a new ID above the maximum ID
      const newID = Math.max(maxID + 1, 21).toString();

      // Update the new person object with the generated ID
      const newPerson = {
        ID: newID,
        ...formData,
        avatar: `/images/avatar/${sampleFile.name}`,
      };

      // Add the new article to the existing JSON data
      jsonData.smoelenboek.push(newPerson);

      // Write the updated JSON data back to the file
      fs.writeFile(smoelenboekDB, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Error updating JSON file");
        }

        // Redirect to the news page after successfully updating the JSON file
        res.redirect("/smoelenboek.html");
      });
    });
  });
});

// Mock user data
const userData = [
  { username: "user", email: "user@example.com", password: "password", role: "user" },
  { username: "moderator", email: "moderator@example.com", password: "password", role: "moderator" },
];

// END POINT Authentication route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = authenticate(username, password);
  if (user) {
    res.status(200).json({ message: "Login successful", user });
  } else {
    res.status(401).json({ message: "Invalid username/email or password." });
  }
});

// Function to check authentication
function authenticate(username, password) {
  return userData.find((user) => (user.username === username || user.email === username) && user.password === password);
}

// Leaving the console log in to see if the Server is working correctly
ViteExpress.listen(app, portNumber, () => console.log(`Server is listening on port ${portNumber}...`));
