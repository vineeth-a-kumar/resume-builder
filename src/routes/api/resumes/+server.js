
import * as edgedb from "edgedb"
import e from "../../../../dbschema/edgeql-js"

let client = edgedb.createClient()

async function getData() {
  let result = await e.select(e.UserData, () => ({
    ...e.UserData['*']
  })).run(client)

  console.log('result: ', result);
  return result;
}

async function insertData(payload) {
  const query = e.insert(e.UserData, {
    name: payload.name,
    email: payload.email,
    dob: payload.dob,
    phone: payload.phone,
    address: e.insert(e.Address, {
      house_name: payload.address.house_name,
      city: payload.address.city,
      state: payload.address.state,
      street: payload.address.street,
      pin_code: payload.address.pin_code,
    }),
    skills: e.assert_distinct(
      e.set(...payload.skills.map((skill) => {
        return e.insert(e.Skills, {
          title: skill.title
        })
      }))
    ),
    hobbies: e.assert_distinct(
      e.set(...payload.hobbies.map((hobby) => {
        return e.insert(e.Hobbies, {
          title: hobby.title
        })
      }))
    ),
    projects: e.assert_distinct(
      e.set(...payload.projects.map((project) => 
        e.insert(e.Projects, {
          title: project.title,
          description: project.description
        })
      ))
    ),
    certificates: e.assert_distinct(
      e.set(...payload.certificates.map((certificate) => {
        return e.insert(e.Certificates, {
          title: certificate.title,
          authority: certificate.authority,
          url: certificate.url,
          start_date: certificate.start_date,
          end_ate: certificate.end_date
        })
      }))
    ),
    work: e.assert_distinct(
      e.set(...payload.works.map((work) => {
        return e.insert(e.WorkExperience, {
          company: work.company,
          designation: work.designation,
          description: work.description,
          technologies: e.assert_distinct(
            e.for(e.set(...work.technologies), (technology) => {
              return e.insert(e.Technologies, {
                title: technology
              })
            })
          ),
          start_date: work.start_date,
          end_ate: work.end_date
        })
      }))
    ),
    education: e.assert_distinct(
      e.set(...payload.educations.map((education) => {
        return e.insert(e.Education, {
          course: education.course,
          institute: education.institute,
          university: education.university,
          marks: education.marks,
          start_date: education.start_date,
          end_ate: education.end_date
        })
      }))
    ),
  }).run(client);
  return query;
}
export const GET = async () => {
  let res = await getData();
  return new Response(JSON.stringify({message: "Success", data: res}) , {status: 200})
}

export const POST = async ({ request }) => {
  const body = await request.json()
  console.log('body: ', body);
  let res = await insertData(body);
  console.log('res: ', res);
  return new Response(JSON.stringify({message: "Success", data: res}) , {status: 200})
}