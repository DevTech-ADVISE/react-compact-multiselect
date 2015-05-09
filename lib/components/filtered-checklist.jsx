var React = require("react/addons");
var ChecklistItem = require("./checklist-item.jsx");

var SELECT_ALL = "SELECT_ALL";
var DESELECT_ALL = "DESELECT_ALL";

module.exports = React.createClass({
  propTypes: {
    value: React.PropTypes.array,
    options: React.PropTypes.array,
    onChange: React.PropTypes.func,
  },
  getInitialState: function() {
    return {filteredOptions: this.props.options, filterValue: ''};
  },
  handleFilterChange: function(event) {
    var filterValue = String(event.target.value).toLowerCase();
    var filteredOptions = this.props.options.filter(function(opt){
        return (String(opt.label).toLowerCase().indexOf(filterValue) > -1); 
    });
    this.setState({filteredOptions: filteredOptions, filterValue: filterValue});
  },
  clearFilter: function() {
    this.setState({filteredOptions: this.props.options, filterValue: ''});
  },
  getItemsChecked: function() {

    return this.state.filteredOptions.map(function(opt){
        var checked = (this.props.value.indexOf(opt.value)>-1);

        return <ChecklistItem label={opt.label} checked={checked} value={opt.value} onChange={this.props.onChange} />
    }.bind(this));
    
  },
  render: function() {
    var checklistItems = this.getItemsChecked();

    return (
      <div className="rcm-filtered-checklist">
        <div className="rcm-filter-box">
          <input  type="text" 
                  onChange={this.handleFilterChange} 
                  placeholder="Type to filter..." 
                  value={this.state.filterValue}/>
          <button className="clear-filter" name="clear-filter" onClick={this.clearFilter}>&#215;</button>
        </div>
        
        <ul className="rcm-checklist-items">
          {checklistItems}
        </ul>
      </div>
    );
  }
});