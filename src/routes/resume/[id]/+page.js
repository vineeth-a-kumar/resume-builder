export const load = async ({fetch,params}) => {

    const fetchResume = async () => {
      const res = await fetch('/api/resume/'+ params.id)
      console.log('res: ', res);
      const data = await res.json()
      console.log('data: ', data);
      return data.data
    }
    return await fetchResume()
  }