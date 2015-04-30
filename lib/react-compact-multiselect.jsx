var React = require("react/addons");
var ReactDropButton = require("react-drop-button");
var DropButton = ReactDropButton.DropButton;
var DropTrigger = ReactDropButton.DropTrigger;
var DropBoxContent = ReactDropButton.DropBoxContent;
var FilteredChecklist = require("./components/filtered-checklist.jsx");


require("./react-compact-multiselect.scss");


module.exports = React.createClass({
  props: {
    initialValue: React.PropTypes.array
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

    this.props.onChange(newValueState);
    this.setState({value: newValueState});
  },
  render: function() {
    return (
    	<div className="react-compact-multiselect">
    		
    		<DropButton >
          <DropTrigger>{this.props.label} <div className="rcm-selected-count">{this.state.value.length}</div></DropTrigger>
          <DropBoxContent>
      			<FilteredChecklist 
      				options={this.props.options}
      				onChange={this.handleCheckToggle}
      				value={this.state.value} />
          </DropBoxContent>
    		</DropButton>
    	</div>
    );
  }
});
