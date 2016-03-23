CategoriesList = React.createClass({
	mixins: [ ReactMeteorData ],
	getMeteorData() {
		Meteor.subscribe('categories');
		return {
			categories: Categories.find().fetch()
		}
	},
	componentDidMount() {
	    let $m = $('.category-tiles-container').masonry({
	    	itemSelector: '.category-tile-container'
	    });
	    $m.imagesLoaded().progress( function() {
	    	$m.masonry('layout');
	    });
	},
	renderCategory(cat) {
		return (
				<div className="col-xs-6 col-md-4 col-lg-3 category-tile-container" key={ cat.slug }>
					<CategoryTile category={ cat } />
				</div>
			);
	},
	render() {
		return (
			<div className="category-list">
				<div className="row category-tiles-container">
					{ this.data.categories.map(this.renderCategory) }
				</div>
			</div>
		);
	}
});
