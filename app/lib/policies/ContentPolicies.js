ContentPolicies = {
	canCreateCategory(userId = Meteor.userId()) {
		return !!userId;
	},
	canEditCategory(catId, userId = Meteor.userId()) {
		return !!catId && !!userId;
	}
}