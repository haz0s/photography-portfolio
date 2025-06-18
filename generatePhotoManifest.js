const fs = require("fs");
const path = require("path");

const categories = [
  "Corprate",
  "Fashion",
  "Food Photography",
  "Moments",
  "Portraits",
  "Product Photography",
];

const baseDir = path.join(__dirname, "public", "photos", "Photography");
const manifest = {};

categories.forEach((category) => {
  const categoryDir = path.join(baseDir, category);
  if (fs.existsSync(categoryDir)) {
    const files = fs
      .readdirSync(categoryDir)
      .filter(
        (file) =>
          /\.(jpe?g|png|webp|gif)$/i.test(file) &&
          fs.statSync(path.join(categoryDir, file)).isFile()
      );
    manifest[category] = files.map(
      (file) => `/photos/Photography/${category}/${file}`
    );
  } else {
    manifest[category] = [];
  }
});

fs.writeFileSync(
  path.join(__dirname, "photoManifest.json"),
  JSON.stringify(manifest, null, 2)
);

console.log("photoManifest.json generated!");