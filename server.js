import * as axios from "axios";

const URL_PREFIX = "";

export function lookuptables_getAll() {
  return axios.get(URL_PREFIX + "/api/lookuptables");
}

export function cmsTemplates_getById(id) {
  return axios.get(URL_PREFIX + "/api/cms/templates/" + id);
}

export function cmsTemplates_create(data) {
  return axios.post(URL_PREFIX + "/api/cms/templates", data);
}

export function cmsTemplates_update(data) {
  return axios.put(URL_PREFIX + "/api/cms/templates/" + data.id, data);
}

export function cmsTemplates_getAll() {
  return axios.get(URL_PREFIX + "/api/cms/templates");
}

export function cmsTemplates_delete(id) {
  return axios.delete(URL_PREFIX + "/api/cms/templates/" + id);
}

export function cmsPages_getAll() {
  return axios.get(URL_PREFIX + "/api/cms/pages");
}

export function cmsPages_create(data) {
  return axios.post(URL_PREFIX + "/api/cms/pages", data);
}

export function cmsPages_delete(id) {
  return axios.delete(URL_PREFIX + "/api/cms/pages/" + id);
}

export function cmsPages_getById(id) {
  return axios.get(URL_PREFIX + "/api/cms/pages/" + id);
}

export function cmsPages_update(data) {
  return axios.put(URL_PREFIX + "/api/cms/pages/" + data.id, data);
}
