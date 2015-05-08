var React = require("react/addons");
var DropButton = require("react-drop-button");
var DropTrigger = DropButton.DropTrigger;
var DropBoxContent = DropButton.DropBoxContent;
var FilteredChecklist = require("./components/filtered-checklist.jsx");
require("./react-compact-multiselect.scss");

var LEFT_ALIGN = DropButton.LEFT_ALIGN;
var BOTTOM_ALIGN = DropButton.BOTTOM_ALIGN;
var RIGHT_ALIGN = DropButton.RIGHT_ALIGN;


var ReactCompactMultiselect = React.createClass({
  statics: {
    LEFT_ALIGN: LEFT_ALIGN,
    BOTTOM_ALIGN: BOTTOM_ALIGN,
    RIGHT_ALIGN: RIGHT_ALIGN
  },
  propTypes: {
    initialValue: React.PropTypes.array,
    layoutMode: React.PropTypes.string,
    onChange: React.PropTypes.func
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

    this.fireValueChange(newValueState);
  },
  selectAll: function() {
    var allValues = this.props.options.map(function(opt) {return opt.value;});
    this.fireValueChange(allValues);
  },
  deselectAll: function() {
    this.fireValueChange([]);
  },
  fireValueChange: function(newValueState) {
    //value can change from the check boxes, or from the select all type buttons
    //make sure state gets propogated above and below
    this.props.onChange(newValueState);
    this.setState({value: newValueState});
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
            <div className="rcm-menu">
              <div className="select-all" onClick={this.selectAll}><div className="select-all-button">✓</div>Select All</div>
              <div className="deselect-all" onClick={this.deselectAll}><div className="deselect-all-button">X</div>Deselect All</div>
              <div className="done-selecting-button" onClick={this.doneSelecting}>Done</div>
            </div>
          </DropBoxContent>
        </DropButton>
      </div>
    );
  }
});

module.exports = ReactCompactMultiselect;
