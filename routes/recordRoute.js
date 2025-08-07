const express = require("express");
const router = express.Router();
const recordsController = require("../controllers/recordController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Record:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         hr:
 *           type: number
 *           default: 0
 *           description: Heart rate (HR)
 *         ppi:
 *           type: number
 *           default: 0
 *           description: PPI value
 *         acc:
 *           type: number
 *           default: 0
 *           description: Accelerometer value
 *         ppg:
 *           type: number
 *           default: 0
 *           description: Photoplethysmography (PPG)
 *         mag:
 *           type: number
 *           default: 0
 *           description: Magnetometer value
 *         gyr:
 *           type: number
 *           default: 0
 *           description: Gyroscope value
 *         userId:
 *           type: string
 *           format: ObjectId
 *           description: Reference to User (must be unique)
 *         mode:
 *           type: string
 *           enum: [online, offline, heart, swim]
 *           default: online
 *           description: Record mode type
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         hr: 75
 *         ppi: 60
 *         acc: 10
 *         ppg: 15
 *         mag: 8
 *         gyr: 12
 *         userId: "64f1234567890abcdef12345"
 *         mode: "online"
 */

/**
 * @swagger
 * tags:
 *   name: Records
 *   description: Data records from sensors
 */

/**
 * @swagger
 * /api/records/add:
 *   post:
 *     summary: Create a new record
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Record'
 *     responses:
 *       201:
 *         description: Record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Record'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/records/addbulk:
 *   post:
 *     summary: Add multiple records
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               records:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Record'
 *     responses:
 *       200:
 *         description: Records added successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/records/all:
 *   get:
 *     summary: Get all records
 *     tags: [Records]
 *     responses:
 *       200:
 *         description: List of records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Record'
 */

/**
 * @swagger
 * /api/records/{userId}:
 *   get:
 *     summary: Get records by userID
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: The requested record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Record'
 *       404:
 *         description: Record not found
 */

/**
 * @swagger
 * /api/records/{recordId}:
 *   put:
 *     summary: Update a record by ID
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: recordId
 *         required: true
 *         schema:
 *           type: string
 *         description: Record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Record'
 *     responses:
 *       200:
 *         description: Record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Record'
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Record not found
 */

/**
 * @swagger
 * /api/records/{recordId}:
 *   delete:
 *     summary: Delete a record by ID
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: recordId
 *         required: true
 *         schema:
 *           type: string
 *         description: Record ID
 *     responses:
 *       200:
 *         description: Record deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *       404:
 *         description: Record not found
 *       500:
 *         description: Server error
 */

/* ثبت  */
router.post("/add", recordsController.add);

router.post("/addbulk", recordsController.addBulk);

/* دریافت همه  */
router.get("/all", recordsController.getAll);

/* دریافت اطلاعات  */
router.get("/:userId", recordsController.getByUserId);

/* اپدیت اطلاعات  */
router.put("/:recordId", recordsController.update);

/* حذف  */
router.delete("/:recordId", recordsController.deleteById);

module.exports = router;
