import express from 'express';
import AssetController from '../controllers/asset.controller';

const router = express.Router();
const assetController = new AssetController();

/**
 * @swagger
 * /assets:
 *   get:
 *     summary: Get all assets
 *     description: Retrieve a list of all assets.
 *     responses:
 *       200:
 *         description: A list of assets.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AssetListDto'
 *       404:
 *         description: No assets found.
 *         content:
 *           application/json:
 *             example:
 *               message: No asset found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get('/assets', assetController.getAllAssets);

/**
 * @swagger
 * /assets/{uuid}:
 *   get:
 *     summary: Get asset by UUID
 *     description: Retrieve an asset by its UUID.
 *     parameters:
 *       - in: path
 *         name: uuid
 *         description: The UUID of the asset to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested asset.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AssetListDto'
 *       404:
 *         description: Asset not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Asset not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get('/assets/:uuid', assetController.getAssetByUuid);

/**
 * @swagger
 * /assets:
 *   post:
 *     summary: Create a new asset
 *     description: Create a new asset with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created asset.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AssetListDto'
 *       400:
 *         description: Bad Request - Validation errors.
 *         content:
 *           application/json:
 *             example:
 *               errors:
 *                 - Property 'name' must not be empty.
 *                 - Property 'description' must be at least 5 characters long.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.post('/assets', assetController.createAsset);

/**
 * @swagger
 * /assets/{uuid}:
 *   put:
 *     summary: Update an existing asset
 *     description: Update an existing asset by its UUID with the provided data.
 *     parameters:
 *       - in: path
 *         name: uuid
 *         description: The UUID of the asset to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated asset.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AssetListDto'
 *       400:
 *         description: Bad Request - Validation errors.
 *         content:
 *           application/json:
 *             example:
 *               errors:
 *                 - Property 'name' must not be empty.
 *                 - Property 'description' must be at least 5 characters long.
 *       404:
 *         description: Asset not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Asset not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.put('/assets/:uuid', assetController.updateAsset);

/**
 * @swagger
 * /assets/{uuid}:
 *   delete:
 *     summary: Delete an asset by UUID
 *     description: Delete an asset by its UUID.
 *     parameters:
 *       - in: path
 *         name: uuid
 *         description: The UUID of the asset to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Asset successfully deleted.
 *       404:
 *         description: Asset not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Asset not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.delete('/assets/:uuid', assetController.deleteAsset);

export default router;
