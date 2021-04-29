// 상품관련 API
const express = require("express");
const { Router } = require("express");
const productRouter = express.Router();
const multer = require("multer");
const { upload } = require("../middlewares/imageupload.js");
const { bigCate, smallCate ,search } = require("../controllers/productController");
const { bidding, productpost, detail, popular ,newone,test } = require("../controllers/postController");
const { authMiddlesware } = require("../middlewares/auth-middleware.js");

// 테스트용 api
productRouter.get("/test", authMiddlesware,test);

// 상품등록
// 미들웨어 붙이고 로그인처리 필요
productRouter.post("/", upload.array("img", 3),authMiddlesware, productpost);

// 상품상세보기
productRouter.get("/detail/:id", detail);

// 실시간 인기상품 리스트
productRouter.get("/popularlist", popular);

// 최신 등록 상품 리스트
productRouter.get("/recentlist", newone);

// 대분류에 따른 상품리스트
productRouter.get("/Category/:bigCategory", bigCate);
// 중분류에 따른 상품리스트
productRouter.get("/Category/:bigCategory/:smallCategory", smallCate);

// 검색
productRouter.get("/search", search);

// 상품 입찰
productRouter.post("/auction", authMiddlesware, bidding);
// 상품 즉시 낙찰
productRouter.post("/auction", authMiddlesware, bidding);



module.exports = { productRouter };
