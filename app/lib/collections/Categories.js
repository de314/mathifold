Categories = new Mongo.Collection('categories');

{
	let ModelSchema = new SimpleSchema({
		title: {
			type: String
		},
		img: {
			type: String,
			optional: true
		},
		description: {
			type: String,
			optional: true
		},
		subjectsCount: {
			type: Number,
			defaultValue: 0
		},
		topicsCount: {
			type: Number,
			defaultValue: 0
		},
		lessonsCount: {
			type: Number,
			defaultValue: 0
		},
		slug: {
			type: String,
			optional: true
		}
	});

	Categories.attachSchema(ModelSchema);
}

Categories.allow({
	insert() {
		return false;
	},
	update() {
		return false;
	},
	remove() {
		return false;
	}
});

Categories.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});

Categories.defaultSort = { lessonsCount: -1, topicsCount: -1, subjectsCount: -1 };
