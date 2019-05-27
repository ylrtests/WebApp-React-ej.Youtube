export const URL = "http://API-Rest-Laravel-YS:8080/api"
export const getToken = () => {
    return localStorage.getItem("jwt")
}
