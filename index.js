var React = require('react/addons');
var ReactCompactMultiselect = require('./lib/react-compact-multiselect.jsx');


var DemoCompactMultiselect = React.createClass({
  	options: [{value: 1, label: "One"},
  			  {value: 2, label: "Two"},
  			  {value: 3, label: "Three"}, 
  			  {value: 4, label: "Four"}],
  	getInitialState: function() {
  		return {value: []}
  	},
  	handleSelectionChange: function(newValueState) {
  		this.setState({value: newValueState});
  	},
  	render: function() {

  		return (
  			<div>
	  			<div>Selected Values: {this.state.value.join(', ')}</div>
	  			<ReactCompactMultiselect 
	  				options={this.options}
	  				initialValue={this.state.value}
	  				label={"Numbers"} 
	  				onChange={this.handleSelectionChange}
            layoutMode={ReactCompactMultiselect.LEFT_ALIGN} />
  			</div>
  		)
  	}
  });

React.render(
    	<DemoCompactMultiselect />
    	, document.getElementById('main'));