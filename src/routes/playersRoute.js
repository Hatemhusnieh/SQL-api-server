'use strict';
const express = require('express');
const router = express.Router();
const Interface = require('../models/players.controller');
const players = new Interface();

router.get('/', getPlayers);
router.get('/:id', getPlayers);
router.post('/', createPlayers);
router.put('/:id', updatePlayers);
router.delete('/:id', deletePlayers);

async function getPlayers(req, res, next){
  try {
    const id = req.params.id;
    const player = await players.read(id);
    res.status(200).json({ players: player.rows });
  } catch (error) {
    next(error);
  }
}

async function createPlayers(req, res, next){
  try {
    const data = req.body;
    const newPlayer = await players.create(data);
    res.status(200).json(newPlayer.rows[0]);
  } catch (error) {
    next(error);
  }
}

async function updatePlayers(req, res, next){
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedPlayer = await players.update(id, data);
    res.status(200).json(updatedPlayer.rows[0]);
  } catch (error) {
    next(error);
  }
}

async function deletePlayers(req, res, next){
  try {
    const id = req.params.id;
    const deletedPlayer = await players.delete(id);
    res.status(200).json(deletedPlayer.rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = router;