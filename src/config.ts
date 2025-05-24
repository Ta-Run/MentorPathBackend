import dotenv from 'dotenv';
dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

const {
    production,
    port,
    db_host,
    db_user,
    db_pass,
    db_name,
    jwt_token,
    token_expin_expiry_time,
    email_token,
    email_token_expiry_time,
    dbURI,
    mail_email,
    mail_pass,
    krvLogo
} = process.env;



const environments = {
    production,
    port,
    db_host,
    db_user,
    db_pass,
    db_name,
    jwt_token,
    token_expin_expiry_time,
    email_token,
    email_token_expiry_time,
    dbURI,
    mail_email,
    mail_pass,
    krvLogo
}


export const environment = environments;