Urls = {
	home: {
		url() {
			return '/';
		}
	},
	categories: {
		category: {
			url(slug) {
				return '/c/' + slug;
			},
			edit: {
				url(catId) {
					return '/manage/cat/' + catId;
				}
			}
		},
		create: {
			url() {
				return '/manage/cat';
			}
		}
	},
	subjects: {
		subject: {
			url(slug) {
				return '/s/' + slug;
			}
		}
	},
	topics: {
		topic: {
			url(slug) {
				return '/t/' + slug;
			}
		}
	},
	forums: {
		url() {
			return '/f';
		}
	},
	blog: {
		url() {
			return '/b';
		}
	},
	about: {
		url() {
			return '/a';
		}
	}
}