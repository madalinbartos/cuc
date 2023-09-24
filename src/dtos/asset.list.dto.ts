import { Asset } from "entities/asset.entity";

export class AssetListDto {
  constructor(asset: Asset) {
    this.uuid = asset.uuid;
    this.name = asset.name;
    this.description = asset.description;
    this.createdAt = asset.createdAt;
    this.updatedAt = asset.updatedAt;
  }

  uuid: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
