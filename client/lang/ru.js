export default async (context, locale) => {
  
    const ress = await fetch(
      process.env.imagesBaseUrl + 'api/getTranslateRu'
    ).then(res => res.json())


      return ress

}


