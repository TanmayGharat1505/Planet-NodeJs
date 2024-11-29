import express from 'express';
import planetModel from '../models/planetModel.js'

const router = express.Router()

router.post("/",(req,res)=>{
    const planet =req.body;

    planetModel.create(planet).then(()=>{
        res.status(201).send({message:"Planet created successfully"})
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({message:"Some Error"})
    })
})

router.get("/",(req,res)=>{
       planetModel.find().then((data)=>{
              res.send(data)
       }).catch((err)=>{
         res.send({messsage:"Some Problem"})
       })
})

router.get("/:id",(req,res)=>{
    const id = req.params.id 

    planetModel.findById(id).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
         res.status(500).send({message:"Some Problem"})
    })
})

router.put('/:id',(req,res)=>{
    const id = req.params.id
    const planet =req.body

    planetModel.findById(id).then((existingPlanet)=>{
            if(existingPlanet!==null){
                planetModel.findByIdAndUpdate(id,planet).then((data)=>{
                    res.send({messsage:"Planet Updated Successfull"})
                }).catch((err)=>{
                    console.log(err)
                    res.send({message:"Some Problem"})
                })
            }else{
                res.status(404).send({messsage:"Planet Not Found"})
            }
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({message:"Some Problem"})
    })

})

router.delete('/:id',(req,res)=>{
    const id = req.params.id
    const planet = req.body

    planetModel.findById(id).then((existingPlanet)=>{
         if(existingPlanet!=null){
            planetModel.findByIdAndDelete(id,planet).then((data)=>{
              res.status(200).send({message:"Planet Delete Successfull"})
            }).catch((err)=>{
                console.log(err)
                res.status(500).send({message:"Some Problem"})
            })
         }else{
            res.status(404).send({message:"Planet Not Found"})
         }
    })
})



export default router 