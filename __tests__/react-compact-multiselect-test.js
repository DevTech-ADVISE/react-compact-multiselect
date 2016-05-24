jest.unmock('../dist/react-compact-multiselect.js');
jest.unmock('js-test-data');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var ReactCompactMultiselect = require('../dist/react-compact-multiselect');
var testData = require('js-test-data');

describe("ReactCompactMultiselect", function() {
  var component, onChangeValues, domNode;

  var onChangeTestFunc = function(selection){onChangeValues = selection;};
  var testLabel = "TV Shows";
  var labelClassName = 'rcm-label';
  var selectedBadgeClassName = 'rcm-selected-count';
  // var defaultSelectedOptions = [];
  var defaultSelectedOptions = testData.TVShows.slice(0, 4).map(function(option){return option.value;}); //array of values 0-3, not including 4
  
  beforeEach(function() {

    component = TestUtils.renderIntoDocument(
      <ReactCompactMultiselect 
        options={testData.TVShows}
        onChange={onChangeTestFunc}
        label={testLabel}
        initialValue={defaultSelectedOptions} />
    );
    domNode = ReactDOM.findDOMNode(component);
  });

  it("should render", function() {
    expect(ReactDOM.findDOMNode(component)).toBeDefined();
  });

  it("should have the correct label", function() {
    
    expect(TestUtils.findRenderedDOMComponentWithClass(component, labelClassName).innerHTML).toEqual(testLabel);
  });

  it("should display a badge indicating number of selected items", function(){
    
    expect(TestUtils.findRenderedDOMComponentWithClass(component, selectedBadgeClassName).innerHTML).toEqual(defaultSelectedOptions.length.toString());
  });

  it("should not display a badge if there are no selected items", function() {
    component.setState({value: []});
    expect(domNode.getElementsByClassName(selectedBadgeClassName)[0]).toBeUndefined();
  });

  describe("filtering and selected items", function() {
    beforeEach(function() {
      //MUST OPEN DROP BOX FIRST
      TestUtils.Simulate.click(domNode.getElementsByClassName('rdb-button')[0]);
    });

    // it("should display unselected options as unchecked", function() {
    //   var unselectedOptions = testData.TVShows.filter(function(show) {
    //     return defaultSelectedOptions.indexOf(show.value) === -1;
    //   });

    //   domNode = ReactDOM.findDOMNode(component);
    //   var renderedItems = domNode.getElementsByClassName('rcm-checklist-item');


    //   unselectedOptions.forEach(function(opt) {
    //     var unselectedCheckBox = renderedItems.namedItem(opt.value + "-" + opt.label);
    //     expect(unselectedCheckBox.checked).toBe(false);
    //   });
    // });

  //   it("should display selected options as checked", function() {
  //     var selectedOptions = testData.TVShows.filter(function(show) {
  //       return defaultSelectedOptions.indexOf(show.value) !== -1;
  //     });

  //     selectedOptions.forEach(function(opt) {
  //       var renderedItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rcm-checklist-item');

  //       var selectedCheckBox = renderedItems.filter(function(item) {
  //         return TestUtils.findRenderedDOMComponentWithTag(item, 'input').getDOMNode().id.indexOf(opt.value + "-" + opt.label) !== -1;
  //       })[0];

  //       expect(TestUtils.findRenderedDOMComponentWithTag(selectedCheckBox, 'input').getDOMNode().checked).toBe(true);
  //     });
  //   });

  //   it("should filter the rendered items based on the filter input", function() {
  //     //set the state of the input to "ch", which should render only items containing "ch"
  //     //Chappelle's show and Charmed 
  //     var textInput = TestUtils.findRenderedDOMComponentWithClass(component, "rcm-filter-box").getDOMNode().getElementsByTagName('input')[0];
  //     TestUtils.Simulate.change(textInput, {target: {value: "ch"}});

  //     var renderedItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rcm-checklist-item');

  //     expect(renderedItems.length).toBe(2);
  //     renderedItems.forEach(function(item) {
  //       expect(TestUtils.findRenderedDOMComponentWithTag(item, 'input').getDOMNode().id.toLowerCase().indexOf("ch")).not.toBe(-1);
  //     });

  //   });

  //   it("should clear the filter input and unfilter the select list when the X button is clicked", function() {
  //     var textInput = TestUtils.findRenderedDOMComponentWithClass(component, "rcm-filter-box").getDOMNode().getElementsByTagName('input')[0];
  //     TestUtils.Simulate.change(textInput, {target: {value: "remove me"}});
  //     var renderedItemsBefore = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rcm-checklist-item');
  //     expect(renderedItemsBefore.length).toBe(0);

  //     var xButton = TestUtils.findRenderedDOMComponentWithClass(component, 'clear-filter').getDOMNode();
  //     TestUtils.Simulate.click(xButton);
  //     expect(component.refs.FilteredCheckList.props.filterValue).toBe("");

  //     var renderedItemsAfter = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rcm-checklist-item');
  //     expect(renderedItemsAfter.length).toBe(testData.TVShows.length);
  //   });

  //   it("should select all options when Select all is clicked", function() {
  //     TestUtils.Simulate.click(component.refs["rcm-select-all"].getDOMNode());
  //     var renderedItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rcm-checklist-item');
  //     renderedItems.forEach(function(item) {
  //       expect(TestUtils.findRenderedDOMComponentWithTag(item, 'input').getDOMNode().checked).toBe(true);
  //     });
  //   });

  //   it("should deselect all options when Deselect all is clicked", function() {
  //     TestUtils.Simulate.click(component.refs["rcm-deselect-all"].getDOMNode());
  //     var renderedItems = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rcm-checklist-item');
  //     renderedItems.forEach(function(item) {
  //       expect(TestUtils.findRenderedDOMComponentWithTag(item, 'input').getDOMNode().checked).toBe(false);
  //     });
  //   });

  //   it("should close the drop box when Done is clicked", function() {
  //     TestUtils.Simulate.click(component.refs["rcm-done"].getDOMNode());
  //     expect(component.refs.DropButton.state.open).toBe(false);
  //   });
  });

});
