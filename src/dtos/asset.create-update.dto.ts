import { IsNotEmpty, Length } from "class-validator";
import { Asset } from "../entities/asset.entity";

export class AssetCreateUpdateDto {
  @IsNotEmpty({ message: "Name is required" })
  @Length(1, 20, { message: "Name should be between 1 and 20 characters" })
  name: string;

  @IsNotEmpty({ message: "Description is required" })
  @Length(1, 200, {
    message: "Description should be between 1 and 100 characters",
  })
  description: string;

  toEntity(): Asset {
    const asset = new Asset();
    asset.name = this.name;
    asset.description = this.description;
    return asset;
  }
}
