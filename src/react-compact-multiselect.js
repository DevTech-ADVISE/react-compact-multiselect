var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var DropButton = require('react-drop-button');
var DropTrigger = DropButton.DropTrigger;
var DropBoxContent = DropButton.DropBoxContent;
var FilteredChecklist = require('./components/filtered-checklist.js');
var lunr = require('lunr')
require('./react-compact-multiselect.scss');

var ALIGN_CONTENT_SE = DropButton.ALIGN_CONTENT_SE;
var ALIGN_CONTENT_NE = DropButton.ALIGN_CONTENT_NE;
var ALIGN_CONTENT_SW = DropButton.ALIGN_CONTENT_SW;
var ALIGN_CONTENT_NW = DropButton.ALIGN_CONTENT_NW;

var ReactCompactMultiselect = createReactClass({
  statics: {
    ALIGN_CONTENT_SE: ALIGN_CONTENT_SE,
    ALIGN_CONTENT_NE: ALIGN_CONTENT_NE,
    ALIGN_CONTENT_SW: ALIGN_CONTENT_SW,
    ALIGN_CONTENT_NW: ALIGN_CONTENT_NW
  },

  propTypes: {
    label: PropTypes.string,
    options: PropTypes.array,
    selectedValues: PropTypes.array,
    onSelectionChange: PropTypes.func,
    filterValue: PropTypes.string,
    onFilterValueChange: PropTypes.func,
    onClearFilter: PropTypes.func,
    layoutMode: PropTypes.string,
    groupBy: PropTypes.string,
    onChange: PropTypes.func,
    info: PropTypes.any
  },

  getDefaultProps: function() {
    return {
      layoutMode: ALIGN_CONTENT_SE
    };
  },

  componentWillMount: function() {
		this.blankSearch()
  },

	componentWillUpdate: function() {
		this.blankSearch()
	},

  blankSearch: function() {
		this.search = null
	},

	getSearch: function() {
		if (!this.search) {
			this.search = this.makeSearch()
			this.fillSearch(this.search, this.props.options)
		}

		return this.search
	},

	makeSearch: function() {
    var rcmThis = this;
		var search = lunr(function() {
			var lunrThis = this;

      if(rcmThis.props.groupBy) {
        lunrThis.field(rcmThis.props.groupBy, 100);
      }

      lunrThis.field('label', 10);
      lunrThis.field('value', 1);

      lunrThis.pipeline.remove(lunr.stemmer)
      lunrThis.pipeline.remove(lunr.stopWordFilter)

			lunrThis.ref('value');
		})

		return search;
	},

	fillSearch: function(search, options) {
		options.forEach(function (opt) {
			search.add(opt)
		})
	},

  getFilteredOptions: function(filterValue, options) {
		if(!filterValue) {
			return options
		}

		var results = this.getSearch().search(filterValue)

		var optionMap = {}
		options.forEach(function (opt) {
			var ref = opt.value
			optionMap[ref] = opt
		}, this)

		return results.map(function(r) {
			return optionMap[r.ref]
		})
  },

  handleCheckToggle: function(optionValue) {
    var newValueState = this.props.selectedValues.slice(0);
    var valueIndex = newValueState.indexOf(optionValue);

    if(valueIndex > -1){
        newValueState.splice(valueIndex,1);
    } else {
        newValueState.push(optionValue);
    }

    this.fireValueChange(newValueState);
  },

  selectAll: function() {
    var filterValue = String(this.props.filterValue).toLowerCase();
    var currentValues = this.props.selectedValues;

    var allValues = this.getFilteredOptions(filterValue, this.props.options)
    .map(function(opt) {return opt.value;})
    .filter(function(opt) { return currentValues.indexOf(opt) === -1; });

    this.fireValueChange(currentValues.concat(allValues));
  },

  deselectAll: function() {
    var filterValue = String(this.props.filterValue).toLowerCase();
    var currentValues = this.props.selectedValues;

    var filteredValues = this.getFilteredOptions(filterValue, this.props.options)
    .map(function(opt) {return opt.value;});

    currentValues = currentValues.filter(function(opt) { return filteredValues.indexOf(opt) === -1; });

    this.fireValueChange(currentValues);
  },

  fireValueChange: function(newValueState) {
    //value can change from the check boxes, or from the select all type buttons
    //make sure state gets propogated above and below
    this.props.onSelectionChange(newValueState);
  },

  filterValueChange: function(event) {
    this.props.onFilterValueChange(event.target.value)
  },

  doneSelecting: function() {
    //Call internal DropButton function to close the drop down
    this.refs.DropButton.toggleDropBox();
  },

  focusChecklist: function() {
    ReactDOM.findDOMNode(this.refs.FilteredCheckList).focus();
  },

  clearFilter: function() {
    this.props.onClearFilter()
  },

  render: function() {
    var selectedCount = '';

    if(this.props.selectedValues.length !== 0)
      selectedCount = (<span className='rcm-selected-count'>{this.props.selectedValues.length}</span>);

    var label = (<span className='rcm-label'>{this.props.label}</span>);

    return (
      <div className='react-compact-multiselect'>
        <DropButton layoutMode={this.props.layoutMode} onOpen={this.focusChecklist} ref='DropButton' label={label}>
          <DropTrigger>{label} {selectedCount} </DropTrigger>
          <DropBoxContent>
            <div className='fluid-layout'>
              <div className='header'>
                <div className='rcm-filter-box'>
                  <input
                    type='text'
                    ref='input'
                    onChange={this.filterValueChange}
                    placeholder='Type to filter...'
                    value={this.props.filterValue}
                  />
                  <button className='clear-filter' name='clear-filter' onClick={this.clearFilter}>&#215;</button>
                </div>
              </div>
              <FilteredChecklist
                ref='FilteredCheckList'
                options={this.props.options}
                groupBy={this.props.groupBy}
                info={this.props.info}
                onChange={this.handleCheckToggle}
                onFilterValueChange={this.filterValueChange}
                getFilteredOptions={this.getFilteredOptions}
                value={this.props.selectedValues}
                filterValue={this.props.filterValue} />
              <div className='footer'>
                <div className='rcm-menu'>
                  <button ref='rcm-select-all' className='select-all' name='select-all' onClick={this.selectAll}><span>Select All</span></button>
                  <button ref='rcm-deselect-all' className='deselect-all' name='deselect-all' onClick={this.deselectAll}><span>Deselect All</span></button>
                  <button ref='rcm-done' className='done-selecting-button' name='done' onClick={this.doneSelecting}>Done</button>
                </div>
              </div>
            </div>
          </DropBoxContent>
        </DropButton>
      </div>
    );
  }
});

module.exports = ReactCompactMultiselect;
