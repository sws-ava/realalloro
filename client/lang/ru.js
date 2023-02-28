export default async (context, locale) => {
  
    const ress = await fetch(
      process.env.imagesBaseUrl + 'api/getTranslateRu'
    ).then(res => res.json())


      return ress

}


// export default {
//   dashboard_title: "Dashboard",
//   ttl: "Название на ру",
//   main_title: "Концепция",
//   main_desc: "Кафе японской и тайской кухни в Одессе Краби Суши. Акции, подарки, скидки. Доставка суши Krabi Одесса. Уютная атмосфера, перенесет вас в атмосферу востока. ",
//   address: "<b>г. Одесса, Греческая площадь / Дерибасовская</b>",
//   main: {
//     title: "Тайтл Главная страница",
//     description: "Дескрипшн  Главная страница",
//     content: "Контент Главная страница"
//   }
// }
