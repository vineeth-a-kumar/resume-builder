export const load = async ({fetch}) => {

  const fetchResume = async () => {
    const res = await fetch('/api/resumes')
    console.log('res: ', res);
    const data = await res.json()
    console.log('data: ', data);
    return data.data
  }
  return {
    resumes: await fetchResume()
  }
}