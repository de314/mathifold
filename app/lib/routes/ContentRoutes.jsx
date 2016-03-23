FlowRouter.route('/c/:slug', {
	name: 'categoryBySlug',
	action(params) {
		
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <CategoryHome slug={ params.slug } />
		});
	}
});

FlowRouter.route('/s/:slug', {
	name: 'subjectBySlug',
	action(params) {
		
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <SubjectHome slug={ params.slug } />
		});
	}
});
