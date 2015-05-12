var React = require('react/addons');
var ReactCompactMultiselect = require('./lib/react-compact-multiselect.jsx');


var DemoCompactMultiselect = React.createClass({
  	options: [{value: 1, label: "South Park", network: "Comedy Central"},
  			  {value: 2, label: "All That", network: "Nickelodeon"},
  			  {value: 3, label: "Buffy", network: "WB"}, 
  			  {value: 4, label: "Charmed", network: "WB"},
          {value: 5, label: "Supernatural", network: "WB"},
          {value: 6, label: "Chappelle's show", network: "Comedy Central"},
          {value: 7, label: "The Daily Show", network: "Comedy Central"},
          {value: 8, label: "Sponge Bob", network: "Nickelodeon"},
          {value: 9, label: "Dora the Explorer", network: "Nickelodeon"},
          {value: 10, label: "Doug", network: "Nickelodeon"},
          {value: 11, label: "The Ren & Stimpy Show", network: "Nickelodeon"},
          {value: 12, label: "7th Heaven", network: "WB"}],
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
	  				label={"Tv Shows"} 
            groupBy={"network"}
	  				onChange={this.handleSelectionChange}
            layoutMode={ReactCompactMultiselect.ALIGN_CONTENT_SE} />
  			</div>
  		)
  	}
  });

React.render(
    	<DemoCompactMultiselect />
    	, document.getElementById('main'));