var React = require("react/addons");
var ChecklistItem = require("./checklist-item.jsx");
var Lazy = require('lazy.js');

module.exports = React.createClass({
  propTypes: {
    value: React.PropTypes.array,
    options: React.PropTypes.array,
    groupBy: React.PropTypes.string,
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
    this.setState({filteredOptions: filteredOptions, filterValue: String(event.target.value)});
  },
  clearFilter: function() {
    this.setState({filteredOptions: this.props.options, filterValue: ''});
  },
  getItemsChecked: function() {
    var count = -1;
    return this.state.filteredOptions.map(function(opt){
        count ++;
        var checked = this.isChecked(opt);
        return (<ChecklistItem count={count} label={opt.label} checked={checked} value={opt.value} onChange={this.props.onChange} />);
    }.bind(this));
    
  },
  getItemsCheckedGroupBy: function(sortGroupsDescending) {
    var uniqueGroups = Lazy(this.props.options)
                        .pluck(this.props.groupBy)
                        .uniq()
                        .sort(null, sortGroupsDescending)
                        .toArray();
    var checkListItems = uniqueGroups.map(function(group) {
      var groupOptions = this.state.filteredOptions.filter(function(opt) {return opt[this.props.groupBy] === group;}.bind(this));
      var groupOptionElements= Lazy(groupOptions)
                                 .sortBy(this.itemSortBy("label"))
                                 .toArray()
                                 .map(function(opt) {
                                    var checked = this.isChecked(opt);
                                    return (
                                      <ChecklistItem label={opt.label} checked={checked} value={opt.value} onChange={this.props.onChange} />
                                    );
                                  }.bind(this));
      if(groupOptions.length > 0) {
        var heading = (<li className="rcm-group-heading">{group}</li>);
        groupOptionElements.splice(0, 0, heading);
      }
      

      return groupOptionElements;
    }.bind(this));

    return checkListItems;
  },
  itemSortBy: function(key) {
    return key;
  },
  isChecked: function(option) {
    return (this.props.value.indexOf(option.value) !== -1);
  },
  render: function() {
    var checklistItems = (this.props.groupBy) ? this.getItemsCheckedGroupBy() : this.getItemsChecked();

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