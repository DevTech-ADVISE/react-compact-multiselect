var React = require("react/addons");
var ReactDropButton = require("react-drop-button");
var DropButton = ReactDropButton.DropButton;
var DropTrigger = ReactDropButton.DropTrigger;
var DropBoxContent = ReactDropButton.DropBoxContent;
var FilteredChecklist = require("./components/filtered-checklist.jsx");
require("./react-compact-multiselect.scss");

var LEFT_ALIGN = ReactDropButton.LEFT_ALIGN;
var BOTTOM_ALIGN = ReactDropButton.BOTTOM_ALIGN;
var RIGHT_ALIGN = ReactDropButton.RIGHT_ALIGN;
module.exports = {};


var ReactCompactMultiselect = React.createClass({
  propTypes: {
    initialValue: React.PropTypes.array,
    layoutMode: React.PropTypes.string,
    closed: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {layoutMode: LEFT_ALIGN};
  },
  getInitialState: function() {
    return {value: []};
  },
  componentWillMount: function() {
    this.setState({value: this.props.initialValue});
  },
  handleCheckToggle: function(optionValue) {
    var newValueState = this.state.value.slice(0);
    var valueIndex = newValueState.indexOf(optionValue);
    if(valueIndex > -1){
        newValueState.splice(valueIndex,1);
    } else {
        newValueState.push(optionValue);
    }

    this.props.onChange(newValueState);
    this.setState({value: newValueState});
  },
  selectAll: function() {
    var allValues = this.props.options.map(function(opt) {return opt.value;});
    this.setState({value: allValues});
  },
  deselectAll: function() {
    this.setState({value: []});
  },
  doneSelecting: function() {
    //Call internal DropButton function to close the drop down
    this.refs.DropButton.toggleDropBox();
  },
  render: function() {
    var selectedCount = (<div className="rcm-selected-count">{this.state.value.length}</div>);
    if(this.state.value.length === 0)
      selectedCount = "";
    return (
      <div className="react-compact-multiselect">
    
        <DropButton layoutMode={this.props.layoutMode} ref="DropButton">
          <DropTrigger>{this.props.label} {selectedCount} </DropTrigger>
          <DropBoxContent>
            <FilteredChecklist 
              options={this.props.options}
              onChange={this.handleCheckToggle}
              value={this.state.value} />
            <div className="select-all" onClick={this.selectAll}><div className="select-all-button">✓</div>Select All</div>
            <div className="remove-all" onClick={this.deselectAll}><div className="deselect-all-button">X</div>Deselect All</div>
            <div className="done-selecting-button" onClick={this.doneSelecting}>Done</div>
          </DropBoxContent>
        </DropButton>
      </div>
    );
  }
});

module.exports.ReactCompactMultiselect = ReactCompactMultiselect;
module.exports.LEFT_ALIGN = LEFT_ALIGN;
module.exports.BOTTOM_ALIGN = BOTTOM_ALIGN;
module.exports.RIGHT_ALIGN = RIGHT_ALIGN;
