var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var ReactCompactMultiselect = require('../lib/react-compact-multiselect.jsx');
var testData = require('js-test-data');

describe("ReactCompactMultiselect", function() {
  var component, onChangeValues;

  var onChangeTestFunc = function(selection){onChangeValues = selection;};
  var testLabel = "TV Shows";
  var labelClassName = 'rcm-label';
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
  	var selectedBadgeClassName = 'rcm-selected-count';
  	expect(TestUtils.findRenderedDOMComponentWithClass(component, selectedBadgeClassName).getDOMNode().innerHTML).toEqual(testDefaultValue.length.toString());
  });


});
