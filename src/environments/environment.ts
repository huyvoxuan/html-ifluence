// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseAPI: 'http://112.109.90.115:8080/api/v1/',

  tourApiUrl: 'http://112.109.90.115:8080/api/v1/tours/filter',
  eventApiUrl: 'http://112.109.90.115:8080/api/v1/events/filter',
  attractionApiUrl: 'http://112.109.90.115:8080/api/v1/attractions/filter'
};
