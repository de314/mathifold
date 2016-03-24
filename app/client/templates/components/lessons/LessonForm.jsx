LessonForm = React.createClass({
	propTypes: {
	    catId: React.PropTypes.string.isRequired,
	    subId: React.PropTypes.string.isRequired,
	    topId: React.PropTypes.string.isRequired,
	    lessonId: React.PropTypes.string
	},
	getInitialState() {
	    return {
	        lesson: {},
	        cats: undefined,
	        subs: undefined,
	        tops: undefined
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
	updateTopics(subId) {
		let self = this;
		Meteor.call('topicTitles', subId, function(error, result) {
			if (!!error) {
				console.log(error);
				toastr.error(error.reason);
			} else {
				self.setState({
					tops: result
				});
			}
		});
	},
	componentWillMount() {
	    let id = this.props.lessonId,
	    	self = this;
	    if (!!id) {
	    	Meteor.call('lessonlessonById', id, function(error, result) {
	    		if (!!error) {
	    			console.log(error);
	    			toastr.error(error.reason);
	    		} else {
	    			self.setState({
	    				lesson: result
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
		this.updateTopics(this.props.subId);
	},
	handleCategoryChange(e) {
		this.updateSubjects(e.target.value);
	},
	handleSubjectChange(e) {
		this.updateTopics(e.target.value);
	},
	handleSubmit(e) {
		e.preventDefault();
		let lesson = {
			categoryId: e.target.catId.value,
			subjectId: e.target.subId.value,
			topicId: e.target.topId.value,
			title: e.target.title.value,
			description: e.target.desc.value,
			img: e.target.img.value,
			content: e.target.content.value,
			tags: e.target.tags.value.split(',').map((s) => { return s.trim() })
		};
		if (!!this.state.lesson) {
			_.extend(this.state.lesson, lesson);
			lesson = this.state.lesson;
		}
		Meteor.call('lessonPublish', lesson, function(error, result) {
			if (!!error) {
				console.log(error);
				toastr.error(error.reason);
			} else {
				toastr.success('Success! Redirecting in 1s...');
				setTimeout(function() {
					FlowRouter.go(Urls.lessons.lesson.url(result._id));
				}, 750);
			}
		});
	},
	renderOption(val) {
		return <option value={ val._id } key={ val._id }>{ val.title }</option>;
	},
	render() {
		let lessonId = this.props.lessonId,
			lesson = this.state.lesson || {},
			cats = this.state.cats,
			subs = this.state.subs,
			tops = this.state.tops;
		if ((!!lessonId && lessonId !== lesson._id) || !_.isArray(cats) || !_.isArray(subs) || !_.isArray(tops)) {
			return <Loader />
		}
		return (
			<div className="lesson-form-page">
				<div className="breadcrumbs-container">
					{ Breadcrumbs.forIds(this.props.catId, this.props.subId, this.props.topId) }
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
							<select name="subId" defaultValue={ this.props.subId } className="form-control" onChange={ this.handleSubjectChange }>
								{ this.state.subs.map(this.renderOption) }
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="topId">Topic</label>
							<select name="topId" defaultValue={ this.props.topId } className="form-control">
								{ this.state.tops.map(this.renderOption) }
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input type="text" className="less-title form-control" name="title" placeholder="Category Title" defaultValue={ lesson.title } />
						</div>
						<div className="form-group">
							<label htmlFor="img">Image</label>
							<ImageDataUrlInput className="less-img" preview='true' square='true' maxWidth='320' maxHeight='320' value={ lesson.img } />
						</div>
						<div className="form-group">
							<label htmlFor="desc">Description</label>
							<textarea rows="4" className="less-desc form-control" name="desc" placeholder="Category Description" defaultValue={ lesson.description }></textarea>
						</div>
						<div className="form-group">
							<label htmlFor="content">Lessons Content</label>
							<textarea rows="12" className="less-desc form-control" name="content" placeholder="Lesson Html Content" defaultValue={ lesson.content }></textarea>
						</div>
						<div className="form-group">
							<label htmlFor="tags">Tags</label>
							<input type="text" className="less-tags form-control" name="tags" placeholder="Tags e.g. video, image, 2D animation, 3D animation, beginner, #yolo" defaultValue={ lesson.tags } />
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
			</div>
		);
	}
});
