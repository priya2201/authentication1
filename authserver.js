
require('dotenv').config();
const express=require('express');
const app=express();
const jwt=require('jsonwebtoken');
app.use(express.json())
let refreshTokens=[]

app.post('/token',(req,res)=>{
    const refreshToken=req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    if(refreshTokens.includes(refreshToken))
    return res.sendStatus(403)
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
    if(err)return res.sendStatus(403) 
    const accessToken=generateAccessToken({name:user.name})
    res.json({accessToken:accessToken})
    })

})
// {
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjgwNzI3NjUsImV4cCI6MTY2ODA3MzAwNX0.jD10ygA6vJ9ttXxm5gIkG0aPgvCW99xtO4BVug1RNZ0",
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjgwNzI3NjV9.aaWuzwiwnGi_U7JzAjK-8dWjJvvFbtsusnf7bUZtuIY"
// }
// {
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjgwNzE4NjYsImV4cCI6MTY2ODA3MjEwNn0.tGRd2eYucAiOjzhWFHxYNyqbX9DCEzaeVRopWBntJZo",
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjgwNzE4NjZ9.rMuAJobunsiOxKM4P6I7EigW9ZNbCuBSyOp2eMJ-Vnk"
// }
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjgwNzIwODJ9.xUFzWyZrvR4v2TKec8GkCjp78WoduRgw0NXlMHY46ro


app.post('/login',(req,res)=>{
    console.log(req.body)
    const username=req.body.username
    console.log(username)
    const user={name:username}
    const accessToken =generateAccessToken(user)
    const refreshToken=jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({accessToken:accessToken,refreshToken:refreshToken})

})
function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn : '4m'})

}
// {
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjgwNzA5ODQsImV4cCI6MTY2ODA3MTIyNH0.w66iPvuyKadAWEn-nxaiBxsvJTDkWloE1ZMVwQZqbhc",
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjgwNzA5ODV9.MwNGmoZtGHNslN7wx-S1VV8texTrgWGZXHsoSF9K3es"
// }

// "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjgwNzEzMzksImV4cCI6MTY2ODA3MTU3OX0.tVZsFQclMmBvOKegrXPu69OOGjzkzkec1jLQm_Ma7sc",
// "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjgwNzEzMzl9.Ba_kHH8wHqw8Pc2HVsHUujk-t9P9XYJpl4_eEzUwi4Y"
// }
// function authenticateToken(req,res,next){
// //Bearer TOKEN 
// console.log(req.headers)
// const authHeader=req.headers['authorization']
// const token=authHeader  && authHeader.split(' ')[1]
// if(token  == null )return res.status(401)
// jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
//     if(err) return res.sendStatus(403)
//     req.user=user
//     next()
// })
     
// }
app.listen(4000,()=>{
    console.log("Successfully Connected")
})