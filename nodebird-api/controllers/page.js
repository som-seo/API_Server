const {User, Post, Hashtag}=require('../models');

exports.renderProfile=(req, res)=>{
    res.render('profile', {title: '내 정보 - NodeBird'});
};

exports.renderJoin=(req, res)=>{
    res.render('join', {title: '회원 가입 - NodeBird'});
};

exports.renderMain=async (req, res, next)=>{
    try {
        const posts=await Post.findAll({
            include:{
                model: User,
                attributes: ['id', 'nick'],
            },
            order: [['createdAt', 'DESC']],
        });
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });
    } catch (err) {
     console.error(err);
     next(err);   
    }
};

exports.renderHashtag=async(req, res, next)=>{
    const query=req.query.hashtag;
    if(!query){
        return res.redirect('/');
    }
    try {
        const hashtag=await Hashtag.findOne({where: {title: query}});
        let posts=[];
        if(hashtag){
            posts=await hashtag.getPosts({include: [{model: User}]}); // 만약 해시태그가 있다면 getPosts를 통하여 해시태그를 찾습니다.
        }
        return res.render('main', {
            title: `${query} | NodeBird`,
            twits: posts,
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};