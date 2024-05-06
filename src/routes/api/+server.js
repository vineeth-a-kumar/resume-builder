
import * as edgedb from "edgedb"

let client = edgedb.createClient()

async function main() {
  const result = await client.query(`select 2 + 2;`);
  console.log(result); // [4]
}

async function getData() {
  const result = await client.query(`
    select UserData {
      name,
      address: {
        house_name,
      }
    }
  `);

  console.log('result: ', result);
  return result;
}

async function insertData() {
  await client.execute(`
    insert UserData { 
      name := "Robert Downey Jr.", 
      email:="robert@test.in",
      address := {(
        insert Address {
          house_name := "technopark"
        }
      )},
    };
    insert UserData { 
      name := "Scarlett Johansson", 
      email:="scarlett@test.in",
      address := {(
        insert Address {
          house_name := "techno"
        }
      )},
    };
    insert UserData {
      name := "john",
      email:="john@test.in",
      address := {(
        insert Address {
          house_name := "techy"
        }
      )},
    };
  `);
}

export const GET = async () => {
  await insertData()
  // let res = await getData();
  // console.log('res: ', res);
  return new Response(JSON.stringify({message: "Success", data: 'res'}) , {status: 200})
}

export const POST = async ({ request }) => {
  const body = await request.json()
  console.log('body: ', body);
  // await insertData()
  let res = await getData();
  console.log('res: ', res);
  return new Response(JSON.stringify({message: "Success", data: res}) , {status: 200})
}