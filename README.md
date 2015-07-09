# react-compact-multiselect [![Build Status](https://travis-ci.org/BI/react-compact-multiselect.png)](https://travis-ci.org/BI/react-compact-multiselect)

A "multi select" to select and filter on items in a check list. This component makes use of the [React-drop-button](https://github.com/BI/react-drop-button). The multi select also includes UI improvements to the multi select including Select All, Deselect All, and the Done button. [Demo It](http://BI.github.io/react-compact-multiselect)

#Properties

* **options**: (Array of Objects each with the value and label properties) These options will be displayed as check items. 
* **initialValue**: (Array of values) The initial values selected in the multi select. Usually set this to [].
* **label**: (String) The value that will get displayed in the heading(Drop Trigger).
* **onChange**: (Function) A callback that recieved the Values whenever any value is selected or deselected in the multi select. 

###Optional
* **groupBy**: (key) Group objects in the list by a 'group' determined by your specificied key. The options data must now also include data with this key property.
* **layoutMode**: (Layout choice) The layout orientation for the drop box content. Choices are CompactMultiSelect.ALIGN_CONTENT_SE, CompactMultiSelect.ALIGN_CONTENT_NE, CompactMultiSelect.ALIGN_CONTENT_SW, CompactMultiSelect.ALIGN_CONTENT_NW. The default position is South East meaning the content pops out from the bottom left of the DropButton. 

JSX
```js
<ReactCompactMultiSelect
	options={optionsArray}
	initialValue={[]}
	label={"TV shows"}
	onChange={handleSelectionChangeFunc} />
```

## Development

* Development server `npm run dev`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
