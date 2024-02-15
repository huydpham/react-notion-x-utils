import { fs } from "memfs";

export async function returnCachedIfExist(pageId, dbDataGetter) {
  const filePath = `/${pageId}.json`;

  try {
    // Check if the file exists in the virtual file system
    if (fs.existsSync(filePath)) {
      // If the file exists, read its content and return it
      const content = fs.readFileSync(filePath, "utf8");
      return JSON.parse(content);
    } else {
      // If the file does not exist, fetch the page data
      const dbData = await dbDataGetter(pageId);

      // Save the fetched data to the virtual file
      fs.writeFileSync(filePath, JSON.stringify(dbData), "utf8");

      // Return the fetched data
      return dbData;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

export function getExtractionTools(recordMap) {
  // Begin
  const dbId = Object.keys(recordMap.collection_query)[0];
  const dbViewId = Object.keys(recordMap.collection_query[dbId])[0];
  const blockIdsArray =
    recordMap.collection_query[dbId]?.[dbViewId]?.collection_group_results
      ?.blockIds || [];
  const blockArray = blockIdsArray.map((id) => recordMap.block[id].value);

  // Function
  function getKeyByName(name) {
    const schema = recordMap.collection[dbId].value.schema;
    let k = null;
    for (const key in schema) {
      if (schema.hasOwnProperty(key) && schema[key].name === name) {
        k = key;
      }
    }
    if (!k) throw "Unknown key";
    return k;
  }

  return {
    blockArray,
    getId: (block) => block.id,
    getTitle: (block) => block.properties?.title?.[0]?.[0] || "",
    getCreatedTime: (block) => block.created_time,
    getValue: (block, name) => block.properties?.[getKeyByName(name)]?.[0]?.[0],
    getDate: (block, name) =>
      block.properties?.[getKeyByName(name)]?.[0]?.[1]?.[0]?.[1]?.start_date,
  };
}
