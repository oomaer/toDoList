

export const MOCK_GET_USER = (req:any, res:any, ctx:any) => {
    return res(
        ctx.status(200),
        ctx.json({
            success: true,
            message: 'User Authenticated',
            user: {
                username: 'testuser',
                email: 'testuser@gmail.com',
                _id: '1234567890'
            }
        })
    )
} 

export const MOCK_GET_USER_ERROR = (req:any, res:any, ctx:any) => {
    return res(
        ctx.status(400),
        ctx.json({
            success: false,
            message: 'User not Authenticated',
            user: {}
        })
    )
}

export const MOCK_LOGIN_USER = (req:any, res:any, ctx:any) => {
    return res(
        ctx.status(200),
        ctx.json({
            success: true,
            message: 'User Authenticated',
            user: {
                username: 'testuser',
                email: 'testuser@gmail.com',
                _id: '1234567890'
            }
        })
    )
}

export const MOCK_REGISTER_USER = (req:any, res:any, ctx:any) => {
    return res(
        ctx.status(200),
        ctx.json({
            success: true,
            message: 'User Registered',
            user: {
                username: 'testuser',
                email: 'testuser@gmail.com',
                _id: '1234567890'
            }
        })
    )
}

