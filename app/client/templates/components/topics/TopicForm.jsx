TopicForm = React.createClass({
	getInitialState() {
	    return {
	        topic: {},
	        cats: undefined,
	        subs: undefined
	    };
	},
	updateSubjects(catId) {
		let self = this;
		Meteor.call('subjectTitles', catId, function(error, result) {
			if (!!error) {
				console.log(error);
				toastr.error(error.reason);
			} else {
				self.setState({
					subs: result
				});
			}
		});
	},
	componentWillMount() {
	    let id = this.props.topicId,
	    	self = this;
	    if (!!id) {
	    	Meteor.call('topicById', id, function(error, result) {
	    		if (!!error) {
	    			console.log(error);
	    			toastr.error(error.reason);
	    		} else {
	    			self.setState({
	    				topic: result
	    			});
	    		}
	    	});
	    }
	    Meteor.call('categoryTitles', function(error, result) {
			if (!!error) {
				console.log(error);
				toastr.error(error.reason);
			} else {
				self.setState({
					cats: result
				});
			}
		});
		this.updateSubjects(this.props.catId);
	},
	handleCategoryChange(e) {
		this.updateSubjects(e.target.value);
	},
	handleSubmit(e) {
		e.preventDefault();
		let topic = {
			categoryId: e.target.catId.value,
			subjectId: e.target.subId.value,
			title: e.target.title.value,
			description: e.target.desc.value,
			img: e.target.img.value
		};
		if (!!this.state.topic) {
			_.extend(this.state.topic, topic);
			topic = this.state.topic;
		}
		Meteor.call('topicPublish', topic, function(error, result) {
			if (!!error) {
				console.log(error);
				toastr.error(error.reason);
			} else {
				toastr.success('Success! Redirecting in 2s...');
				setTimeout(function() {
					FlowRouter.go(Urls.topics.topic.url(result._id));
				}, 1750);
			}
		});
	},
	renderOption(val) {
		return <option value={ val._id } key={ val._id }>{ val.title }</option>;
	},
	render() {
		let topicId = this.props.topicId,
			topic = this.state.topic || {},
			cats = this.state.cats,
			subs = this.state.subs;
		if ((!!topicId && topicId !== topic._id) || !_.isArray(cats) || !_.isArray(subs)) {
			return <Loader />
		}
		return (
			<div className="topic-form-page">
				<div className="breadcrumbs-container">
					{ Breadcrumbs.forIds(this.props.catId, this.props.subId, topic._id) }
				</div>
				<div className="col-xs-8 col-xs-offset-2">
					<form className="category-form" onSubmit={ this.handleSubmit }>
						<div className="form-group">
							<label htmlFor="catId">Category</label>
							<select name="catId" defaultValue={ this.props.catId } className="form-control" onChange={ this.handleCategoryChange }>
								{ this.state.cats.map(this.renderOption) }
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="subId">Subject</label>
							<select name="subId" defaultValue={ this.props.subId } className="form-control">
								{ this.state.subs.map(this.renderOption) }
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input type="text" className="sub-title form-control" name="title" placeholder="Category Title" defaultValue={ topic.title } />
						</div>
						<div className="form-group">
							<label htmlFor="img">Image</label>
							<ImageDataUrlInput className="sub-img" preview='true' square='true' maxWidth='320' maxHeight='320' value={ topic.img } />
						</div>
						<div className="form-group">
							<label htmlFor="desc">Description</label>
							<textarea rows="10" className="sub-desc form-control" name="desc" placeholder="Category Description" defaultValue={ topic.description }></textarea>
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
			</div>
		);
	}
});
