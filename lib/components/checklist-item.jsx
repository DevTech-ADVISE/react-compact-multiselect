var React = require("react");

module.exports = React.createClass({
  handleCheckToggle: function(event) {
    this.props.onChange(this.props.value);
  },
  render: function() {
    return (
    	<div className="rcm-checklist-item">
    		<input type="checkbox" checked={this.props.checked} onChange={this.handleCheckToggle}/> <span>{this.props.label}</span>
    	</div>
    );
  }
});