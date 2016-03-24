Meteor.startup(() => {
	if (Categories.find().count() === 0) {
		let defaultCategories = [
				{
					title: 'Basics',
					img: '/images/mb.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.'
				}, {
					title: 'Geometry',
					img: '/images/geo.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.'
				}, {
					title: 'Algebra',
					img: '/images/alge.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.'
				}, {
					title: 'Analysis',
					img: '/images/an.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.'
				}, {
					title: 'Probability and Statistics',
					img: '/images/propesta.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
				}, {
					title: 'Operational Research',
					img: '/images/invope.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
				}, {
					title: 'Foundations',
					img: '/images/fun.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
				}, {
					title: 'Mathematical Models',
					img: '/images/modmat.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
				}, {
					title: 'Evolutive Equations',
					img: '/images/evoeq.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
				}, {
					title: 'Pure Mathematics I',
					img: '/images/matpur1.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
				}, {
					title: 'Pure Mathematics II',
					img: '/images/matpur2.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
				}, {
					title: 'Problem Resolution',
					img: '/images/probres.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
				}, {
					title: 'History of Mathematics',
					img: '/images/histmath.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
				}
			];
		_.each(defaultCategories, function(cat) {
			Categories.insert(cat);
		});
	}
});