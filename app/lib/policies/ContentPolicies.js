ContentPolicies = {
	canCreateCategory(userId = Meteor.userId()) {
		return !!userId;
	},
	canEditCategory(catId, userId = Meteor.userId()) {
		return !!catId && !!userId;
	},


	canCreateSubject(userId = Meteor.userId()) {
		return !!userId;
	},
	canEditSubject(subId, userId = Meteor.userId()) {
		return !!subId && !!userId;
	}
}