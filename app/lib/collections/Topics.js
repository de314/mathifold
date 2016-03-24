Topics = new Mongo.Collection('topics');

{
	let ModelSchema = new SimpleSchema({
		categoryId: {
			type: String
		},
		subjectId: {
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
		lessonsCount: {
			type: Number,
			defaultValue: 0
		},
		slug: {
			type: String,
			optional: true
		}
	});

	Topics.attachSchema(ModelSchema);
}

Topics.allow({
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

Topics.deny({
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
