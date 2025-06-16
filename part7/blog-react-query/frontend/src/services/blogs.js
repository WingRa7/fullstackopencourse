import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const createComment = async ({ body, id }) => {
  const commentBody = { body: body }
  console.log('commentObject', body)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    commentBody,
    config
  )
  return response.data
}

const update = async (updateObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(
    `${baseUrl}/${updateObject.id}`,
    updateObject,
    config
  )
  return response.data
}

const remove = async (toDeleteObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${toDeleteObject.id}`, config)
  return response.data
}

export default { getAll, create, createComment, setToken, update, remove }
