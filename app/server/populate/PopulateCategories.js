Meteor.startup(() => {
	if (Categories.find().count() === 0) {
		let defaultCategories = [
				{
					title: 'Basics',
					img: '/images/mb.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
					slug: 'mb'
				}, {
					title: 'Geometry',
					img: '/images/geo.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
					slug: 'geo',
					subjectsCount: 8
				}, {
					title: 'Algebra',
					img: '/images/alge.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
					slug: 'alge'
				}, {
					title: 'Analysis',
					img: '/images/an.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
					slug: 'an'
				}, {
					title: 'Probability and Statistics',
					img: '/images/propesta.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
					slug: 'propesta'
				}, {
					title: 'Operational Research',
					img: '/images/invope.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
					slug: 'invope'
				}, {
					title: 'Foundations',
					img: '/images/fun.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
					slug: 'fun'
				}, {
					title: 'Mathematical Models',
					img: '/images/modmat.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
					slug: 'modmat'
				}, {
					title: 'Evolutive Equations',
					img: '/images/evoeq.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
					slug: 'evoeq'
				}, {
					title: 'Pure Mathematics I',
					img: '/images/matpur1.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
					slug: 'matpur1'
				}, {
					title: 'Pure Mathematics II',
					img: '/images/matpur2.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
					slug: 'matpur2'
				}, {
					title: 'Problem Resolution',
					img: '/images/probres.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
					slug: 'probres'
				}, {
					title: 'History of Mathematics',
					img: '/images/histmath.jpg',
					description: 'This is what I am talking about. A general subject in mathematics.',
					slug: 'histmath'
				}
			];
		_.each(defaultCategories, function(cat) {
			Categories.insert(cat);
		});
	}
});