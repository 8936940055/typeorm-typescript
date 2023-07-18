const { verify } = require('jsonwebtoken')
import express, { NextFunction } from "express";

module.exports = {
    checkToken: (req : express.Request, res : express.Response, next: NextFunction) => {

        let token = req.headers.authorization?.split(" ")[1];
        console.log("token  ::", token)
        if (token) {
            // token = token.slice(7);
            verify(token, "sachin@123", (err: any, decoded: any) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: "Invalid Token"
                    })
                } else {
                    next();
                }
            })
        }
        else {
            res.json({
                success: 0,
                message: "Access Denied.Unauthorized"
            })
        }
    }

}