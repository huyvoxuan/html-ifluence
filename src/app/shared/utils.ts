export class Utils {
  /**
   * save param for search tour
   */
  public static parameSearchString =  '';
  public static unAuthorized = 'Unauthorized';
  /**
   * show warning emessage
  **/
  public static warningMessage = (message: string, element: Element) => {
    element.innerHTML = message;
    setTimeout (function () {
      element.innerHTML = '';
    }, 3000);
  }
  /**
   * format date time to dd/mm/yyyy
  **/
  public static formatDateToString = (date: Date, formatType?: string): string => {
    date = new Date(date);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const strDay = (day < 10) ? `0${day}` : day;
    const strMonth = (month < 10) ? `0${month}` : month;
    let returnValue: string;

    switch (formatType) {
      case 'dd/mm/yyyy':
        returnValue = `${strDay}/${strMonth}/${year}`;
        break;
      case 'dd-mm-yyyy':
        returnValue = `${strDay}-${strMonth}-${year}`;
        break;
      case 'mm/dd/yyyy':
        returnValue = `${strMonth}/${strDay}/${year}`;
        break;
      default:
        returnValue = `${strDay}/${strMonth}/${year}`;
        break;
    }
    return returnValue;
  }
  /**
   * return random backgourd color
   */
  public static randomColor = (): string => {
    const array = ['bg-violet', 'bg-orange', 'bg-blue', 'bg-green', 'bg-yellow'];
    return array[ Math.floor(Math.random() * array.length) ];
  }
  /**
   * return stand for name/member/user
   */
  public static standForName = (firstName?: string, lastName?: string): string => {
    let standFor = '';
    if (firstName) {
      standFor = firstName.charAt(0);
    }
    if (lastName) {
      standFor = `${standFor}${lastName.charAt(0)}`;
    }
    return standFor;
  }
  /**
   * check user logged in or not
   */
  public static isLoggedIn = (): boolean => {
    if (sessionStorage.getItem('sessionToken') && sessionStorage.getItem('sessionToken').length) {
      return true;
    }
    return false;
  }
  /**
   * return difference time (hours) between 2 time points
  */
  public static differentTime = (time: string): number => {
    const prevTime = new Date(time).valueOf();
    const currentTime = new Date().valueOf();
    const differentHours = ( currentTime - prevTime ) / ( 1000 * 3600 );
    return differentHours;
  }
  /**
   * validate email
   */
  public static validateEmail = (email: string): boolean => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  /**
   * open register modal
   */
  public static openRegisterModal = () => {
    const openModal = <HTMLElement>document.querySelector('[data-target="#modal-signUp"]');
    openModal.click();
  }
  public static scrollElement = (element: Element) => {
    element.scrollIntoView(true);
  }
  public static scrollToTop = () => {
    const element = document.querySelector('#page-top');
    element.scrollIntoView({ behavior: 'smooth' });
  }
  public static config = {
    pageSize: {
      default: 8,
      tour: {
        homePage: 4,
        searchPage: 20,
        listPage: 8,
        listSuggest: 4
      },
      event: {
        homePage: 2
      }
    },
    bannerImage: {
      home: 'assets/img/header/headerImg.jpg', // home, events, tips, news
      sub1: 'assets/img/header/imgSubpage1.jpg', // domestic
      sub2: 'assets/img/header/imgSubpage2.jpg', // aboard, service ,recruitment, contact
      user: 'assets/img/header/bgMember.jpg' // user
    },
    cookieKey: {
      isLoggedIn: 'isLoggedIn',
      token: 'token',
      userInfo: 'userInfo'
    },
    appLink: {
      android: 'androidLink',
      ios: 'iosLink'
    },
    sessionKey: {
      stateFooter: 'stateFooter'
    }
  }
}
