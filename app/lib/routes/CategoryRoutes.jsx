FlowRouter.route('/c/:slug', {
	name: 'categoryBySlug',
	action(params) {
		
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <CategoryHome slug={ params.slug } />
		});
	}
});

FlowRouter.route('/manage/cat', {
	name: 'categoryCreate',
	action() {
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <CategoryForm />
		});
	}
});

FlowRouter.route('/manage/cat/:catId', {
	name: 'categoryEdit',
	action(params) {
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <CategoryForm catId={ params.catId } />
		});
	}
});
