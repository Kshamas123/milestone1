const express = require('express');
const menu=require('../data/menu');
const router = express.Router();

router.post('/',(req,res)=>{
    const {name,price,category}=req.body;
    if(!name || !price || price<0 || !category ||typeof price!=='number')
        return res.status(400).json({error:'invalid data'})
    const id=menu.length+1;
    menu.push({id,name,price,category})
    res.status(201).json({message:"menu item added"})
})

router.get('/',(req,res)=>{
    res.status(200).json(menu);
})

module.exports=router