const express = require('express');
const ClubController = require('./controllers/ClubController');
const StadiumController = require('./controllers/StadiumController');
const { idClubValidation, idStadiumValidation, stadiumValidation, clubValidation, validate } = require('./validator.js')
const routes = express.Router();

//#region Club
/**
  * @swagger
    * /clubs:
    *   post:
    *     description: Create a club
    *     tags:
    *       - Clubs
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Club
    *         description: Club object
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/ClubRequestDto'
    *     responses:
    *       201:
    *         description: Create
    *         schema:
    *           $ref: '#/definitions/ClubResponseDto'
    *       404:
    *         description: Not Found
    *       500:
    *         description: Error Server
    * definitions:
    *   ClubRequestDto:
    *     type: object
    *     required:
    *       - fullName
    *       - country
    *       - founded
    *       - site
    *       - idStadium
    *     properties:
    *       fullName:
    *         type: string
    *       country:
    *         type: string
    *       founded:
    *         type: string
    *       site:
    *         type: string
    *       idStadium:
    *         type: string
    *   ClubResponseDto:
    *     type: object
    *     properties:
    *       idClub:
    *         type: string
    *       fullName:
    *         type: string
    *       country:
    *         type: string
    *       founded:
    *         type: string
    *       site:
    *         type: string
    *       stadium:
    *         type: object
    *         schema: 
    *         $ref: '#/definitions/StadiumResponseDto'
   */
routes.post('/api/clubs', clubValidation, validate, ClubController.save);

/**
  * @swagger
    * /clubs:
    *   get:
    *     description: get clubs
    *     tags:
    *       - Clubs
    *     produces:
    *       - application/json
    *     responses:
    *       200:
    *         description: Ok
    *         schema:
    *           $ref: '#/definitions/ClubResponseDto'
    *       404:
    *         description: Not Found
    *       500:
    *         description: Error Server
   */
routes.get('/api/clubs', ClubController.findAll);

/**
  * @swagger
    * /clubs/{idClub}:
    *   get:
    *     description: Get Club with given idClub
    *     tags:
    *       - Clubs
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: idClub
    *         description: 
    *         type: string
    *         required: true
    *         in: path
    *     responses:
    *       200:
    *         description: OK
    *         schema:
    *           $ref: '#/definitions/ClubResponseDto'
    *       404:
    *         description: Not Found
    *       500:
    *         description: Error Server
   */
routes.get('/api/clubs/:idClub', idClubValidation, validate, ClubController.findOne);

/**
  * @swagger
    * /clubs/{idClub}:
    *   put:
    *     description: Update Club with give idClub
    *     tags:
    *       - Clubs
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: idClub
    *         description: 
    *         type: string
    *         required: true
    *         in: path
    *       - name: Club
    *         description: Club object
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/ClubRequestDto'
    *     responses:
    *       200:
    *         description: OK
    *         schema:
    *           $ref: '#/definitions/ClubResponseDto'
    *       404:
    *         description: Not Found
    *       500:
    *         description: Error Server
   */
routes.put('/api/clubs/:idClub', [idClubValidation, idStadiumValidation, clubValidation], validate, ClubController.update);

/**
  * @swagger
    * /clubs/{idClub}:
    *   delete:
    *     description: Delete Club with give idClub
    *     tags:
    *       - Clubs
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: idClub
    *         description:
    *         type: string
    *         required: true
    *         in: path
    *     responses:
    *       200:
    *         description: OK
    *       404:
    *         description: Not Found
    *       500:
    *         description: Error Server
   */
routes.delete('/api/clubs/:idClub', idClubValidation, validate, ClubController.delete);
//#endregion

//#region Stadium
/**
  * @swagger
    * /stadiums:
    *   post:
    *     description: Create a stadium
    *     tags:
    *       - Stadiums
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Stadium
    *         description: Stadium object
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/StadiumRequestDto'
    *     responses:
    *       200:
    *         description: create
    *         schema:
    *           $ref: '#/definitions/StadiumResponseDto'
    *       500:
    *         description: error server
    * definitions:
    *   StadiumRequestDto:
    *     type: object
    *     required:
    *       - name
    *       - built
    *       - capacity
    *     properties:
    *       name:
    *         type: string
    *       built:
    *         type: string
    *       capacity:
    *         type: number
    *   StadiumResponseDto:
    *     type: object
    *     properties:
    *       idStadium:
    *         type: string
    *       name:
    *         type: string
    *       built:
    *         type: string
    *       capacity:
    *         type: number
   */
routes.post('/api/stadiums', stadiumValidation, validate, StadiumController.save);

/**
  * @swagger
    * /stadiums:
    *   get:
    *     description: get stadiums
    *     tags:
    *       - Stadiums
    *     produces:
    *       - application/json
    *     responses:
    *       200:
    *         description: Ok
    *         schema:
    *           $ref: '#/definitions/StadiumResponseDto'
    *       404:
    *         description: Not Found
    *       500:
    *         description: Error Server
   */
routes.get('/api/stadiums', StadiumController.findAll);

/**
  * @swagger
    * /stadiums/{idStadium}:
    *   get:
    *     description: Get Stadium with given idStadium
    *     tags:
    *       - Stadiums
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: idStadium
    *         description:
    *         type: string
    *         required: true
    *         in: path
    *     responses:
    *       200:
    *         description: OK
    *         schema:
    *           $ref: '#/definitions/StadiumResponseDto:'
    *       404:
    *         description: Not Found
    *       500:
    *         description: Error Server
   */
routes.get('/api/stadiums/:idStadium', idStadiumValidation, validate, StadiumController.findOne);

/**
  * @swagger
    * /stadiums/{idStadium}:
    *   put:
    *     description: Update Stadium with give idStadium
    *     tags:
    *       - Stadiums
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: idStadium
    *         description: 
    *         type: string
    *         required: true
    *         in: path
    *       - name: Stadium
    *         description: Studium object
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/StadiumRequestDto'
    *     responses:
    *       200:
    *         description: OK
    *         schema:
    *           $ref: '#/definitions/StadiumResponseDto'
    *       404:
    *         description: Not Found
    *       500:
    *         description: Error Server
   */
routes.put('/api/stadiums/:idStadium', [idStadiumValidation, stadiumValidation], validate, StadiumController.update);

/**
  * @swagger
    * /stadiums/{idStadium}:
    *   delete:
    *     description: Delete Stadium with give idStadium
    *     tags:
    *       - Stadiums
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: idStadium
    *         description:
    *         type: string
    *         required: true
    *         in: path
    *     responses:
    *       200:
    *         description: OK
    *       404:
    *         description: Not Found
    *       500:
    *         description: Error Server
   */
routes.delete('/api/stadiums/:idStadium', idStadiumValidation, validate, StadiumController.delete);
//#endregion

module.exports = routes;  