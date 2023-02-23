const UserSchema = require('./Models/User.js')
const BCrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const AuthController = {
    Registration : async(req,res) => {
        const {Name,UserName,PhoneNumber,Email,Gender,Password} = req.body;
        const TempName = Name
        const TempUserName = UserName.toLowerCase();
        const TempEmail = Email;
        const TempPhoneNumber = PhoneNumber;
        const TempGender = Gender;
        const PresentUserName = await User.findOne({UserName : TempUserName});
        //Checking if username is present
        if(PresentUserName)
        {
            res.status(400).send('User Already Present');
        }//Checking if email is present
        const EmailPresent = await User.findOne({Email : TempEmail});
        if(EmailPresent)
        {
            res.status(400).send('User already present');
        }
        //Checking if phone number is present
        const PhoneNumberPresent = await User.findOne({PhoneNumber : TempPhoneNumber});
        if(PhoneNumberPresent)
        {
            res.status(400).send('User already present');
        }
        //Hashing the password
        var Salt = BCrypt.genSaltSync(10);
        const PasswordHashed = BCrypt.hashSync(Password,Salt);
        const NewUser = new User({Name : TempName,UserName : TempUserName,PhoneNumber : TempPhoneNumber,Email : TempEmail,Gender : TempGender,Password : PasswordHashed});
        const TempAccessToken = CreateAccessToken({ID : NewUser._id})
        const TempRefreshToken = CreateRefreshToken({ID : NewUser._id})
        res.cookie('RefreshToken',TempRefreshToken,{
            httpOnly : true,
            maxAge : 30*24*60*60*100
        })
        await NewUser.save()
        res.json({
            message : 'Registration Success',
            TempAccessToken,
            User : {
                ...NewUser._doc,
                password : ''

            }
        })
    },
    Login : async(req,res) => {
        const {Email,Password} = req.body;
        const TempEmail = Email
        const UserIsPresent = await User.findOne({Email : TempEmail});
        if(!UserIsPresent){
            res.status(400).json({'msg' : 'User not present in database'});
        }
        const Match = BCrypt.compare(Password,UserIsPresent.Password);
        if(!Match)
        {
            res.status(400).json({'message' : 'Passwords do not match'})
        }
        const
    }
    
}
//References  :  https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
const CreateAccessToken = (Data) => {
    return JWT.sign(Data,process.env.ACCESS_SECRET_TOKEN, {expiresIn : '1d'});
}
//References  : https://www.izertis.com/en/-/refresh-token-with-jwt-authentication-in-node-js#:~:text=For%20the%20refresh%20token%2C%20we,a%20limited%20period%20of%20time).
const CreateRefreshToken = (Data) => {
    return JWT.sign(Data,process.env.REFRESH_SECRET_TOKEN, {expiresIn : '30d'})
}