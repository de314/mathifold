StatLabel = React.createClass({
	propTypes: {
	    text: React.PropTypes.string.isRequired,
	    val: React.PropTypes.number.isRequired
	},
	render() {
		let text = this.props.text,
			val = this.props.val,
			className = "stat-label label";
		if (val < 0) {
			className += " label-danger";
		} else if (val > 0) {
			className += " label-success";
		} else {
			className += " label-info";
		}
		return (
				<span className={ className } key={ text }>
					{ text }: { val }
				</span>
			);
	}
});
