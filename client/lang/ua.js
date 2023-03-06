export default async (context, locale) => {
  
  const ress = await fetch(
    process.env.imagesBaseUrl + 'api/getTranslateUa'
  ).then(res => res.json())


    return ress

}


