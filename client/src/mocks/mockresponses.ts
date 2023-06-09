

export const MOCK_GET_USER = (req:any, res:any, ctx:any) => {
    return res(
        ctx.status(200),
        ctx.json({
            success: true,
            message: 'User Authenticated',
            data: {
                username: 'testuser',
                email: 'testuser@gmail.com',
                _id: '1234567890'
            }
        })
    )
} 