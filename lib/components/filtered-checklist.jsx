var React = require("react/addons");
var ChecklistItem = require("./checklist-item.jsx");
var Lazy = require('lazy.js');
var SizeBox = require('react-sizebox');

var Checklist = React.createClass({
  render: function() {
    return (
      <ul
        className="rcm-checklist-items"
        style={{height: this.props.height}}>
        {this.props.checklistItems}
      </ul>
    );
  }
});

var FilteredChecklist = React.createClass({
  propTypes: {
    value: React.PropTypes.array,
    filterValue: React.PropTypes.string,
    options: React.PropTypes.array,
    groupBy: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onFilterValueChange: React.PropTypes.func,
  },
  getInitialState: function() {
    return {filteredOptions: this.getFilteredOptions()};
  },
  handleFilterChange: function(event) {
    this.props.onFilterValueChange(event.target.value, function() {
      this.setState({filteredOptions: this.getFilteredOptions()});
    }.bind(this));
    
  },
  clearFilter: function() {
    this.props.onFilterValueChange('', function() {
      this.setState({filteredOptions: this.props.options});
    }.bind(this));
    
  },
  getFilteredOptions: function() {
    var filterValue = String(this.props.filterValue).toLowerCase();
    var filteredOptions = this.props.options.filter(function(opt){
        return (String(opt.label).toLowerCase().indexOf(filterValue) > -1); 
    });
    return filteredOptions;
  },
  getItemsChecked: function() {
    var count = -1;
    var items = this.state.filteredOptions.map(function(opt){
        count ++;
        var checked = this.isChecked(opt);
        return (<ChecklistItem count={count} label={opt.label} checked={checked} value={opt.value} key={opt.value} onChange={this.props.onChange} />);
    }, this);
    
    if(this.props.info) {
      items.push(<li className="rcm-group-info" key="FCINFO">{this.props.info}</li>);
    }

    return items;
  },
  getItemsCheckedGroupBy: function(sortGroupsDescending) {
    var uniqueGroups = Lazy(this.props.options)
                        .pluck(this.props.groupBy)
                        .uniq()
                        .sort(null, sortGroupsDescending)
                        .toArray();
    var checkListItems = uniqueGroups.map(function(group) {
      var groupOptions = this.state.filteredOptions.filter(function(opt) {return opt[this.props.groupBy] === group;}, this);
      var groupOptionElements= Lazy(groupOptions)
                                 .sortBy(this.itemSortBy("label"))
                                 .toArray()
                                 .map(function(opt) {
                                    var checked = this.isChecked(opt);
                                    return (
                                      <ChecklistItem label={opt.label} checked={checked} value={opt.value} key={opt.value} onChange={this.props.onChange} />
                                    );
                                  }, this);

      if(groupOptions.length === 0) {
        return groupOptionElements;
      }

      var heading = (<li className="rcm-group-heading" key={group + " heading"}>{group}</li>);
      groupOptionElements.unshift(heading);

      var groupInfo = this.props.info[group];

      if(groupInfo) {
        groupOptionElements.push(<li className="rcm-group-info" key={group + " info"}>{groupInfo}</li>);
      }

      return groupOptionElements;
    }, this);

    return checkListItems;
  },
  itemSortBy: function(key) {
    return key;
  },
  isChecked: function(option) {
    return (this.props.value.indexOf(option.value) !== -1);
  },
  onFocus: function() {
    React.findDOMNode(this.refs.input).focus();
  },
  render: function() {
    var checklistItems = (this.props.groupBy) ? this.getItemsCheckedGroupBy() : this.getItemsChecked();

    return (
      <div className="rcm-filtered-checklist" tabIndex="0" onFocus={this.onFocus}>
        <div className="header">
          <div className="rcm-filter-box">
            <input  type="text" 
                    ref="input"
                    onChange={this.handleFilterChange} 
                    placeholder="Type to filter..." 
                    value={this.props.filterValue}/>
            <button className="clear-filter" name="clear-filter" onClick={this.clearFilter}>&#215;</button>
          </div>
        </div>
        <div className="content">
          <SizeBox className="overflow-y rsx-SizeBox" heightProp="height">
            <Checklist checklistItems={checklistItems}/>
          </SizeBox>
        </div>
      </div>
    );
  }
});

module.exports = FilteredChecklist;