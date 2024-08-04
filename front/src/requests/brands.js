import backUrl from ".";

export async function getBrands(offset,limit,order,search){

  var result = await backUrl.get(`/brands`,{offset: 20,limit,order,search})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

  return result
}


export async function getBrand(id){
  var result = await backUrl.get(`/brands/${id}`)
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}


export async function updateBrand(id,data){
  var result = await backUrl.put(`/brands/${id}`,data,{headers: {token: cookies().get("token")?.value}})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}

export async function createBrand(data){
  var result = await backUrl.post(`/brands/`,data,{headers: {token: cookies().get("token")?.value}})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}

export async function deleteBrand(id){
  var result = await backUrl.delete(`/brands/${id}`,{headers: {token: cookies().get("token")?.value}})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}