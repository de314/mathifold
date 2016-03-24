SubjectTile = React.createClass({
	render() {
		let sub = this.props.subject,
			url = Urls.subjects.subject.url(sub._id);
		return (
			<div className="category-tile thumbnail">
				<a href={ url }>
					<img src={ sub.img } />
				</a>
				<div className="caption">
					<h3>{ sub.title }</h3>
					<p>
						{ sub.description }
					</p>
					<div className="row">
						<div className="col-xs-6">
							<a href={ url } className="btn btn-primary">Explore</a>
						</div>
						<div className="col-xs-6 text-right text-muted">
							<StatLabel text='T' val={ sub.topicsCount } />
							<StatLabel text='L' val={ sub.lessonsCount } />
						</div>
					</div>
				</div>
			</div>
		);
	}
});
