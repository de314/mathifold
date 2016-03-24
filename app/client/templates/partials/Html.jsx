Html = React.createClass({
	propTypes: {
	    content: React.PropTypes.string.isRequired
	},
	render() {
		return (
			<div dangerouslySetInnerHTML={{__html: this.props.content }} />
		);
	}
});
