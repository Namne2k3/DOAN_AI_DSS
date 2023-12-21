const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const configApp = (app) => {

    // config app use req.body ( body parser )
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))

    // Sử dụng middleware CORS để cài đặt cấu hình CORS mặc định
    // Là một cơ chế cho phép trình duyệt yêu cầu các tài nguyên từ một tên miền khác
    app.use(
        cors({
            credentials: true,
            origin: ["http://localhost:5173"]
        })
    );

    // config app use Cookie
    app.use(cookieParser())
}

module.exports = configApp