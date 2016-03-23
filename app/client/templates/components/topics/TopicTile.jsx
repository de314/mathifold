TopicTile = React.createClass({
	render() {
		let topic = this.props.topic;
		return (
			<div className="topic-tile thumbnail">
				<img src={ topic.img } />
				<div className="caption">
					<h3>{ topic.title }</h3>
					<p>
						{ topic.description }
					</p>
					<div className="row">
						<div className="col-xs-6">
							<a href={ Urls.topics.topic.url(topic.slug) } className="btn btn-primary">Explore</a>
						</div>
						<div className="col-xs-6 text-right text-muted">
							L: { topic.lessonsCount }
						</div>
					</div>
				</div>
			</div>
		);
	}
});
