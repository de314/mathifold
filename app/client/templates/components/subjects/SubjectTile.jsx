SubjectTile = React.createClass({
	render() {
		let sub = this.props.subject;
		return (
			<div className="category-tile thumbnail">
				<img src={ sub.img } />
				<div className="caption">
					<h3>{ sub.title }</h3>
					<p>
						{ sub.description }
					</p>
					<div className="row">
						<div className="col-xs-6">
							<a href={ Urls.subjects.subject.url(sub.slug) } className="btn btn-primary">Explore</a>
						</div>
						<div className="col-xs-6 text-right text-muted">
							T: { sub.topicsCount } L: { sub.lessonsCount }
						</div>
					</div>
				</div>
			</div>
		);
	}
});
