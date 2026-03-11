"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../../src");
const setup_app_1 = require("../../src/setup-app");
const testingAllDataPath = `${setup_app_1.RouterPaths.testing}/all-data`;
describe("testing API", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).delete(testingAllDataPath).expect(204);
    }));
    it("should return 204 for DELETE /testing/all-data", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).delete(testingAllDataPath).expect(204);
    }));
    it("should clear all videos from database", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post(setup_app_1.RouterPaths.videos)
            .send({
            title: "video 1",
            author: "author 1",
            availableResolutions: ["P144"],
            publicationDate: new Date().toISOString(),
        })
            .expect(201);
        const videosBeforeDelete = yield (0, supertest_1.default)(src_1.app).get(setup_app_1.RouterPaths.videos).expect(200);
        expect(videosBeforeDelete.body.length).toBe(1);
        yield (0, supertest_1.default)(src_1.app).delete(testingAllDataPath).expect(204);
        const videosAfterDelete = yield (0, supertest_1.default)(src_1.app).get(setup_app_1.RouterPaths.videos).expect(200);
        expect(videosAfterDelete.body).toEqual([]);
    }));
});
