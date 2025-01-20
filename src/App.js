import logo from "./logo.svg";
import header_pic_1 from "./assets/ins_header_1.png";
import header_pic_2 from "./assets/ins_header_2.png";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState();

  useEffect(() => {
    const importAll = (r) => r.keys().map(r);
    const files = importAll(require.context("./medium", false));
    const updatedItems = {};

    for (const fileHandle of files) {
      const fileName = fileHandle.split("/").pop().toLowerCase();
      console.log("--", fileName);
      const number = parseInt(fileName.split(".")[0]);

      // Story doesn't display in the gallery
      if (!fileName.includes("story")) {
        if (!isNaN(number)) {
          if (!updatedItems[number]) {
            updatedItems[number] = {};
          }
          if (
            fileName.endsWith(".png") ||
            fileName.endsWith(".jpg") ||
            fileName.endsWith(".jpeg") ||
            fileName.endsWith(".mp4") ||
            fileName.endsWith(".wav") ||
            fileName.endsWith(".mov")
          ) {
            // 1. image
            updatedItems[number].imageHandle = fileHandle;
          } else if (fileName.endsWith(".txt")) {
            fetch(fileHandle)
              .then((response) => response.text())
              .then((data) => {
                // 2. text
                updatedItems[number].text = data;
              });
          }

          // 3. tags
          // const tagsFilePath = "./assets/tags.txt";
          // fetch(tagsFilePath)
          //   .then((response) => response.text())
          //   .then((data) => {
          //     // Split the content into an array
          //     console.log("----> tags", data);

          //     const items = data.split("\n").filter(Boolean); // Remove any empty lines

          //     // Shuffle and pick 10 random items
          //     const shuffled = items.sort(() => 0.5 - Math.random());
          //     const selectedTags = shuffled.slice(0, 10);

          //     updatedItems[number].tags = selectedTags;
          //   });
        }
      }
    }

    console.log("updatedItems", updatedItems);

    setItems(updatedItems);
  }, []);

  return (
    <div className="App">
      <img src={header_pic_1} width="935px" />
      <img src={header_pic_2} width="935px" />
      <div className="gallery" id="gallery">
        {items &&
          Object.keys(items)
            .reverse()
            .map((key) => {
              console.log("🐎", items[key]);

              const item = items[key];

              return (
                <div key={key} className="gallery-item">
                  {(item.imageHandle && item.imageHandle?.endsWith(".mp4")) ||
                  item.imageHandle?.endsWith(".wav") ||
                  item.imageHandle?.endsWith(".mov") ? (
                    <video
                      src={item.imageHandle}
                      alt={`Video ${key}`}
                      controls
                    />
                  ) : (
                    <img src={item.imageHandle} alt={`Image ${key}`} />
                  )}
                  {item.text}
                  {item.text && (
                    <div className="text-content">
                      {item.text}

                      {/* {tags && tags.length > 0 && <div>{tags.join("\n")}</div>} */}
                    </div>
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default App;
