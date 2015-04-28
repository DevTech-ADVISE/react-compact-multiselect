var React = require("react");
var DropButton = require("react-drop-button");
var FilteredChecklist = require("./components/filtered-checklist.jsx");


require("./react-compact-multiselect.scss");


module.exports = React.createClass({
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

    this.props.onChange(newValueState);
    this.setState({value: newValueState});
  },
  render: function() {
    return (
    	<div className="react-compact-multiselect">
    		<div className="rcm-selected-count">{this.state.value.length}</div>
    		<DropButton label={this.props.label}>
    			<FilteredChecklist 
    				options={this.props.options}
    				onChange={this.handleCheckToggle}
    				value={this.state.value}
    			/>
    		</DropButton>
    	</div>
    );
  }
});
