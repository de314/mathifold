CategoryTile = React.createClass({
	render() {
		let cat = this.props.category;
		return (
			<div className="category-tile thumbnail">
				<img src={ cat.img } />
				<div className="caption">
					<h3>{ cat.title }</h3>
					<p>
						{ cat.description }
					</p>
					<div className="row">
						<div className="col-xs-6">
							<a href={ Urls.categories.category.url(cat.slug) } className="btn btn-primary">Explore</a>
						</div>
						<div className="col-xs-6 text-right text-muted">
							S: { cat.subjectsCount } T: { cat.topicsCount } L: { cat.lessonsCount }
						</div>
					</div>
				</div>
			</div>
		);
	}
});
