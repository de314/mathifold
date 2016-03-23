Meteor.publishCounter = function(params) {
	let count = 0,
		init = true,
		pub = params.handle,
		collection = params.collection,
    countId = params.id,
    name = params.name;

	// observeChanges only returns after the initial `added` callbacks
	// have run. Until then, we don't want to send a lot of
	// `self.changed()` messages - hence tracking the
	// `initializing` state.
	var handle = collection.find(params.filter, params.options).observeChanges({
			added(id) {
				count++;
				if (!init) {
					pub.changed(name, countId, {count: count});
				}
			},
			removed(id) {
				count--;
				pub.changed(name, countId, {count: count});
			}
		});
	// Instead, we'll send one `self.added()` message right after
	// observeChanges has returned, and mark the subscription as
	// ready.
	init = false;
	pub.added(name, countId, {count: count});
	pub.ready();

	// Stop observing the cursor when client unsubs.
	// Stopping a subscription automatically takes
	// care of sending the client any removed messages.
	pub.onStop(function () {
		handle.stop();
	});
};

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
					slug: 'geo'
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
		_.each(defaultCategories, function(s) {
			Categories.insert(s);
		});
	}

	Migrations.migrateTo('latest');
});
