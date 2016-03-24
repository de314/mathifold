Subjects = new Mongo.Collection('subjects');

{
	let ModelSchema = new SimpleSchema({
		categoryId: {
			type: String
		},
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

	Subjects.attachSchema(ModelSchema);
}

Subjects.allow({
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

Subjects.deny({
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

Subjects.defaultSort = { lwssonsCount: -1, topicsCount: -1 };
