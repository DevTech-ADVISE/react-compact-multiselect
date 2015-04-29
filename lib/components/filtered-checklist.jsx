var React = require("react");
var ChecklistItem = require("./checklist-item.jsx");

module.exports = React.createClass({
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
  render: function() {
    var checklistItems = this.state.filteredOptions.map(function(opt){
        var checked = (this.props.value.indexOf(opt.value)>-1);
        return <ChecklistItem label={opt.label} checked={checked} value={opt.value} onChange={this.props.onChange} />
    }.bind(this));
    return (
    	<div className="rcm-filtered-checklist">
    		<div className="rcm-filter-box">
                <input  type="text" 
                        onChange={this.handleFilterChange} 
                        placeholder="Type to filter..." 
                        value={this.state.filterValue}/>
                </div>
            <div className="rcm-checklist-items">
                {checklistItems}
            </div>
    	</div>
    );
  }
});