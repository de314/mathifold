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