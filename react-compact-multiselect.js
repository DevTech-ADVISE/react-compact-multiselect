(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactCompactMultiselect"] = factory(require("React"));
	else
		root["ReactCompactMultiselect"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2);
	var ReactDropButton = __webpack_require__(4);
	var DropButton = ReactDropButton.DropButton;
	var FilteredChecklist = __webpack_require__(3);


	__webpack_require__(5);


	module.exports = React.createClass({displayName: "exports",
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
	    	React.createElement("div", {className: "react-compact-multiselect"}, 
	    		React.createElement("div", {className: "rcm-selected-count"}, this.state.value.length), 
	    		React.createElement(DropButton, {label: this.props.label}, 
	        "khkj", 
	    			React.createElement(FilteredChecklist, {
	    				options: this.props.options, 
	    				onChange: this.handleCheckToggle, 
	    				value: this.state.value}
	    			)
	    		)
	    	)
	    );
	  }
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2);
	var ChecklistItem = __webpack_require__(7);

	module.exports = React.createClass({displayName: "exports",
	  getInitialState: function() {
	    return {filteredOptions: this.props.options, filterValue: ''};
	  },
	  handleFilterChange: function(event) {
	    var filterValue = event.target.value;
	    var filteredOptions = this.props.options.filter(function(opt){
	        return (opt.label.indexOf(filterValue) > -1); 
	    });
	    this.setState({filteredOptions: filteredOptions, filterValue: filterValue});
	  },
	  render: function() {
	    var checklistItems = this.state.filteredOptions.map(function(opt){
	        var checked = (this.props.value.indexOf(opt.value)>-1);
	        return React.createElement(ChecklistItem, {label: opt.label, checked: checked, value: opt.value, onChange: this.props.onChange})
	    }.bind(this));
	    return (
	    	React.createElement("div", {className: "rcm-filtered-checklist"}, 
	    		React.createElement("div", {className: "rcm-filter-box"}, 
	                React.createElement("input", {type: "text", 
	                        onChange: this.handleFilterChange, 
	                        placeholder: "Type to filter...", 
	                        value: this.state.filterValue})
	                ), 
	            React.createElement("div", {className: "rcm-checklist-items"}, 
	                checklistItems
	            )
	    	)
	    );
	  }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/andrewblowe/Projects/usaid/react-compact-multiselect/node_modules/css-loader/index.js!/Users/andrewblowe/Projects/usaid/react-compact-multiselect/node_modules/sass-loader/index.js?outputStyle=expanded&includePaths[]=/Users/andrewblowe/Projects/usaid/react-compact-multiselect/bower_components&includePaths[]=/Users/andrewblowe/Projects/usaid/react-compact-multiselect/node_modules!/Users/andrewblowe/Projects/usaid/react-compact-multiselect/lib/react-compact-multiselect.scss", function() {
			var newContent = require("!!/Users/andrewblowe/Projects/usaid/react-compact-multiselect/node_modules/css-loader/index.js!/Users/andrewblowe/Projects/usaid/react-compact-multiselect/node_modules/sass-loader/index.js?outputStyle=expanded&includePaths[]=/Users/andrewblowe/Projects/usaid/react-compact-multiselect/bower_components&includePaths[]=/Users/andrewblowe/Projects/usaid/react-compact-multiselect/node_modules!/Users/andrewblowe/Projects/usaid/react-compact-multiselect/lib/react-compact-multiselect.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	exports.push([module.id, "", ""]);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2);

	module.exports = React.createClass({displayName: "exports",
	  handleCheckToggle: function(event) {
	    this.props.onChange(this.props.value);
	  },
	  render: function() {
	    return (
	    	React.createElement("div", {className: "rcm-checklist-item"}, 
	    		React.createElement("input", {type: "checkbox", checked: this.props.checked, onChange: this.handleCheckToggle}), " ", React.createElement("span", null, this.props.label)
	    	)
	    );
	  }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2);

	var dropBoxClassName = 'rdd-drop-box';

	__webpack_require__(11);

	module.exports ={};

	var DropButton = React.createClass({displayName: "DropButton",
	  props: {
			label: React.PropTypes.string.isRequired,
			customMode: React.PropTypes.bool
		},
		getInitialState: function() {
			return {open: false};
		},
		componentWillMount: function() {
			//bubble events up to the top
			document.body.addEventListener("click", this.handleOutsideClick, false);
		},
		componentWillUnmount: function() {
			//remove the listener when the component isn't mounted to a DOM node
			document.body.removeEventListener("click", this.handleOutsideClick);
		},
		getChildElementByType: function(type) {
			var children = this.props.children;
			return children.filter(function(childElement) {return childElement.type.displayName === type;})
		},
		toggleDropBox: function() {
			this.setState({open: !this.state.open});
		},
		handleOutsideClick: function(event) {
			var dropBoxDOM = this.refs.dropBox && this.refs.dropBox.getDOMNode();
			var buttonDOM = this.refs.button.getDOMNode();
			//if the click was within the dropdown box panel dont close it
			if( (dropBoxDOM && dropBoxDOM.contains(event.target)) || (buttonDOM && buttonDOM == event.target) || !this.state.open)
				return;
			this.setState({open: false});
		},
		render: function() {
			var dropBox = '', buttonStatus = "closed";
			var dropBoxContent = null;
			
			var dropTrigger = null;
			if(this.props.customMode) {
				dropBoxContent = this.getChildElementByType("DropBoxContent");
				dropTrigger = this.getChildElementByType("DropTrigger");
			}
			
			if(this.state.open) {
				dropBox = (React.createElement("div", {ref: "dropBox", className: dropBoxClassName}, dropBoxContent || this.props.children));
				buttonStatus = "open";
			}

			return (
				React.createElement("div", {className: "react-drop-button"}, 
					React.createElement("div", {ref: "button", className: buttonStatus + " rdd-button", onClick: this.toggleDropBox}, this.props.label, 
						dropTrigger
					), 
					dropBox
				)
			);
		}
	});

	var DropTrigger = React.createClass({displayName: "DropTrigger",
		render: function() {
			return (
				React.createElement("div", {className: "drop-trigger"}, 
					this.props.children
				)
			);
		}
	});

	var DropBoxContent = React.createClass({displayName: "DropBoxContent",
		render: function() {
			return (
				React.createElement("div", {className: "drop-box-content"}, 
					this.props.children
				)
			);
		}
	})

	module.exports.DropButton = DropButton;
	module.exports.DropTrigger = DropTrigger;
	module.exports.DropBoxContent = DropBoxContent;




/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/andrewblowe/Projects/usaid/react-compact-multiselect/node_modules/css-loader/index.js!/Users/andrewblowe/Projects/usaid/react-compact-multiselect/node_modules/sass-loader/index.js?outputStyle=expanded&includePaths[]=/Users/andrewblowe/Projects/usaid/react-compact-multiselect/bower_components&includePaths[]=/Users/andrewblowe/Projects/usaid/react-compact-multiselect/node_modules!/Users/andrewblowe/Projects/usaid/react-compact-multiselect/node_modules/react-drop-button/lib/react-drop-button.scss", function() {
			var newContent = require("!!/Users/andrewblowe/Projects/usaid/react-compact-multiselect/node_modules/css-loader/index.js!/Users/andrewblowe/Projects/usaid/react-compact-multiselect/node_modules/sass-loader/index.js?outputStyle=expanded&includePaths[]=/Users/andrewblowe/Projects/usaid/react-compact-multiselect/bower_components&includePaths[]=/Users/andrewblowe/Projects/usaid/react-compact-multiselect/node_modules!/Users/andrewblowe/Projects/usaid/react-compact-multiselect/node_modules/react-drop-button/lib/react-drop-button.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	exports.push([module.id, ".react-drop-button .rdd-button {\n  width: 180px;\n  border-radius: 3px;\n  padding: 3px; }\n  .react-drop-button .rdd-button.closed {\n    background: #B8B8B8; }\n    .react-drop-button .rdd-button.closed:hover {\n      background: #ccc; }\n  .react-drop-button .rdd-button.open {\n    background: #ccc; }\n    .react-drop-button .rdd-button.open:hover {\n      background: #ccc; }\n  .react-drop-button .rdd-button span.bold-text {\n    color: grey; }\n  .react-drop-button .rdd-button div.chevron {\n    transform: rotate(9deg);\n    color: blue;\n    display: block; }\n.react-drop-button .rdd-drop-box {\n  width: 200px;\n  border: 1px solid grey;\n  border-radius: 2px;\n  background: #F5F5F5; }\n", ""]);

/***/ }
/******/ ])
});
;