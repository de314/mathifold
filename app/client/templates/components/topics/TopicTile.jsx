TopicTile = React.createClass({
	render() {
		let topic = this.props.topic,
			url = Urls.topics.topic.url(topic._id);
		return (
			<div className="topic-tile thumbnail">
				<a href={ url }>
					<img src={ topic.img } />
				</a>
				<div className="caption">
					<h3>{ topic.title }</h3>
					<p>
						{ topic.description }
					</p>
					<div className="row">
						<div className="col-xs-6">
							<a href={ url } className="btn btn-primary">Explore</a>
						</div>
						<div className="col-xs-6 text-right text-muted">
							<StatLabel text='L' val={ topic.lessonsCount } />
						</div>
					</div>
				</div>
			</div>
		);
	}
});
