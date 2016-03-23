Home = React.createClass({
	mixins: [ ReactMeteorData ],
	getMeteorData() {
		return {
		}
	},
	render() {
		return (
			<div className="homeContainer">
				<div className="jumbotron text-center">
					<h1>Mathifold</h1>
					<p>
						Hi! In Mathifold we&#39;re devising a new way to learn mathematics
						focusing on visualisation and pedagogy, with the best capabilities
						of the newest technologies and rooted in the open-source world. A
						real challenge! 
					</p>
				</div>
				<div className="category-list-container">
					<CategoriesList />
				</div>
			</div>
		);
	}
})