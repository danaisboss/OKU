// 유저관련 API
const express = require("express");
const { authMiddlesware } = require("../middlewares/auth-middleware.js");
const { upload } = require("../middlewares/imageupload.js");
const {
	login,
	signup,
	checkId,
	checkEmail,
	checkNickname,
	pick,
	pickdelete,
	myproduct,
	mypronick,
	mypronickedit,
	myinfo,
} = require("../controllers/userController");
const passport = require("passport");
const kakaoStrategy = require("passport-kakao");
const kakaoLogin = require("../middlewares/passport");
const userRouter = express.Router();

//jwt 로그인
userRouter.post("/signup", signup);
userRouter.get("/signup/email/:email", checkEmail);
userRouter.get("/signup/nickname/:nickname", checkNickname);
userRouter.post("/login", login);
//passport 소셜로그인
userRouter.get("/kakao", passport.authenticate("kakao"));
userRouter.get(
	"/kakao/callback",
	passport.authenticate("kakao", {
		failureRedirect: "/",
	}),
	(res, req) => {
		res.redirect("/oauth");
	}
);
// 내가 찜한것 불러오기
userRouter.get("/pick", authMiddlesware, pick);
// 내가 찜한것 삭제하기
userRouter.delete("/pick/:id", authMiddlesware, pickdelete);

// 내 상품목록 불러오기
userRouter.get("/myproduct", authMiddlesware, myproduct);

// 프로필 닉네임 이미지
userRouter.get("/mypronick", authMiddlesware, mypronick);
// 프로필 닉네임 수정
userRouter.put(
	"/mypronick",
	upload.array("img", 1),
	authMiddlesware,
	mypronickedit
);

// 내 정보 조회
userRouter.get("/myinfo", authMiddlesware, myinfo);

module.exports = { userRouter };
