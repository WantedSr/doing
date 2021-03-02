import request from "../util/request";

export default async function getJuejinData(limit = 30, offset = 0, category = "frontend", order = "heat"){
  return await request.post("https://e.xitu.io/resources/gold",{
      category: category,
      limit: limit,
      offset: offset,
      order: order,
    }
)
}