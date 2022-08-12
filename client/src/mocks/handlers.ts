import { rest } from 'msw'



export const handlers = [

    // rest.post('http://localhost:500/api/user/check', (req, res, ctx) => {

    //     return res(
    //         ctx.json({message:'check'})
    //     )
    // }),

    // rest.get('http://localhost:5000/api/user/auth', (req, res, ctx) => {

    //     return res(
    //         ctx.json({message:'auth'})
    //     )
    // }),

    // rest.get('http://localhost:5000/api/device', (req, res, ctx) => {

    //     return res(
    //         ctx.json({message:'device'})
    //     )
    // }),


    rest.post('http://localhost:5000/api/user/login', async (req, res, ctx) => {
        
        // const {email} = await req.email

        const {email} = await req.json()
        console.log(email)
        if(email === "s_adm@mail.com") {
            return req.passthrough()
        }

        return res(
            ctx.cookie('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6IkpvaG4gWmFsdXBpbnMiLCJyb2xlIjoiU1VQRVJfQURNSU4ifQ.55nDQmXrA36SHZucfbKwyGKMSe8QBwqc983tXPgLIG8')
        )  
    })

]