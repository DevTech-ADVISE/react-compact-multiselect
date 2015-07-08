var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var ReactCompactMultiselect = require('../lib/react-compact-multiselect.jsx');
var testData = require('js-test-data');

describe("ReactCompactMultiselect", function() {
  var component, onChangeValues;

  var onChangeTestFunc = function(selection){onChangeValues = selection;};
  var testLabel = "TV Shows";
  var labelClassName = 'rcm-label';
  var selectedBadgeClassName = 'rcm-selected-count';
  // var testDefaultValue = [];
  var testDefaultValue = testData.TVShows.slice(0, 4).map(function(option){return option.value;}); //array of values 0-3, not including 4
  
  beforeEach(function() {

    component = TestUtils.renderIntoDocument(
      <ReactCompactMultiselect 
      	options={testData.TVShows}
      	onChange={onChangeTestFunc}
      	label={testLabel}
      	initialValue={testDefaultValue} />
    );
  });

  it("should render", function() {
    expect(component.getDOMNode().className).toEqual('react-compact-multiselect');
  });

  it("should have the correct label", function() {
  	
    expect(TestUtils.findRenderedDOMComponentWithClass(component, labelClassName).getDOMNode().innerHTML).toEqual(testLabel);
  });

  it("should display a badge indicating number of selected items", function(){
  	
  	expect(TestUtils.findRenderedDOMComponentWithClass(component, selectedBadgeClassName).getDOMNode().innerHTML).toEqual(testDefaultValue.length.toString());
  });

  it("should not display a badge if there are no selected items", function() {
  	component.setState({value: []});
  	expect(component.getDOMNode().getElementsByClassName(selectedBadgeClassName)[0]).toBeUndefined();
  });

  describe("filtering and selected items", function() {
  	beforeEach(function() {
  		//MUST OPEN DROP BOX FIRST
  		TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component,'rdb-button').getDOMNode());
  	});

	  it("should display unselected options as unchecked", function() {
	  	var unselectedOptions = testData.TVShows.filter(function(show) {
	  		return testDefaultValue.indexOf(show.value) === -1;
	  	});

	  	unselectedOptions.forEach(function(opt) {
	  		var renderedItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rcm-checklist-item');
	  	
	  		var unselectedCheckBox = renderedItems.filter(function(item) {
	  			return TestUtils.findRenderedDOMComponentWithTag(item, 'input').getDOMNode().id.indexOf(opt.value + "-" + opt.label) !== -1;
	  		})[0];

	  		expect(TestUtils.findRenderedDOMComponentWithTag(unselectedCheckBox, 'input').getDOMNode().checked).toBe(false);
	  	});
  	});

  	it("should display selected options as checked", function() {
  		var selectedOptions = testData.TVShows.filter(function(show) {
	  		return testDefaultValue.indexOf(show.value) !== -1;
	  	});

	  	selectedOptions.forEach(function(opt) {
	  		var renderedItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rcm-checklist-item');

	  		var selectedCheckBox = renderedItems.filter(function(item) {
	  			return TestUtils.findRenderedDOMComponentWithTag(item, 'input').getDOMNode().id.indexOf(opt.value + "-" + opt.label) !== -1;
	  		})[0];

				expect(TestUtils.findRenderedDOMComponentWithTag(selectedCheckBox, 'input').getDOMNode().checked).toBe(true);
	  	});
  	});

  	it("should filter the rendered items based on the filter input", function() {
  		//set the state of the input to "ch", which should render only items containing "ch"
  		//Chappelle's show and Charmed 
  		var textInput = TestUtils.findRenderedDOMComponentWithClass(component, "rcm-filter-box").getDOMNode().getElementsByTagName('input')[0];
  		TestUtils.Simulate.change(textInput, {target: {value: "ch"}});

  		var renderedItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rcm-checklist-item');

  		expect(renderedItems.length).toBe(2);
  		renderedItems.forEach(function(item) {
  			expect(TestUtils.findRenderedDOMComponentWithTag(item, 'input').getDOMNode().id.toLowerCase().indexOf("ch")).not.toBe(-1);
  		});

  	});

  	it("should clear the filter input and unfilter the select list when the X button is clicked", function() {
  		var textInput = TestUtils.findRenderedDOMComponentWithClass(component, "rcm-filter-box").getDOMNode().getElementsByTagName('input')[0];
  		TestUtils.Simulate.change(textInput, {target: {value: "remove me"}});
  		var renderedItemsBefore = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rcm-checklist-item');
  		expect(renderedItemsBefore.length).toBe(0);

  		var xButton = TestUtils.findRenderedDOMComponentWithClass(component, 'clear-filter').getDOMNode();
  		TestUtils.Simulate.click(xButton);
  		expect(component.refs.FilteredCheckList.props.filterValue).toBe("");

  		var renderedItemsAfter = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rcm-checklist-item');
  		expect(renderedItemsAfter.length).toBe(testData.TVShows.length);
  	});

  	it("should select all options when Select all is clicked", function() {
  		TestUtils.Simulate.click(component.refs["rcm-select-all"].getDOMNode());
  		var renderedItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rcm-checklist-item');
  		renderedItems.forEach(function(item) {
  			expect(TestUtils.findRenderedDOMComponentWithTag(item, 'input').getDOMNode().checked).toBe(true);
  		});
  	});

  	it("should deselect all options when Deselect all is clicked", function() {
  		TestUtils.Simulate.click(component.refs["rcm-deselect-all"].getDOMNode());
  		var renderedItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rcm-checklist-item');
  		renderedItems.forEach(function(item) {
  			expect(TestUtils.findRenderedDOMComponentWithTag(item, 'input').getDOMNode().checked).toBe(false);
  		});
  	});

  	it("should close the drop box when Done is clicked", function() {
  		TestUtils.Simulate.click(component.refs["rcm-done"].getDOMNode());
  		expect(component.refs.DropButton.state.open).toBe(false);
  	});
  });

});
