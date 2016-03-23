Header = React.createClass({
	render() {
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href={ Urls.home.url() }>
							<img src="/icon.png" alt="" className="img-circle icon"/>
						</a>
					</div>
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav">
							<li><a href={ Urls.forums.url() }>Forums</a></li>
							<li><a href={ Urls.blog.url() }>Blog</a></li>
							<li><a href={ Urls.about.url() }>About</a></li>
							<li>
								<AccountsUIWrapper />
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
});