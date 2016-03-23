FlowRouter.route('/s/:slug', {
	name: 'subjectBySlug',
	action(params) {
		
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <SubjectHome slug={ params.slug } />
		});
	}
});
