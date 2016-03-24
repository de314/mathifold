LessonInfo = React.createClass({
	propTypes: {
	    less: React.PropTypes.object.isRequired,
	    linked: React.PropTypes.bool
	},
	renderTag(tag) {
		return <span className="label label-default" key={ Math.random() }>{ tag }</span>;
	},
	renderLink(less) {
		if (this.props.linked) {
			return (
					<div className="less-info-view">
						<a href={ Urls.lessons.lesson.url(less._id) } className="btn btn-primary">View</a>
					</div>
				)
		}
		return <div className="not-linked"></div>;
	},
	renderTitle(less) {
		if (this.props.linked) {
			return <a href={ Urls.lessons.lesson.url(less._id) }>{ less.title }</a>;
		}
		return less.title;
	},
	render() {
		let less = this.props.less,
			img = !!less.img ? <img src={ less.img } className="img-rounded" /> : '';
		return (
			<div className="less-info">
				<div className="less-title">
					<h1>
						{ img }
						{ this.renderTitle(less) }
					</h1>
				</div>
				<div className="less-desc">
					{ less.description }
				</div>
				<div className="less-misc-row">
					{ this.renderLink(less) }
					<span className="less-tags">
						{ less.tags.map(this.renderTag) }
					</span>
					<span className="less-createdat">
						Posted: { moment(less.createdAt).fromNow() }
					</span>
					<div className="clear-fix">&nbsp;</div>
				</div>
			</div>
		);
	}
});
