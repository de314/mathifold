CategoryTile = React.createClass({
	render() {
		let cat = this.props.category,
			url = Urls.categories.category.url(cat._id);
		return (
			<div className="category-tile thumbnail">
				<a href={ url }>
					<img src={ cat.img } />
				</a>
				<div className="caption">
					<h3>{ cat.title }</h3>
					<p>
						{ cat.description }
					</p>
					<div className="row">
						<div className="col-xs-6">
							<a href={ url } className="btn btn-primary">Explore</a>
						</div>
						<div className="col-xs-6 text-right">
							<StatLabel text='S' val={ cat.subjectsCount } />
							<StatLabel text='T' val={ cat.topicsCount } />
							<StatLabel text='L' val={ cat.lessonsCount } />
						</div>
					</div>
				</div>
			</div>
		);
	}
});
