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

function syncContentCounts() {
	console.log('sync-ing counts...');
	let cats = Categories.find({}, { fields: { _id: 1 }}).fetch(),
		subs = Subjects.find({}, { fields: { _id: 1 }}).fetch();
	_.each(cats, function(cat) {
		let catId = cat._id;
		Categories.update(catId, { $set: {
			subjectsCount: Subjects.find({ categoryId: catId }).count(),
			topicsCount: Topics.find({ categoryId: catId }).count()
			// TODO: lessons count
		}});
	});
	_.each(subs, function(sub) {
		let subId = sub._id;
		Subjects.update(subId, { $set: {
			topicsCount: Topics.find({ subjectId: subId }).count()
			// TODO: lessons count
		}});
	});
	// TODO: topics
}

Meteor.startup(() => {
	Migrations.add({
		version: 1,
		up() {
			Categories.update({}, { $unset: { slug: "" }}, { multi: true });
			Subjects.update({}, { $unset: { slug: "" }}, { multi: true });
			Topics.update({}, { $unset: { slug: "" }}, { multi: true });
		}
	});

	Migrations.migrateTo('latest');

	syncContentCounts();

	Meteor.setInterval(syncContentCounts, 2 * 60 * 1000);
});
