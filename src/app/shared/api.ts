import { environment } from '../../environments/environment';

export const API = {
  URL: {
    USER: {
      LOGIN : `${environment.baseAPI}members/manuallogin`,
      LOGINFB: `${environment.baseAPI}members/fblogin`,
      LOGOUT: `${environment.baseAPI}members/logout`,
      REGISTER: {
        MANUAL: `${environment.baseAPI}members/manualmember`,
        FACEBOOK: `${environment.baseAPI}members/fbmember`
      },
      FORGOTPASS: `${environment.baseAPI}members/passwordforgot`,
      CHANGEPASS: `${environment.baseAPI}members/change-password`,
      DETAIL: `${environment.baseAPI}members/memberprofile/{id}`,
      UPDATE: `${environment.baseAPI}members/update/detail`
    },
    TOURS: {
      DEFAULT: `${environment.baseAPI}tours`,
      FILTER: `${environment.baseAPI}tours/filter`,
      TOURDETAILLOGGEDIN: `${environment.baseAPI}tours/gettourdetail`,
      BOOKING: `${environment.baseAPI}tourregistrations/register`,
      REGISTERED: {
        FILTER: `${environment.baseAPI}tours/registered`,
        DETAIL: `${environment.baseAPI}tourregistrations/{TourRegistrationId}`,
        CANCEL: `${environment.baseAPI}tourregistrations/{TourRegistrationId}/cancel`,
        UPDATE: `${environment.baseAPI}tourregistrations/update`,
        AUTOCOMPLETE: `${environment.baseAPI}tours/filterbymember?Name=`
      }
    },
    EVENTS: {
      DEFAULT: `${environment.baseAPI}events`,
      FILTER: `${environment.baseAPI}events/filter`
    },
    GETSTATEANDCOUNTRY : `${environment.baseAPI}countries/getstateandcountry?filterString=`,
    COMMENTS: {
      ADD: {
        PREFIX: `${environment.baseAPI}comments/`,
        SURFIX: `/comment`
      },
      TYPE: `${environment.baseAPI}comments/{typeName}?parentID=`
    },
    TIPS: {
      DEFAULT: `${environment.baseAPI}tips/`,
      FILTER: `${environment.baseAPI}tips/filter`,
      TIPTYPE: `${environment.baseAPI}tips/tiptype`,
      RECOMMENDED: `${environment.baseAPI}tips/recommended`,
      SUGGESTTIPTYPE: `${environment.baseAPI}tips/suggest?tiptypeids=`
    },
    ATTRACTIONS: {
      DEFAULT: `${environment.baseAPI}attractions`
    },
    LIKE: {
      DEFAULT: `${environment.baseAPI}likes` // likes/{likeType:string}/{parentId:int}/{isLike:int}/like
    },
    VOUCHERS: {
      VALIDATE: `${environment.baseAPI}vouchers/validate?PromotionCode=`,
      FILTER: `${environment.baseAPI}vouchers/filter`,
      CAMPAIGN: `${environment.baseAPI}vouchers/filtercampains`,
      CHANGEPOINT: `${environment.baseAPI}vouchers/createvouchermember/{campaignId}`
    },
    COUNTRY: {
      GETALL: `${environment.baseAPI}countries/getall`
    },
    TEMPERATURE: {
      APIKEY: `f9d2d0fa59bca7c7d4d75acc5f27fad6`,
      GET: `http://api.openweathermap.org/data/2.5/weather?APPID=f9d2d0fa59bca7c7d4d75acc5f27fad6`
    },
    BANK: {
      VISA: `${environment.baseAPI}bankaccounts/get-bank-visa`,
      DOMESTIC: `${environment.baseAPI}bankaccounts/get-bank`
    },
    COMPANY: {
      CONTACT: `${environment.baseAPI}travelsmartinfo/companyinfo`,
      BRANCHES: `${environment.baseAPI}utilities/get-site`
    },
    NEWS: {
      FILTER: `${environment.baseAPI}news/filters`,
      DETAIL: `${environment.baseAPI}news/{newsId}`
    },
    EMAIL: {
      FEEDBACK: `${environment.baseAPI}supports/addfeedback`,
      SUBSCRIBE: `${environment.baseAPI}supports/subscribe`
    },
    RECRUITMENT: {
      FILTER: `${environment.baseAPI}careers`,
      DETAIL: `${environment.baseAPI}careers/{id}`
    },
    FOOTER: {
      LIST: `${environment.baseAPI}tours/filter-tour-category?pageSize=100`,
      DETAIL: `${environment.baseAPI}tours/tour-category/{tourCategoryId}`
    }
  },
  HEADER: {
    DEFAULT: {
      'Content-Type': 'application/json; charset=UTF-8',
      DeviceTypeId: 3,
      CultureId: 'vn',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
    },
    KEY: {
      APPTOKEN: 'ApplicationTokenId',
      AUTH: 'Authorization',
      AUTHPREFIX: 'Bearer '
    }
  },
  FACEBOOK: {
    APPID: '366751917060822',
    APPSECRET: '3975ae89c766060f32a245eb0ac2ab5a',
    VERSION: 'v2.5',
    COOKIE: false, // enable cookies to allow the server to access
    XFBML: true // parse social plugins on this page
  }
}
