import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import AssetController from "./asset.controller";
import { Asset } from "../entities/asset.entity";
import { AssetListDto } from "../dtos/asset.list.dto";

describe("AssetController", () => {
  let assetController: AssetController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    assetController = new AssetController();
    mockRequest = {
      params: { uuid: "test-uuid" },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getAllAssets", () => {
    it("should return all assets when they exist", async () => {
      AppDataSource.manager.find = jest.fn().mockResolvedValue([new Asset()]);

      await assetController.getAllAssets(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([
        expect.any(AssetListDto),
      ]);
    });

    it("should return a 404 status when no assets are found", async () => {
      AppDataSource.manager.find = jest.fn().mockResolvedValue([]);

      await assetController.getAllAssets(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "No asset found",
      });
    });

    it("should return a 500 status on error", async () => {
      AppDataSource.manager.find = jest
        .fn()
        .mockRejectedValue(new Error("Internal server error"));

      await assetController.getAllAssets(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("getAssetByUuid", () => {
    it("should return an asset when it exists", async () => {
      const testAsset = new Asset();
      AppDataSource.manager.findOneBy = jest.fn().mockResolvedValue(testAsset);

      await assetController.getAssetByUuid(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.any(AssetListDto));
    });

    it("should return a 404 status when the asset is not found", async () => {
      AppDataSource.manager.findOneBy = jest.fn().mockResolvedValue(null);

      await assetController.getAssetByUuid(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Asset not found",
      });
    });

    it("should return a 500 status on error", async () => {
      AppDataSource.manager.findOneBy = jest
        .fn()
        .mockRejectedValue(new Error("Internal server error"));

      await assetController.getAssetByUuid(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
});
