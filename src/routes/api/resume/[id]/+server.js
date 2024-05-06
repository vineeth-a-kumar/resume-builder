
import * as edgedb from "edgedb"
import e from "../../../../../dbschema/edgeql-js"
import { Link } from "../../../../../dbschema/edgeql-js/modules/schema";

let client = edgedb.createClient()

async function getData(id) {
  let result = await e.select(e.UserData, () => ({
    ...e.UserData['*'],
    address: () => ({
      ...e.Address['*']
    }),
    skills: () => ({
      ...e.Skills['*']
    }),
    hobbies: () => ({
      ...e.Hobbies['*']
    }),
    projects: () => ({
      ...e.Projects['*']
    }),
    certificates: () => ({
      ...e.Certificates['*']
    }),
    work: () => ({
      ...e.WorkExperience['*'],
      technologies: () => ({
        ...e.Technologies['*']
      }),
    }),
    education: () => ({
      ...e.Education['*']
    }),
    filter_single: {id: id}
  })).run(client)
  return result;
}
function updateOrInsert(data, type){
  return e.assert_distinct(
    e.set(...data.map((item) => {
      if(item.id)
        return e.update(type, () => ({
          filter_single: {id: item.id},
          set: {
            title: item.title,
          }
        }))
      else
        return e.insert(e.Skills, {
          title: item.title
        })
      }))
  )
}
async function updateData(params,payload) {

  const query = e.update(e.UserData, () => ({
    filter_single: {id: params.id},
    set: {
      name: payload.name,
      email: payload.email,
      dob: payload.dob,
      phone: payload.phone,
      address: e.update(e.Address, () => ({
        filter_single: {id: payload.address.id},
        set: {
          house_name: payload.address.house_name,
          city: payload.address.city,
          state: payload.address.state,
          street: payload.address.street,
          pin_code: payload.address.pin_code,
        }
      })),
      skills: e.assert_distinct(
        e.set(...payload.skills.map((skill) => {
          if(skill.id)
            return e.update(e.Skills, () => ({
              filter_single: {id: skill.id},
              set: {
                title: skill.title,
              }
            }))
          else
            return e.insert(e.Skills, {
              title: skill.title
            })
        }))
      ),
      hobbies: e.assert_distinct(
        e.set(...payload.skills.map((hobby) => {
          if(hobby.id)
            return e.update(e.Hobbies, () => ({
              filter_single: {id: hobby.id},
              set: {
                title: hobby.title,
              }
            }))
          else
            return e.insert(e.Hobbies, {
              title: hobby.title
            })
        }))
      ),
      projects: e.assert_distinct(
        e.set(...payload.projects.map((project) => {
          if(project.id)
            return e.update(e.Projects, () => ({
              filter_single: {id: project.id},
              set: {
                title: project.title,
                description: project.description
              }
            }))
          else
            return e.insert(e.Projects, {
              title: project.title,
              description: project.description
            })
        }
        ))
      ),
      certificates: e.assert_distinct(
        e.set(...payload.certificates.map((certificate) => {
          if(certificate.id)
            return e.update(e.Certificates, () => ({
              filter_single: {id: certificate.id},
              set: {
                title: certificate.title,
                authority: certificate.authority,
                url: certificate.url,
                start_date: certificate.start_date,
                end_ate: certificate.end_date
              }
            }))
          else
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
        e.set(...payload.work.map((work) => {
          if(work.id)
            return e.update(e.WorkExperience, () => ({
              filter_single: {id: work.id},
              set: {
                company: work.company,
                designation: work.designation,
                description: work.description,
                technologies: e.assert_distinct(
                  e.set(...work.technologies.map((technology) => {
                    if(technology.id)
                      return e.update(e.Technologies, () => ({
                        filter_single: {id: technology.id},
                        set: {
                          title: technology.title,
                        }
                      }))
                    else
                      return e.insert(e.Technologies, {
                        title: technology.title
                      })
                  }))
                ),
                start_date: work.start_date,
                end_ate: work.end_date
              }
            }))
          else
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
        e.set(...payload.education.map((education) => {
          if(education.id)
            return e.update(e.Education, () => ({
              filter_single: {id: education.id},
              set: {
                course: education.course,
                institute: education.institute,
                university: education.university,
                marks: education.marks,
                start_date: education.start_date,
                end_ate: education.end_date
              }
            }))
          else
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
    }
  })).run(client);
  
  return query;
}
export const GET = async ({params}) => {
  let res = await getData(params.id);
  console.log('res: ', res);
  return new Response(JSON.stringify({message: "Success", data: res}) , {status: 200})
}

export const PUT = async ({ request, params }) => {
  const body = await request.json()
  console.log('body: ', body);
  let res = await updateData(params,body);
  console.log('res: ', res);
  return new Response(JSON.stringify({message: "Success", data: res}) , {status: 200})
}