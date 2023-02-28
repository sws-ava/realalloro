export default async (context, locale) => {
  
  const ress = await fetch(
    process.env.imagesBaseUrl + 'api/getTranslateUa'
  ).then(res => res.json())


    return ress

}

// export default {
//   dashboard_title: "Dashboard",
//   ttl: "Название на ua",
//   main_title: "Концепция",
//   main_desc: "Кафе японської та тайської кухні в Одесі Крабі Суші. Акції, подарунки, знижки. Доставка суші Krabi Одеса. Затишна атмосфера перенесе вас в атмосферу сходу.",
//   main_cont: "контент концепции на ua",
//   address: "г. Одеса, Грецька площа / Дерибасівська",
//   main: {
//     title: "Тайтл Головна сторiнка",
//     description: "Дескрипшн Головна сторiнка",
//     content: "Контент Головна сторiнка"
//   }
// }
