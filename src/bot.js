require("dotenv").config();
const { Telegraf } = require("telegraf");
// const { default: Xhr } = require("xhr");
const Messages = require("./botMessages");
const msg = new Messages();
const bot = new Telegraf(process.env.TG_TOKEN);
let id = 1

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}

async function FetchFilm(ctx) {
  if (id <= 1){
    id = 1
  }
  if (id >= 57){
    id = 1
  }

var XMLHttpRequest = require('xhr2');
var xhr = new XMLHttpRequest();

xhr.open("GET",`https://www.breakingbadapi.com/api/characters/${id}`)
xhr.onload = () => {
    let data = JSON.parse(xhr.response)
    console.log(data)
        for (let i in data) {
        setTimeout(() => {
          ctx.reply(`
                      ${data[i].img}
                      Айди: ${data[i].char_id} 
                      Имя: ${data[i].name} 
                      День Рождение: ${data[i].birthday} 
                      Статус: ${data[i].status} 
                      Никнейм: ${data[i].nickname} 
                  `);
        }, 700);
      }
}
xhr.send()
}

bot.command("film", (ctx) => {
  ctx.reply("Фильм Во все тяжкие", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Узнать Информацию", callback_data: "InfoCheck" },
        ],
      ],
    },
  });
});

bot.action("InfoCheck", async (ctx) => {
  ctx.reply("Вы находитесь в категории Актеров", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Показать Актеров", callback_data: "ShowPersonFilm" },
        ],
      ],
    },
  });

  bot.action("ShowPersonFilm", async (ctx) => {
    FetchFilm(ctx,id=1)
    setTimeout(() => {
      ctx.reply("Вы находитесь в категории Актеров", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Предыдущий", callback_data: "backP" },
              { text: "Следующий", callback_data: "nextS" },
              

            ],
            [
              { text: "Назад", callback_data: "back" },
              { text: "Случайный", callback_data: "random" },
            ],
          ],
        },
      }); 
    }, 3000);

    bot.action("backP", async (ctx) =>{

      FetchFilm(ctx,id-=1)
      setTimeout(() => {
        ctx.reply("Вы находитесь в категории Актеров", {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Предыдущий", callback_data: "backP" },
                { text: "Следующий", callback_data: "nextS" },
                

              ],
              [
                { text: "Назад", callback_data: "back" },
                { text: "Случайный", callback_data: "random" },
              ],
            ],
          },
        }); 
      }, 3000);
    } )
    bot.action("nextS", async (ctx) =>{
      FetchFilm(ctx,id+=1)
      setTimeout(() => {
        ctx.reply("Вы находитесь в категории Актеров", {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Предыдущий", callback_data: "backP" },
                { text: "Следующий", callback_data: "nextS" },
                

              ],
              [
                { text: "Назад", callback_data: "back" },
                { text: "Случайный", callback_data: "random" },
              ],
            ],
          },
        }); 
      }, 3000);
      
    } )
    

  bot.action("back", async (ctx) => {
    ctx.reply("Вы находитесь в категории Актеров", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Показать Актеров", callback_data: "ShowPersonFilm" },
          ],
        ],
      },
    });  
  })
  });
});


bot.action("random", (ctx) =>{
    id = getRandomInt(0,57)
    FetchFilm(ctx,id)
      setTimeout(() => {
        ctx.reply("Вы находитесь в категории Актеров", {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Предыдущий", callback_data: "backP" },
                { text: "Следующий", callback_data: "nextS" },
                

              ],
              [
                { text: "Назад", callback_data: "back" },
                { text: "Случайный", callback_data: "random" },
              ],
            ],
          },
        }); 
      }, 3000);
})


bot.start((ctx) => ctx.reply(msg.start(ctx)));
bot.help((ctx) => ctx.reply(msg.help()));

const PORT = process.env.PORT || 3000;

bot.launch({
    webhook: {
        domain: `https://breakingbadmoviebot.herokuapp.com/`,
        port: PORT,
    }
});
