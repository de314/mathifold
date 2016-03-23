FlowRouter.route(Urls.categories.category.url(':id'), {
	name: 'categoryById',
	action(params) {
		
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <CategoryHome catId={ params.id } />
		});
	}
});

FlowRouter.route(Urls.categories.create.url(), {
	name: 'categoryCreate',
	action() {
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <CategoryForm />
		});
	}
});

FlowRouter.route(Urls.categories.category.edit.url(':catId'), {
	name: 'categoryEdit',
	action(params) {
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <CategoryForm catId={ params.catId } />
		});
	}
});
