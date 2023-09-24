import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { AppDataSource } from '../data-source';
import { Asset } from '../entities/asset.entity';
import { plainToInstance } from 'class-transformer';
import { AssetCreateUpdateDto } from '../dtos/asset.create-update.dto';
import { AssetListDto } from '../dtos/asset.list.dto';

class AssetController {
  // Get all assets
  async getAllAssets(req: Request, res: Response) {
    try {
      const assets = await AppDataSource.manager.find(Asset);

      if (!assets || !assets.length) {
        res.status(404).json({ message: 'No asset found' });
        return;
      }

      return res.status(200).json(assets.map((asset) => new AssetListDto(asset)));
    } catch (error) {
      console.error('Error when attempting to retrieve all assets:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get asset by UUID
  async getAssetByUuid(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const asset = await AppDataSource.manager.findOneBy(Asset, { uuid });

      if (!asset) {
        res.status(404).json({ message: 'Asset not found' });
        return;
      }

      res.status(200).json(new AssetListDto(asset));
    } catch (error) {
      console.error('Error when attempting to retrieve asset by UUID', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Create a new asset
  async createAsset(req: Request, res: Response) {
    try {
      const dto = plainToInstance(AssetCreateUpdateDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(422).json({ message: 'Invalid asset body' });
      }

      const asset = dto.toEntity();

      await AppDataSource.manager.save(Asset, asset);

      return res.status(201).json(new AssetListDto(asset));
    } catch (error) {
      console.error('Error when attempting to create asset', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Update an existing asset
  async updateAsset(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const dto = plainToInstance(AssetCreateUpdateDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(422).json({ message: 'Invalid asset body' });
      }

      const asset = await AppDataSource.manager.findOneBy(Asset, { uuid });

      if (!asset) {
        return res.status(404).json({ message: 'Asset not found' });
      }

      const savedAsset = await AppDataSource.manager.save(Asset, {
        ...asset,
        ...dto.toEntity(),
      });

      return res.status(200).json(new AssetListDto(savedAsset));
    } catch (error) {
      console.error('Error when attempting to update asset', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Delete an asset
  async deleteAsset(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const asset = await AppDataSource.manager.findOneBy(Asset, { uuid });

      if (!asset) {
        res.status(404).json({ message: 'Asset not found' });
        return;
      }

      await AppDataSource.manager.remove(asset);

      res.status(204).send();
    } catch (error) {
      console.error('Error when attempting to delete asset', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default AssetController;
