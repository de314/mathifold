TopicsList = React.createClass({
	getInitialState() {
	    return { };
	},
	componentWillMount() {
	    let self = this,
	    	sub = this.props.sub;
	    Meteor.call('topicsBySubId', sub._id, function(error, result) {
	        	if (!!error) {
	        		console.log(error);
	        		toastr.error(error.reason);
	        	} else {
	        		self.setState({
	        			topics: result
	        		});
	        	}
	        });
	},
	updateMasonryLayout() {
		let $m = $('.subject-tiles-container').masonry({
	    	itemSelector: '.subject-tile-container'
	    });
	    $m.imagesLoaded().progress( function() {
	    	$m.masonry('layout');
	    });
	},
	componentDidMount() {
	    this.updateMasonryLayout();
	},
	componentDidUpdate(prevProps, prevState) {
	    this.updateMasonryLayout();  
	},
	renderTopic(topic) {
		return (
				<div className="col-xs-6 col-md-4 col-lg-3 topic-tile-container" key={ topic.slug }>
					<TopicTile topic={ topic } />
				</div>
			);
	},
	render() {
		let sub = this.props.sub,
			topics = this.state.topics;
		if (!sub || !_.isArray(topics)) {
			return (
					<Loader />
				)
		}
		if (topics.length === 0) {
			return (
					<div className="empty-topics-list">
						<em className="text-muted">
							This subject does not contain any topics.
						</em>
					</div>
				);
		}
		return (
			<div className="topic-list">
				<div className="topic-tiles-container">
					{ topics.map(this.renderTopic) }
				</div>
			</div>
		);
	}
});
