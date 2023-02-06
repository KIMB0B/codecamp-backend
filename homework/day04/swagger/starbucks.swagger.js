/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 스타벅스 커피 정보 가져오기
 *     responses: 
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "아메리카노"
 *                   kcal:
 *                     type: int
 *                     example: 5
 */