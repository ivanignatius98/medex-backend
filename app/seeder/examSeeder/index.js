const Exam = require("../../models/exam")
const mongoose = require("mongoose")
const questions = require("./questions_2.json")
require('dotenv').config()
const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const run = async () => {
  const mongoConnection = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}`
  mongoose.connect(
    mongoConnection,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (errMongo) => {
      if (errMongo != null) {
        console.log("MONGO CONNECTION ERROR : ", errMongo)
      }
    })

  const exam = {
    title: `ILMU BEDAH #2`,
    description: `SOAL PREDIKSI BATCH 3 2020 #2`,
    type: "REGULAR",
    category: "Anestesi",
    thumbnail: "",
    duration: 120,
    membership: "GOLD"
  }

  // let parsedQ = []
  // for (let { desc, correct_answer } of questions) {
  //   let arr = desc.split("a.")
  //   let opt = arr[1].trim()
  //     .replace('b.', 'a.')
  //     .replace('c.', 'a.')
  //     .replace('d.', 'a.')
  //     .replace('e.', 'a.')
  //     .split("a.")
  //   opt = opt.map(s => s.replace('\n', '').trim())
  //   parsedQ = [...parsedQ, {
  //     description: arr[0],
  //     options: opt,
  //     correct_answer,
  //   }]
  // }

  // exam.questions = parsedQ

  exam.questions = questions
  // await Exam.deleteMany({})
  // let exam = []
  // while (exam.length <=5) {
  //   let questions = []
  //   let qcount = exam.length == 0 ? 10 : 20
  //   for (let i = 0; i < qcount; i++) {
  //     const options = [
  //       { "value": "Option A" },
  //       { "value": "Option B" },
  //       { "value": "Option C" },
  //       { "value": "Option D" }
  //     ]
  //     questions = [...questions, {
  //       title: `Question ${i + 1}`,
  //       type: "MULTIPLE_CHOICE",
  //       correct_answer: options[randomInteger(0, options.length - 1)].value,
  //       options
  //     }]
  //   }
  //   exam = [...exam, {
  //     title: `Tryout ${exam.length + 1}`,
  //     description: `Tryout ${exam.length + 1} Description`,
  //     type: "REGULAR",
  //     thumbnail: "",
  //     duration: 120,
  //     membership: "GOLD",
  //     questions
  //   }]
  // }
  await Exam.insertMany([exam])
  console.log("done")
}

run()