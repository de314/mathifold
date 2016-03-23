CategoriesList = React.createClass({
	getInitialState() {
	    return { };
	},
	componentWillMount() {
	    let self = this;
	    Meteor.call('categories', function(error, result) {
	      	if (!!error) {
	      		console.log(error);
	      		toastr.error(error.reason);
	      	} else {
	      		self.setState({
	      			categories: result
	      		});
	      	}
	      });  
	},
	updateMasonryLayout() {
		let $m = $('.category-tiles-container').masonry({
	    	itemSelector: '.category-tile-container'
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
	renderCategory(cat) {
		return (
				<div className="col-xs-6 col-md-4 col-lg-3 category-tile-container" key={ cat.slug }>
					<CategoryTile category={ cat } />
				</div>
			);
	},
	render() {
		if (!_.isArray(this.state.categories)) {
			return <Spinner />
		}
		let createEle = '';
		if (ContentPolicies.canCreateCategory()) {
			createEle = (
					<div className="text-right">
						<a href={ Urls.categories.create.url() } className="btn btn-primary">+ Create New Category</a>
					</div>
				);
		}
		return (
			<div className="category-list">
				{ createEle }
				<div className="row category-tiles-container">
					{ this.state.categories.map(this.renderCategory) }
				</div>
			</div>
		);
	}
});
