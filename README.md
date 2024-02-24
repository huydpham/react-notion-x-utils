# React Notion X Utilities

This package provides utility functions for working with `react-notion-x`. It includes two main functions: `returnCachedIfExist` and `getExtractionTools`.

## Usage

### Function: returnCachedIfExist

This function checks if a page's data exists in the virtual file system. If it does, it returns the data. If it doesn't, it fetches the data, saves it to the virtual file system, and then returns it.

#### Parameters

- `pageId` (string): The ID of the page.
- `dbDataGetter` (function): The function to fetch the page data.

#### Returns

- `Promise<object>`: The page data.

### Function: getExtractionTools

This function returns a set of tools for extracting information from a record map.

#### Parameters

- `recordMap` (object): The record map.

#### Returns

- `blockArray`: An array of blocks.
- `getId`: A function that takes a block and returns its ID.
- `getTitle`: A function that takes a block and returns its title.
- `getCreatedTime`: A function that takes a block and returns its created time.
- `getValue`: A function that takes a block and a name, and returns the value of the property with that name.
- `getDate`: A function that takes a block and a name, and returns the start date of the property with that name.

### Installation

To use these functions in your project, you can import them like this:

```javascript
const { returnCachedIfExist, getExtractionTools } = require('./react-notion-x-utils');
```

Then, you can use them in your code. For example:

```
const pageData = await returnCachedIfExist('pageId', dbDataGetter);
const tools = getExtractionTools(recordMap);
```

## Extra Resources
- This script powers my blog: [https://huy.today/blog/](https://huy.today/blog/)
- Find me at: [https://huy.today/](https://huy.today/)
