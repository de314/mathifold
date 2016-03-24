CategoryForm = React.createClass({
	getInitialState() {
	    return {
	        cat: {}
	    };
	},
	componentWillMount() {
	    let id = this.props.catId;
	    if (!!id) {
	    	let self = this;
	    	Meteor.call('categoryById', id, function(error, result) {
	    		if (!!error) {
	    			console.log(error);
	    			toastr.error(error.reason);
	    		} else {
	    			self.setState({
	    				cat: result
	    			});
	    		}
	    	});
	    }
	},
	handleSubmit(e) {
		e.preventDefault();
		let cat = {
			title: e.target.title.value,
			description: e.target.desc.value,
			img: e.target.img.value
		};
		if (!!this.state.cat) {
			_.extend(this.state.cat, cat);
			cat = this.state.cat;
		}
		Meteor.call('categoryPublish', cat, function(error, result) {
			if (!!error) {
				console.log(error);
				toastr.error(error.reason);
			} else {
				toastr.success('Success! Redirecting in 2s...');
				setTimeout(function() {
					FlowRouter.go(Urls.categories.category.url(result._id));
				}, 1750);
			}
		});
	},
	render() {
		let cat = this.state.cat || {};
		if (!!this.props.catId && this.props.catId !== cat._id) {
			return <Loader />;
		}
		return (
			<div className="category-form-page">
				<div className="breadcrumbs-container">
					{ Breadcrumbs.forIds(cat._id) }
				</div>
				<div className="col-xs-8 col-xs-offset-2">
					<form className="category-form" onSubmit={ this.handleSubmit }>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input type="text" className="cat-title form-control" name="title" placeholder="Category Title" defaultValue={ cat.title } />
						</div>
						<div className="form-group">
							<label htmlFor="img">Image</label>
							<ImageDataUrlInput className="cat-img" preview='true' square='true' maxWidth='320' maxHeight='320' value={ cat.img } />
						</div>
						<div className="form-group">
							<label htmlFor="desc">Description</label>
							<textarea rows="10" className="cat-desc form-control" name="desc" placeholder="Category Description" defaultValue={ cat.description }></textarea>
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
			</div>
		);
	}
});
