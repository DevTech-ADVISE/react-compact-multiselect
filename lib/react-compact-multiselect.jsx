var React = require("react/addons");
var DropButton = require("react-drop-button");
var DropTrigger = DropButton.DropTrigger;
var DropBoxContent = DropButton.DropBoxContent;
var FilteredChecklist = require("./components/filtered-checklist.jsx");
require("./react-compact-multiselect.scss");

var ALIGN_CONTENT_SE = DropButton.ALIGN_CONTENT_SE;
var ALIGN_CONTENT_NE = DropButton.ALIGN_CONTENT_NE;
var ALIGN_CONTENT_SW = DropButton.ALIGN_CONTENT_SW;
var ALIGN_CONTENT_NW = DropButton.ALIGN_CONTENT_NW;


var ReactCompactMultiselect = React.createClass({
  statics: {
    ALIGN_CONTENT_SE: ALIGN_CONTENT_SE,
    ALIGN_CONTENT_NE: ALIGN_CONTENT_NE,
    ALIGN_CONTENT_SW: ALIGN_CONTENT_SW,
    ALIGN_CONTENT_NW: ALIGN_CONTENT_NW
  },

  propTypes: {
    label: React.PropTypes.string,
    options: React.PropTypes.array,
    initialValue: React.PropTypes.array,
    layoutMode: React.PropTypes.string,
    groupBy: React.PropTypes.string,
    onChange: React.PropTypes.func,
    info: React.PropTypes.any
  },

  getDefaultProps: function() {
    return {
      layoutMode: ALIGN_CONTENT_SE,
      info: {}
    };
  },

  getInitialState: function() {
    return {value: [], filterValue: ''};
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
    var filterValue = String(this.state.filterValue).toLowerCase();
    var currentValues = this.state.value;

    var allValues = this.props.options.filter(function(opt) {
        return (String(opt.label).toLowerCase().indexOf(filterValue) > -1); 
    })
    .map(function(opt) {return opt.value;})
    .filter(function(opt) { return currentValues.indexOf(opt) === -1; });

    this.fireValueChange(currentValues.concat(allValues));
  },

  deselectAll: function() {
    var filterValue = String(this.state.filterValue).toLowerCase();
    var currentValues = this.state.value;

    var filteredValues = this.props.options.filter(function(opt) {
        return (String(opt.label).toLowerCase().indexOf(filterValue) > -1); 
    })
    .map(function(opt) {return opt.value;});

    currentValues = currentValues.filter(function(opt) { return filteredValues.indexOf(opt) === -1; });

    this.fireValueChange(currentValues);
  },

  fireValueChange: function(newValueState) {
    //value can change from the check boxes, or from the select all type buttons
    //make sure state gets propogated above and below
    this.props.onChange(newValueState);
    this.setState({value: newValueState});
  },

  filterValueChange: function(event) {
    this.setState({filterValue: event.target.value});
  },

  doneSelecting: function() {
    //Call internal DropButton function to close the drop down
    this.refs.DropButton.toggleDropBox();
  },

  focusChecklist: function() {
    React.findDOMNode(this.refs.FilteredCheckList).focus();
  },

  clearFilter: function() {
    this.setState({filterValue: ""});
  },

  render: function() {
    var selectedCount = "";

    if(this.state.value.length !== 0)
      selectedCount = (<span className="rcm-selected-count">{this.state.value.length}</span>);

    var label = (<span className="rcm-label">{this.props.label}</span>);

    return (
      <div className="react-compact-multiselect">
        <DropButton layoutMode={this.props.layoutMode} onOpen={this.focusChecklist} ref="DropButton" label={label}>
          <DropTrigger>{label} {selectedCount} </DropTrigger>
          <DropBoxContent>
            <div className="fluid-layout">
              <div className="header">
                <div className="rcm-filter-box">
                  <input  type="text" 
                          ref="input"
                          onChange={this.filterValueChange} 
                          placeholder="Type to filter..." 
                          value={this.state.filterValue}/>
                  <button className="clear-filter" name="clear-filter" onClick={this.clearFilter}>&#215;</button>
                </div>
              </div>
              <FilteredChecklist 
                ref="FilteredCheckList"
                options={this.props.options}
                groupBy={this.props.groupBy}
                info={this.props.info}
                onChange={this.handleCheckToggle}
                onFilterValueChange={this.filterValueChange}
                value={this.state.value}
                filterValue={this.state.filterValue} />
              <div className="footer">
                <div className="rcm-menu">
                  <button ref="rcm-select-all" className="select-all" name="select-all" onClick={this.selectAll}><span>Select All</span></button>
                  <button ref="rcm-deselect-all" className="deselect-all" name="deselect-all" onClick={this.deselectAll}><span>Deselect All</span></button>
                  <button ref="rcm-done" className="done-selecting-button" name="done" onClick={this.doneSelecting}>Done</button>
                </div>
              </div>
            </div>
          </DropBoxContent>
        </DropButton>
      </div>
    );
  }
});

module.exports = ReactCompactMultiselect;
