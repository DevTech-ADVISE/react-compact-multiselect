var React = require('react');
var TestUtils = React.addons.TestUtils;
var ReactCompactMultiselect = require('../lib/react-compact-multiselect.jsx');


describe("ReactCompactMultiselect", function() {
  var component;
  var flatTestData = [{value: 1, label: 'One'},
  					  {value: 2, label: 'Two'},
  					  {value: 3, label: 'Three'},
  					  {value: 4, label: 'Four'}];

  var onChangeTestFunc = function(selection){return selection;};
  var testLabel = "Numbers";
  var testDefaultValue = [2,4];

  beforeEach(function() {

    component = TestUtils.renderIntoDocument(
      <ReactCompactMultiselect 
      	options={flatTestData}
      	onChange={onChangeTestFunc}
      	label={testLabel}
      	value={testDefaultValue} />
    );
  });

  it("should render", function() {
    expect(component.getDOMNode().className).toEqual('react-compact-multiselect');
  });

  it("should have the correct label", function() {
  	var labelClassName = 'rcm-label';
    expect(TestUtils.findRenderedDOMComponentWithClass(component, labelClassName).getDOMNode().innerHTML).toEqual(testLabel);
  });

  it("should display a badge indicating number of selected items", function(){
  	var selectedBadgeClassName = 'rcm-selected-count';
  	expect(TestUtils.findRenderedDOMComponentWithClass(component, selectedBadgeClassName).getDOMNode().innerHTML).toEqual(testDefaultValue.length.toString());
  });

  it("should display a drop menu when clicked", function(){
  	var dropMenuClassName = 'rcm-drop-menu';
  	var dropButtonClassName = 'rcm-drop-button';
  	var dropButtonDOMElement = TestUtils.findRenderedDOMComponentWithClass(component, dropButtonClassName);
  	TestUtils.Simulate.click();
  	expect(TestUtils.findRenderedDOMComponentWithClass(component, selectedBadgeClassName).getDOMNode().innerHTML).toEqual(testDefaultValue.length.toString());
  });


});
