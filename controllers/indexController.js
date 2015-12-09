var Post = require('../modules/postModule');

module.exports = {

	homepage: function(req, res) {
		var logflag = true;
		if (req.session.user === undefined || req.session.user === null) {
			logflag = false;
		}
		Post.find({}).sort({'updated_at':-1}).exec(function(err, data) {
			var posts = [];
			if (err) return console.error(err);
			if (data) {
				console.log('find posts.');
				posts = data;
			} else {
				console.log('no posts.');
				posts = [];
			}
			res.render('index', {
				title: '若鱼日记',
				posts: posts,
				liFlag: 1,
				user: req.session.user,
				loged: logflag
			});
		});

	}

	,
	login: function(req, res) {
		var logflag = true;
		if (req.session.user === undefined || req.session.user === null) {
			logflag = false;
		}
		res.render('login', {
			title: '若鱼日记-登录',
			user: req.session.user,
			loged: logflag,
			liFlag: 2,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	}

	,
	reg: function(req, res) {
		var logflag = true;
		if (req.session.user === undefined || req.session.user === null) {
			logflag = false;
		}
		res.render('reg', {
			title: '若鱼日记-注册',
			user: req.session.user,
			loged: logflag,
			liFlag: 3,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	}

	,
	logout: function(req, res) {
		req.session.user = null;
		return res.redirect('/homepage');
	}

	,
	editPost: function(req, res) {
		var logflag = true;
		if (req.session.user === undefined || req.session.user === null) {
			logflag = false;
			res.redirect('/login');
		}
		res.render('edit', {
			title: '若鱼日记-编辑',
			user: req.session.user,
			loged: logflag,
			liFlag: 5,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	}

	,
	userCenter: function(req, res) {
		var logflag = true;
		if (req.session.user === undefined || req.session.user === null) {
			logflag = false;
			res.redirect('/login');
		}
		res.render('userCenter', {
			title: '若鱼日记-设置',
			user: req.session.user,
			loged: logflag,
			liFlag: 6,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	}

	,
	userPage: function(req, res) {
		var logflag = true;
		if (req.session.user === undefined || req.session.user === null) {
			logflag = false;
			res.redirect('/login');
		}
		var userid = req.session.user._id;
		Post.find({
			authorid: userid
		}).sort({'updated_at':-1}).exec(function(err, data) {
			var posts = [];
			if (err) return console.error(err);
			if (data) {
				console.log('find user posts.');
				posts = data;
			} else {
				console.log('user has no posts.');
				posts = [];
			}
			res.render('userPage', {
				title: '若鱼日记-个人主页',
				loged: logflag,
				liFlag: 4,
				posts: posts,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});

	}
};