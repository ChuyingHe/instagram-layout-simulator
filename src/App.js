import logo from "./logo.svg";
import header_pic_1 from "./assets/ins_header_1.png";
import header_pic_2 from "./assets/ins_header_2.png";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  // Import all files from the medium folder
  const importFiles = (requireContext) => {
    return requireContext.keys().map((fileName) => ({
      name: fileName.replace("./", ""), // Remove leading "./"
      path: requireContext(fileName), // Get file path
    }));
  };

  const getContentFromFile = async (txtFile) => {
    let textContent = "";

    try {
      const response = await fetch(txtFile.path);
      if (response.ok) {
        textContent = await response.text();
      } else {
        textContent = ""; // Set to an empty string if the response is not OK
      }
    } catch (error) {
      console.error("Error fetching the file:", error);
      textContent = ""; // Set to an empty string if fetch fails
    }
  };

  useEffect(() => {
    // Import .txt files
    const txtFiles = importFiles(require.context("./medium", false, /\.txt$/));

    // Import .jpg files
    const mediumFiles = importFiles(
      require.context("./medium", false, /\.(png|jpg|jpeg|mp4|wav|mov)$/)
    );

    // Fetch the content of each .txt file and pair it with its image
    const fetchFileContents = async () => {
      const groupedItems = await Promise.all(
        mediumFiles.map(async (mediumFile) => {
          const baseName = mediumFile.name.split(".")[0];
          const txtFile = txtFiles.find((textFile) =>
            textFile.name.startsWith(baseName + ".")
          );

          try {
            // Fetch the content of the .txt file
            let content = "";
            if (txtFile) {
              const response = await fetch(txtFile.path);
              content = response.ok ? await response.text() : null;
            }

            return {
              index: parseInt(baseName),
              text: content || "", // Fallback to empty string if content is null/undefined
              image: mediumFile,
            };
          } catch (error) {
            console.error(`Failed to fetch file: ${txtFile.name}`, error);
            return {
              index: parseInt(baseName),
              text: "", // Fallback in case of fetch failure
              image: mediumFile,
            };
          }
          return null;
        })
      );

      const filteredItems = groupedItems.filter(Boolean);
      const sortedItems = [...filteredItems].sort((a, b) => a.index - b.index);

      setItems(sortedItems); // Filter out null entries
    };

    fetchFileContents();
  }, []);

  return (
    <div className="App">
      <img src={header_pic_1} width="935px" />
      <img src={header_pic_2} width="935px" />
      <div className="gallery" id="gallery">
        {items.length > 0 &&
          items.toReversed().map((item, index) => {
            console.log("🐎", items.length, items[index]);

            const mediumName = item.image.name;
            const mediumPath = item.image.path;

            return (
              <div key={index} className="gallery-item">
                {mediumName.endsWith(".mp4") ||
                mediumName.endsWith(".wav") ||
                mediumName.endsWith(".mov") ? (
                  <video src={mediumPath} alt={`Video ${index}`} controls />
                ) : (
                  <img src={mediumPath} alt={`Image ${index}`} />
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
