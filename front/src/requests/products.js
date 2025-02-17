import backUrl from ".";

export async function getProducts(offset,limit,order,search,category){

  var result = await backUrl.get(`/products`,{offset: 20,limit,order,search,category})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

  return result
}


export async function getProduct(id){
  var result = await backUrl.get(`/products/${id}`)
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}


export async function updateProduct(id,data){
  var result = await backUrl.put(`/products/${id}`,data,{headers: {token: cookies().get("token")?.value}})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}

export async function createProduct(data){
  var result = await backUrl.post(`/products/`,data,{headers: {token: cookies().get("token")?.value}})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}

export async function deleteProduct(id){
  var result = await backUrl.delete(`/products/${id}`,{headers: {token: cookies().get("token")?.value}})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}