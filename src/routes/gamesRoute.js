'use strict';
const express = require('express');
const router = express.Router();
const Interface = require('../models/games.controller');
const games = new Interface();

router.get('/', getGames);
router.get('/:id', getGames);
router.post('/', createGames);
router.put('/:id', updateGames);
router.delete('/:id', deleteGames);

async function getGames(req, res, next) {
  try {
    const id = req.params.id;
    const game = await games.read(id);
    res.status(200).json({ games: game.rows });
  } catch (error) {
    next(error);
  }
}

async function createGames(req, res, next) {
  try {
    const data = req.body;
    const newGame = await games.create(data);
    res.status(200).json(newGame.rows[0]);
  } catch (error) {
    next(error);
  }
}

async function updateGames(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedGame = await games.update(id, data);
    res.status(200).json(updatedGame.rows[0]);
  } catch (error) {
    next(error);
  }
}

async function deleteGames(req, res, next) {
  try {
    const id = req.params.id;
    const deletedGame = await games.delete(id);
    res.status(200).json(deletedGame.rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = router;