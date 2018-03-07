var React = require("react");
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

 var ChecklistItem = createReactClass({
  propTypes: {
    value: PropTypes.any,
    label: PropTypes.string
  },

  handleCheckToggle: function() {
    this.props.onChange(this.props.value);
  },

  render: function() {
    var checkBoxId = String(this.props.value) + "-" + String(this.props.label);
    
    return (
      <li className="rcm-checklist-item" onClick={this.handleCheckToggle}>
        <input id={checkBoxId} type="checkbox" checked={this.props.checked} readOnly="true"/><label>{this.props.label}</label>
      </li>
    );
  }
});

 module.exports = ChecklistItem;
