var React = require("react");
var ChecklistItem = require("./checklist-item.js");
var Lazy = require('lazy.js');
var SizeBox = require('react-sizebox');
var lunr = require('lunr');

var Checklist = React.createClass({
  render: function() {
    return (
      <ul
        className="rcm-checklist-items"
        style={{height: this.props.height}}>
        {this.props.checklistItems}
      </ul>
    );
  }
});

var FilteredChecklist = React.createClass({
  propTypes: {
    value: React.PropTypes.array,
    filterValue: React.PropTypes.string,
    options: React.PropTypes.array,
    groupBy: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onFilterValueChange: React.PropTypes.func,
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
    var fcThis = this;
		var search = lunr(function() {
			var lunrThis = this;

      if(fcThis.props.groupBy) {
        lunrThis.field(fcThis.props.groupBy, 100);
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

  getFilteredOptions: function() {
    var valueFilter = this.props.filterValue.toLowerCase()
    var options = this.props.options

    return this.props.getFilteredOptions(valueFilter, options)
  },

  getItemsChecked: function() {
    var count = 0;
    var items = this.getFilteredOptions().map(function(opt){
        var checked = this.isChecked(opt);

        return (<ChecklistItem count={count++} label={opt.label} checked={checked} value={opt.value} key={opt.value} onChange={this.props.onChange} />);
    }, this);

    if(this.props.info) {
      items.push(<li className="rcm-group-info" key="FCINFO">{this.props.info}</li>);
    }

    return items;
  },

  getItemsCheckedGroupBy: function(sortGroupsDescending) {
    var uniqueGroups = Lazy(this.props.options)
                        .pluck(this.props.groupBy)
                        .uniq()
                        .sort(null, sortGroupsDescending)
                        .toArray();
    var checkListItems = uniqueGroups.map(function(group) {
      var groupOptions = this.getFilteredOptions().filter(function(opt) {return opt[this.props.groupBy] === group;}, this);
      var groupOptionElements = Lazy(groupOptions)
                                 .uniq('value')
                                 .sortBy("label")
                                 .toArray()
                                 .map(function(opt) {
                                    var checked = this.isChecked(opt);
                                    return (
                                      <ChecklistItem label={opt.label} checked={checked} value={opt.value} key={opt.value} onChange={this.props.onChange} />
                                    );
                                  }, this);

      if(groupOptions.length === 0) {
        return groupOptionElements;
      }

      var heading = (<li className="rcm-group-heading" key={group + " heading"}>{group}</li>);
      groupOptionElements.unshift(heading);

      if(!this.props.info) {
        return groupOptionElements;
      }

      var groupInfo = this.props.info[group];

      if(groupInfo) {
        groupOptionElements.push(<li className="rcm-group-info" key={group + " info"}>{groupInfo}</li>);
      }

      return groupOptionElements;
    }, this);

    return checkListItems;
  },

  isChecked: function(option) {
    return (this.props.value.indexOf(option.value) !== -1);
  },

  render: function() {
    var checklistItems = (this.props.groupBy) ? this.getItemsCheckedGroupBy() : this.getItemsChecked();

    return (
      <div className="content">
        <SizeBox className="overflow-y rsx-SizeBox" heightProp="height">
          <Checklist checklistItems={checklistItems}/>
        </SizeBox>
      </div>
    );
  }
});

module.exports = FilteredChecklist;
