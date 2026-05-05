import express from "express"
import prisma from "../config/prisma.js"
import authMiddleware from "../middlewares/auth.js"

const router = expr