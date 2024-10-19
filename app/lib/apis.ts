import axios from "axios";
import { EmailType } from "../types/custTypes";

export function getEmails(currentPage:number){
    return axios.get(`https://flipkart-email-mock.now.sh/?page=${currentPage}`)
}
export function getEmailDetails(id:string){
    return axios.get(`https://flipkart-email-mock.now.sh/?id=${id}`)
}
