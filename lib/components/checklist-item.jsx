var React = require("react/addons");

module.exports = React.createClass({
  handleCheckToggle: function(event) {
    this.props.onChange(this.props.value);
  },
  render: function() {
    var checkBoxId = String(this.props.value) + "-" + String(this.props.label);
    return (
      <div className="rcm-checklist-item" onClick={this.handleCheckToggle}>
        <input id={checkBoxId} type="checkbox" checked={this.props.checked} /><label for={checkBoxId}>{this.props.label}</label>
      </div>
    );
  }
});