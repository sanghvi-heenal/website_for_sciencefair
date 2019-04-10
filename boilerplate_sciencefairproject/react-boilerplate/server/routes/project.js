var express = require('express'),
bodyParser = require('body-parser');;
const request=require('request');
// to save data
const Project=require('../Model/projectmodel');
const User=require('../Model/usermodel');
const Judge=require('../Model/judgemodel');
const router=express.Router();


