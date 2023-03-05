const express=require('express')
const app=express();
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const helmet=require('helmet')
const morgan=require('morgan')
const cors=require('cors')

const userRoute=require('./routes/users')
const authRoute=require('./routes/auth')
const postsRoute=require('./routes/posts')

dotenv.config()

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}
).then(()=>console.log('Connected to db'))
.catch((err)=>console.log(err))

//middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cors())


app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts',postsRoute)

const port=process.env.PORT || 8080

app.listen(port,()=>{
    console.log('Server is listening')
})

