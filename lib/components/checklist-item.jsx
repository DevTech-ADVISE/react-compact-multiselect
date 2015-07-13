var React = require("react/addons");

 var ChecklistItem = React.createClass({
  propTypes: {
    value: React.PropTypes.any,
    label: React.PropTypes.string, 
    count: React.PropTypes.number
  },
  handleCheckToggle: function() {
    this.props.onChange(this.props.value);
  },
  render: function() {
    var checkBoxId = String(this.props.value) + "-" + String(this.props.label);
    return (
      <li ref={"rcm-item-" + this.props.count} className="rcm-checklist-item" onClick={this.handleCheckToggle}>
        <input id={checkBoxId} type="checkbox" checked={this.props.checked} readOnly="true"/><label>{this.props.label}</label>
      </li>
    );
  }
});

 module.exports = ChecklistItem;