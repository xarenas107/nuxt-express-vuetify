import { Router } from 'express'

export const router = Router()
router.use('/ping',(req,res, next) => {
    setTimeout(() => { 
        res.status(200).json({ success:true }) 
    },1000)
})
