import prisma from "./index.js"

async function main(){
    await prisma.availableTriggers.create({
        data:{
            id:"webhook",
            name:"webhook",
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVQtyw3YP4pW8owoHsGyCI2o8POL2m7Hf9NA&s"
        }
    })

    await prisma.availableAction.createMany({
        data:[{
            id:"send-sol",
            name:"send solana",
            image:"https://i.pinimg.com/736x/bd/f5/06/bdf5066589b7865a55d6790c210dba6d.jpg"
        },
        {
            id:"send-email",
            name:"send email",
            image:"https://thumbs.dreamstime.com/b/gmail-email-logo-icon-beautiful-meticulously-designed-225149202.jpg"     
        }
    ]

    })
}
main()