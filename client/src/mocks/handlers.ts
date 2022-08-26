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
        
        return res(
            ctx.status(403),
            ctx.json({message:'я тебе охуенно сделаю'})
        )

    })

]