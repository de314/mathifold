FlowRouter.route(Urls.subjects.subject.url(':id'), {
	name: 'subjectById',
	action(params) {
		
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <SubjectHome subId={ params.id } />
		});
	}
});

FlowRouter.route(Urls.subjects.create.url(':catId'), {
	name: 'subjectCreate',
	action(params) {
		
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <SubjectForm catId={ params.catId } />
		});
	}
});

FlowRouter.route(Urls.subjects.subject.edit.url(':catId', ':subId'), {
	name: 'subjectEdit',
	action(params) {
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <SubjectForm catId={params.catId } subId={ params.subId } />
		});
	}
});
