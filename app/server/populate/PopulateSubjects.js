Meteor.startup(() => {
	if (Subjects.find().count() === 0) {
		let geoCat = Categories.findOne({ slug: 'geo' });
		let defaultSubjects = [
				{
					categoryId: geoCat._id,
					title: 'Classical geometry',
					img: '/images/geocla.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.'
				}, {
					categoryId: geoCat._id,
					title: 'Conics',
					img: '/images/coni.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
				}, {
					categoryId: geoCat._id,
					title: 'Affine and Projective Geometry',
					img: '/images/geoafin.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
				}, {
					categoryId: geoCat._id,
					title: 'Spherical geometry',
					img: '/images/geoesfe.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
				}, {
					categoryId: geoCat._id,
					title: 'The Fourth Dimension',
					img: '/images/cuartadim.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
				}, {
					categoryId: geoCat._id,
					title: 'Hyperbolic Geometry',
					img: '/images/geohiper.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
				}, {
					categoryId: geoCat._id,
					title: 'Fractal geometry',
					img: '/images/geofractal.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
				}, {
					categoryId: geoCat._id,
					title: 'Topology',
					img: '/images/topo.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
				}
			];
		_.each(defaultSubjects, function(s) {
			Subjects.insert(s);
		});
	}
});